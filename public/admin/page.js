const params = new URLSearchParams(window.location.search);
const slug = params.get('slug');
const deepLinkBlockId = params.get('block') ? Number(params.get('block')) : null;

let page = null;
let blocks = [];
let blockTypesCatalog = null;
let editingBlock = null;
let editorState = null;
let dragFromIndex = null;
let formDirty = false;

let blockListEl = null;
let pageTitleEl = null;
let sidePanelSync = null;

const ARRAY_ITEM_TEMPLATES = {
  'stats_bar.stats': { valor: '', label: '' },
  'sector_ticker.setores': '',
  'problem_cards.cards': { titulo: '', descricao: '' },
  'solutions_grid.cards': { titulo: '', descricao: '', tags: [], destaque: false },
  'process_steps.passos': { numero: '', texto: '' },
  'featured_service.bullets': '',
  'portfolio_grid.projetos': { imagem_url: '', categoria: '', titulo: '', descricao: '', material: '' },
  'workshop_specs.itens': { titulo: '', descricao: '' },
  'footer.redes_sociais': { nome: '', link: '' },
  'footer.servicos': { texto: '', link: '' },
  'footer.empresa': { texto: '', link: '' },
};
const FIELD_KEY_FALLBACK = { tags: '' };

function humanize(key) {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function deepClone(v) {
  return JSON.parse(JSON.stringify(v));
}

function clearValue(v) {
  if (typeof v === 'string') return '';
  if (typeof v === 'boolean') return false;
  if (Array.isArray(v)) return [];
  if (v && typeof v === 'object') {
    const out = {};
    Object.keys(v).forEach((k) => (out[k] = clearValue(v[k])));
    return out;
  }
  return '';
}

// Só sinaliza "alterações não salvas" na UI — não muda o que é de fato salvo.
function markDirty() {
  formDirty = true;
  if (sidePanelSync) sidePanelSync.setState('unsaved');
}

async function init() {
  const session = await requireSession();
  const content = renderShell('paginas', { title: 'Carregando…', user: session, backHref: 'paginas.html' });

  if (!slug) {
    content.appendChild(UI.emptyState({ icon: '📄', title: 'Nenhuma página informada' }));
    return;
  }

  const headerRow = UI.el('div', { class: 'page-header-row' }, [
    UI.el('h1', { id: 'pageTitle', text: 'Carregando...' }),
    UI.el('div', { style: 'display:flex;gap:8px;align-items:center;' }, [
      UI.el('button', { class: 'btn btn--sm', id: 'previewBtn', type: 'button', text: 'Preview ↗' }),
      UI.el('button', { class: 'btn btn--primary btn--sm', id: 'addBlockBtn', type: 'button', text: '+ Adicionar bloco' }),
    ]),
  ]);
  content.appendChild(headerRow);
  content.appendChild(UI.el('div', { id: 'blockList', class: 'block-list loading', text: 'Carregando blocos...' }));

  blockListEl = document.getElementById('blockList');
  pageTitleEl = document.getElementById('pageTitle');
  sidePanelSync = UI.syncIndicator('idle');
  document.getElementById('sidePanelSync').appendChild(sidePanelSync);
  document.getElementById('sidePanelPublishBadge').appendChild(UI.badge('Publicado · ao vivo', 'success'));

  document.getElementById('previewBtn').addEventListener('click', () => {
    const route = PAGE_ROUTE_BY_SLUG[slug] || '/';
    window.open(`${route}${route.includes('?') ? '&' : '?'}preview=true`, '_blank');
  });
  document.getElementById('addBlockBtn').addEventListener('click', openAddModal);
  document.getElementById('closeAddModal').addEventListener('click', closeAddModal);
  document.getElementById('addModalBackdrop').addEventListener('click', (e) => {
    if (e.target.id === 'addModalBackdrop') closeAddModal();
  });
  document.getElementById('closeSidePanel').addEventListener('click', closeEditor);
  document.getElementById('cancelEditBtn').addEventListener('click', closeEditor);
  document.getElementById('overlay').addEventListener('click', closeEditor);
  document.getElementById('saveBlockBtn').addEventListener('click', saveBlock);

  await loadBlocks();

  // Deep link (?block=ID), usado pela tela "Blocos" para abrir o editor direto
  // num bloco específico — não muda nada do fluxo normal quando o parâmetro não vem.
  if (deepLinkBlockId) {
    const target = blocks.find((b) => b.id === deepLinkBlockId);
    if (target) openEditor(target);
  }
}

async function loadBlocks() {
  blockListEl.classList.add('loading');
  try {
    const res = await apiFetch(`/api/pages/${encodeURIComponent(slug)}/blocks`);
    const data = await res.json();
    page = data.page;
    blocks = data.blocks;
    pageTitleEl.textContent = page.title;
    document.title = `${page.title} — CMS 3DCPX`;
    const shellTitle = document.querySelector('.shell__title');
    if (shellTitle) shellTitle.textContent = page.title;
    renderList();
  } catch (err) {
    blockListEl.innerHTML = '<div class="empty-state">Erro ao carregar blocos.</div>';
  } finally {
    blockListEl.classList.remove('loading');
  }
}

function renderList() {
  blockListEl.innerHTML = '';
  if (!blocks.length) {
    blockListEl.innerHTML = '<div class="empty-state">Nenhum bloco ainda. Clique em "Adicionar bloco".</div>';
    return;
  }

  blocks.forEach((block, index) => {
    const item = document.createElement('div');
    item.className = 'block-item' + (block.visible ? '' : ' hidden-block');
    item.draggable = true;
    item.dataset.index = String(index);

    item.innerHTML = `
      <span class="block-item__handle" title="Arraste para reordenar">⠿</span>
      <span class="block-item__type">${BLOCK_TYPE_LABELS[block.type] || block.type}</span>
      <span class="block-item__label"></span>
      <div class="block-item__actions">
        <button class="toggle ${block.visible ? 'on' : ''}" title="Visível" data-action="toggle"></button>
        <button class="btn btn--sm" data-action="edit">Editar</button>
        <button class="btn btn--sm btn--danger" data-action="delete">Excluir</button>
      </div>
    `;
    item.querySelector('.block-item__label').textContent = blockLabel(block);

    item.querySelector('[data-action="toggle"]').addEventListener('click', () => toggleVisible(block));
    item.querySelector('[data-action="edit"]').addEventListener('click', () => openEditor(block));
    item.querySelector('[data-action="delete"]').addEventListener('click', () => deleteBlockConfirm(block));

    item.addEventListener('dragstart', () => {
      dragFromIndex = index;
      item.classList.add('dragging');
    });
    item.addEventListener('dragend', () => item.classList.remove('dragging'));
    item.addEventListener('dragover', (e) => e.preventDefault());
    item.addEventListener('drop', (e) => {
      e.preventDefault();
      const toIndex = Number(item.dataset.index);
      if (dragFromIndex === null || dragFromIndex === toIndex) return;
      const [moved] = blocks.splice(dragFromIndex, 1);
      blocks.splice(toIndex, 0, moved);
      dragFromIndex = null;
      renderList();
      persistOrder();
    });

    blockListEl.appendChild(item);
  });
}

async function persistOrder() {
  const updates = blocks.map((block, index) => ({ block, order: index })).filter(({ block, order }) => block.order !== order);
  for (const { block, order } of updates) {
    await apiFetch(`/api/blocks/${block.id}`, { method: 'PATCH', body: JSON.stringify({ order }) });
    block.order = order;
  }
}

async function toggleVisible(block) {
  const res = await apiFetch(`/api/blocks/${block.id}`, {
    method: 'PATCH',
    body: JSON.stringify({ visible: !block.visible }),
  });
  const updated = await res.json();
  block.visible = updated.visible;
  renderList();
}

async function deleteBlockConfirm(block) {
  if (!window.confirm(`Excluir o bloco "${blockLabel(block)}" definitivamente?`)) return;
  await apiFetch(`/api/blocks/${block.id}`, { method: 'DELETE' });
  blocks = blocks.filter((b) => b.id !== block.id);
  renderList();
}

/* ── Editor de bloco (painel lateral) ────────────────────────── */

function reorderLike(obj, template) {
  if (!template || typeof template !== 'object') return obj;
  const ordered = {};
  Object.keys(template).forEach((k) => {
    if (!(k in obj)) return;
    ordered[k] = obj[k];
  });
  Object.keys(obj).forEach((k) => {
    if (!(k in ordered)) ordered[k] = obj[k];
  });
  return ordered;
}

async function openEditor(block) {
  editingBlock = block;
  if (!blockTypesCatalog) {
    const res = await apiFetch('/api/block-types');
    blockTypesCatalog = await res.json();
  }
  const template = (blockTypesCatalog.find((t) => t.type === block.type) || {}).defaultContent;
  editorState = reorderLike(deepClone(block.content), template);
  document.getElementById('sidePanelTitle').textContent = `Editar — ${BLOCK_TYPE_LABELS[block.type] || block.type}`;
  const body = document.getElementById('sidePanelBody');
  renderObjectForm(body, editorState, [block.type]);
  document.getElementById('overlay').classList.add('visible');
  document.getElementById('sidePanel').classList.add('visible');
  formDirty = false;
  sidePanelSync.setState('idle');
}

function closeEditor() {
  editingBlock = null;
  editorState = null;
  formDirty = false;
  document.getElementById('overlay').classList.remove('visible');
  document.getElementById('sidePanel').classList.remove('visible');
}

async function saveBlock() {
  if (!editingBlock) return;
  const btn = document.getElementById('saveBlockBtn');
  btn.disabled = true;
  btn.textContent = 'Salvando...';
  sidePanelSync.setState('saving');
  try {
    const res = await apiFetch(`/api/blocks/${editingBlock.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ content: editorState }),
    });
    const updated = await res.json();
    const idx = blocks.findIndex((b) => b.id === updated.id);
    if (idx >= 0) blocks[idx] = updated;
    formDirty = false;
    sidePanelSync.setState('saved');
    closeEditor();
    renderList();
  } catch (err) {
    sidePanelSync.setState('error');
    throw err;
  } finally {
    btn.disabled = false;
    btn.textContent = 'Salvar';
  }
}

/* ── Form builder genérico (schema vem do próprio content) ──── */

function renderObjectForm(container, obj, path) {
  container.innerHTML = '';
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (Array.isArray(value)) {
      container.appendChild(renderArrayField(obj, key, path));
    } else if (typeof value === 'boolean') {
      container.appendChild(renderBoolField(obj, key));
    } else {
      container.appendChild(renderStringField(obj, key));
    }
  });
}

function renderStringField(obj, key) {
  const field = document.createElement('div');
  field.className = 'field';
  const label = document.createElement('label');
  label.textContent = humanize(key);
  field.appendChild(label);

  if (key === 'imagem_url') {
    field.appendChild(renderImageField(obj, key));
    return field;
  }

  const isLong = ['descricao', 'texto', 'subtitulo', 'citacao'].includes(key);
  const input = document.createElement(isLong ? 'textarea' : 'input');
  if (!isLong) input.type = 'text';
  input.value = obj[key];
  input.addEventListener('input', () => {
    obj[key] = input.value;
    markDirty();
  });
  field.appendChild(input);
  return field;
}

function renderImageField(obj, key) {
  const wrap = document.createElement('div');
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'https://...';
  input.value = obj[key] || '';
  input.addEventListener('input', () => {
    obj[key] = input.value;
    preview.src = input.value;
    preview.style.display = input.value ? 'block' : 'none';
    markDirty();
  });
  wrap.appendChild(input);

  const actions = document.createElement('div');
  actions.className = 'img-field-actions';
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  const status = document.createElement('span');
  status.style.color = 'var(--text-2)';
  status.style.fontSize = '12px';

  fileInput.addEventListener('change', async () => {
    const file = fileInput.files[0];
    if (!file) return;
    status.textContent = 'Enviando...';
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch('/api/upload', { method: 'POST', credentials: 'same-origin', body: formData });
      const data = await res.json();
      if (!res.ok) {
        status.textContent = data.error || 'Falha no upload.';
        return;
      }
      obj[key] = data.url;
      input.value = data.url;
      preview.src = data.url;
      preview.style.display = 'block';
      status.textContent = 'Enviado.';
      markDirty();
    } catch (err) {
      status.textContent = 'Erro de conexão no upload.';
    }
  });

  actions.appendChild(fileInput);
  actions.appendChild(status);
  wrap.appendChild(actions);

  const preview = document.createElement('img');
  preview.className = 'img-preview';
  preview.src = obj[key] || '';
  preview.style.display = obj[key] ? 'block' : 'none';
  wrap.appendChild(preview);

  return wrap;
}

function renderBoolField(obj, key) {
  const row = document.createElement('div');
  row.className = 'checkbox-row';
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.checked = Boolean(obj[key]);
  input.id = `chk-${key}-${Math.random().toString(36).slice(2)}`;
  input.addEventListener('change', () => {
    obj[key] = input.checked;
    markDirty();
  });
  const label = document.createElement('label');
  label.htmlFor = input.id;
  label.textContent = humanize(key);
  row.appendChild(input);
  row.appendChild(label);
  return row;
}

function getArrayItemTemplate(blockType, key, currentArray) {
  if (currentArray.length > 0) {
    return clearValue(currentArray[currentArray.length - 1]);
  }
  const fullKey = `${blockType}.${key}`;
  if (ARRAY_ITEM_TEMPLATES[fullKey] !== undefined) return deepClone(ARRAY_ITEM_TEMPLATES[fullKey]);
  if (FIELD_KEY_FALLBACK[key] !== undefined) return deepClone(FIELD_KEY_FALLBACK[key]);
  return '';
}

function renderArrayField(obj, key, path) {
  const group = document.createElement('div');
  const label = document.createElement('label');
  label.textContent = humanize(key);
  group.appendChild(label);

  const box = document.createElement('div');
  box.className = 'array-group';
  const array = obj[key];

  array.forEach((item, i) => {
    if (item && typeof item === 'object' && !Array.isArray(item)) {
      const card = document.createElement('div');
      card.className = 'array-item-card';
      const top = document.createElement('div');
      top.className = 'array-item-card__top';
      top.appendChild(moveButtons(array, i, box, obj, key, path));
      top.appendChild(removeButton(array, i, box, obj, key, path));
      card.appendChild(top);
      const inner = document.createElement('div');
      renderObjectForm(inner, item, path.concat(key, String(i)));
      card.appendChild(inner);
      box.appendChild(card);
    } else {
      const row = document.createElement('div');
      row.className = 'array-group__row';
      const input = document.createElement('input');
      input.type = 'text';
      input.value = item;
      input.addEventListener('input', () => {
        array[i] = input.value;
        markDirty();
      });
      row.appendChild(input);
      row.appendChild(removeButton(array, i, box, obj, key, path));
      box.appendChild(row);
    }
  });

  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.className = 'btn btn--sm array-add-btn';
  addBtn.textContent = '+ Adicionar item';
  addBtn.addEventListener('click', () => {
    array.push(getArrayItemTemplate(path[0], key, array));
    markDirty();
    rerenderArray(box, obj, key, path);
  });
  box.appendChild(addBtn);

  group.appendChild(box);
  return group;
}

function rerenderArray(box, obj, key, path) {
  const replacement = renderArrayField(obj, key, path);
  box.parentElement.replaceWith(replacement);
}

function removeButton(array, i, box, obj, key, path) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'btn btn--sm btn--danger';
  btn.textContent = '✕';
  btn.title = 'Remover item';
  btn.addEventListener('click', () => {
    array.splice(i, 1);
    markDirty();
    rerenderArray(box, obj, key, path);
  });
  return btn;
}

function moveButtons(array, i, box, obj, key, path) {
  const wrap = document.createElement('span');
  const up = document.createElement('button');
  up.type = 'button';
  up.className = 'btn btn--sm';
  up.textContent = '↑';
  up.disabled = i === 0;
  up.addEventListener('click', () => {
    [array[i - 1], array[i]] = [array[i], array[i - 1]];
    markDirty();
    rerenderArray(box, obj, key, path);
  });
  const down = document.createElement('button');
  down.type = 'button';
  down.className = 'btn btn--sm';
  down.textContent = '↓';
  down.disabled = i === array.length - 1;
  down.addEventListener('click', () => {
    [array[i + 1], array[i]] = [array[i], array[i + 1]];
    markDirty();
    rerenderArray(box, obj, key, path);
  });
  wrap.appendChild(up);
  wrap.appendChild(down);
  return wrap;
}

/* ── Modal: adicionar bloco ──────────────────────────────────── */

async function openAddModal() {
  const backdrop = document.getElementById('addModalBackdrop');
  const grid = document.getElementById('typeGrid');
  grid.innerHTML = 'Carregando...';
  backdrop.classList.add('visible');

  if (!blockTypesCatalog) {
    const res = await apiFetch('/api/block-types');
    blockTypesCatalog = await res.json();
  }

  grid.innerHTML = '';
  blockTypesCatalog.forEach(({ type }) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'type-card';
    card.innerHTML = `<strong>${BLOCK_TYPE_LABELS[type] || type}</strong><span>${type}</span>`;
    card.addEventListener('click', () => addBlock(type));
    grid.appendChild(card);
  });
}

function closeAddModal() {
  document.getElementById('addModalBackdrop').classList.remove('visible');
}

async function addBlock(type) {
  const res = await apiFetch(`/api/pages/${encodeURIComponent(slug)}/blocks`, {
    method: 'POST',
    body: JSON.stringify({ type }),
  });
  const block = await res.json();
  blocks.push(block);
  closeAddModal();
  renderList();
  openEditor(block);
}

init();
