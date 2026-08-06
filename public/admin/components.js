/* ── Biblioteca de componentes reutilizáveis do CMS 3DCPX ──────────────
   Sem framework/bundler (o projeto inteiro é HTML/JS puro). Cada função
   devolve um elemento DOM pronto para ser inserido — nada de HTML
   duplicado entre telas. Usado por toda tela nova em public/admin/. */

const UI = (function () {
  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    Object.entries(attrs || {}).forEach(([k, v]) => {
      if (v === null || v === undefined || v === false) return;
      if (k === 'class') node.className = v;
      else if (k === 'html') node.innerHTML = v;
      else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2), v);
      else if (k === 'text') node.textContent = v;
      else node.setAttribute(k, v === true ? '' : v);
    });
    (children || []).forEach((c) => c && node.appendChild(c));
    return node;
  }

  function escapeHtml(v) {
    const d = document.createElement('div');
    d.textContent = v === null || v === undefined ? '' : String(v);
    return d.innerHTML;
  }

  /* ── Badge ─────────────────────────────────────────────────────── */
  // variant: neutral | success | warning | danger | info | mock
  function badge(text, variant = 'neutral') {
    return el('span', { class: `ui-badge ui-badge--${variant}` }, [document.createTextNode(text)]);
  }

  function mockBadge(label = 'Dados de exemplo') {
    return badge(label, 'mock');
  }

  /* ── Skeleton ──────────────────────────────────────────────────── */
  function skeleton(kind = 'line', count = 1) {
    const wrap = el('div', { class: 'ui-skeleton-group' });
    for (let i = 0; i < count; i++) {
      wrap.appendChild(el('div', { class: `ui-skeleton ui-skeleton--${kind}` }));
    }
    return wrap;
  }

  /* ── Empty / Error states ─────────────────────────────────────── */
  function emptyState({ icon = '📭', title = 'Nada por aqui ainda', message = '', action = null } = {}) {
    return el('div', { class: 'ui-state ui-state--empty' }, [
      el('div', { class: 'ui-state__icon', text: icon }),
      el('div', { class: 'ui-state__title', text: title }),
      message ? el('div', { class: 'ui-state__msg', text: message }) : null,
      action || null,
    ]);
  }

  function errorState({ message = 'Não foi possível carregar os dados.', onRetry } = {}) {
    const retryBtn = onRetry
      ? el('button', { class: 'btn btn--sm', type: 'button', onclick: onRetry, text: 'Tentar novamente' })
      : null;
    return el('div', { class: 'ui-state ui-state--error' }, [
      el('div', { class: 'ui-state__icon', text: '⚠️' }),
      el('div', { class: 'ui-state__title', text: 'Falha ao carregar' }),
      el('div', { class: 'ui-state__msg', text: message }),
      retryBtn,
    ]);
  }

  /* ── Toast ─────────────────────────────────────────────────────── */
  let toastContainer = null;
  function toast(message, { variant = 'neutral', duration = 3200 } = {}) {
    if (!toastContainer) {
      toastContainer = el('div', { class: 'ui-toast-container' });
      document.body.appendChild(toastContainer);
    }
    const node = el('div', { class: `ui-toast ui-toast--${variant}`, text: message });
    toastContainer.appendChild(node);
    requestAnimationFrame(() => node.classList.add('visible'));
    setTimeout(() => {
      node.classList.remove('visible');
      setTimeout(() => node.remove(), 200);
    }, duration);
  }

  /* ── SyncIndicator ─────────────────────────────────────────────── */
  // state: idle | saving | saved | unsaved | error
  const SYNC_LABELS = {
    idle: 'Sincronizado',
    saving: 'Salvando…',
    saved: 'Salvo',
    unsaved: 'Alterações não salvas',
    error: 'Falha ao salvar',
  };
  function syncIndicator(initialState = 'idle') {
    const dot = el('span', { class: 'ui-sync__dot' });
    const label = el('span', { class: 'ui-sync__label', text: SYNC_LABELS[initialState] });
    const node = el('div', { class: `ui-sync ui-sync--${initialState}` }, [dot, label]);
    node.setState = (state) => {
      node.className = `ui-sync ui-sync--${state}`;
      label.textContent = SYNC_LABELS[state] || state;
    };
    return node;
  }

  /* ── Dropdown ──────────────────────────────────────────────────── */
  // options: [{ value, label }]; onSelect(value)
  function dropdown({ label, options, value, onSelect, align = 'left' }) {
    const current = options.find((o) => o.value === value) || options[0];
    const trigger = el('button', {
      type: 'button',
      class: 'ui-dropdown__trigger',
    }, [document.createTextNode(`${label ? label + ': ' : ''}${current ? current.label : ''}`), el('span', { class: 'ui-dropdown__caret', text: '▾' })]);
    const menu = el('div', { class: `ui-dropdown__menu ui-dropdown__menu--${align}` });
    options.forEach((opt) => {
      const item = el('button', {
        type: 'button',
        class: 'ui-dropdown__item' + (opt.value === (value !== undefined ? value : current && current.value) ? ' active' : ''),
        onclick: () => {
          trigger.firstChild.textContent = `${label ? label + ': ' : ''}${opt.label}`;
          menu.querySelectorAll('.ui-dropdown__item').forEach((n) => n.classList.remove('active'));
          item.classList.add('active');
          wrap.classList.remove('open');
          onSelect && onSelect(opt.value);
        },
        text: opt.label,
      });
      menu.appendChild(item);
    });
    const wrap = el('div', { class: 'ui-dropdown' }, [trigger, menu]);
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      document.querySelectorAll('.ui-dropdown.open').forEach((n) => { if (n !== wrap) n.classList.remove('open'); });
      wrap.classList.toggle('open');
    });
    document.addEventListener('click', (e) => { if (!wrap.contains(e.target)) wrap.classList.remove('open'); });
    return wrap;
  }

  /* ── Tabs ──────────────────────────────────────────────────────── */
  // items: [{ key, label }]; onChange(key)
  function tabs({ items, activeKey, onChange }) {
    const nav = el('div', { class: 'ui-tabs' });
    items.forEach((item) => {
      const btn = el('button', {
        type: 'button',
        class: 'ui-tabs__item' + (item.key === activeKey ? ' active' : ''),
        onclick: () => {
          nav.querySelectorAll('.ui-tabs__item').forEach((n) => n.classList.remove('active'));
          btn.classList.add('active');
          onChange(item.key);
        },
        text: item.label,
      });
      nav.appendChild(btn);
    });
    return nav;
  }

  /* ── Modal (genérico — independente do modal específico do editor) ── */
  function modal({ title, bodyNode, actions = [] }) {
    const backdrop = el('div', { class: 'ui-modal-backdrop' });
    const closeBtn = el('button', { class: 'close-x', type: 'button', text: '✕' });
    const footer = el('div', { class: 'ui-modal__footer' }, actions);
    const box = el('div', { class: 'ui-modal' }, [
      el('div', { class: 'ui-modal__header' }, [el('h2', { text: title }), closeBtn]),
      el('div', { class: 'ui-modal__body' }, [bodyNode]),
      actions.length ? footer : null,
    ]);
    backdrop.appendChild(box);
    function close() { backdrop.remove(); }
    closeBtn.addEventListener('click', close);
    backdrop.addEventListener('click', (e) => { if (e.target === backdrop) close(); });
    document.body.appendChild(backdrop);
    requestAnimationFrame(() => backdrop.classList.add('visible'));
    return { close, el: backdrop };
  }

  function confirmModal({ title, message, confirmLabel = 'Confirmar', danger = false, onConfirm }) {
    const body = el('p', { class: 'ui-modal__msg', text: message });
    const m = modal({
      title,
      bodyNode: body,
      actions: [
        el('button', { class: 'btn btn--sm', type: 'button', text: 'Cancelar', onclick: () => m.close() }),
        el('button', {
          class: `btn btn--sm ${danger ? 'btn--danger' : 'btn--primary'}`,
          type: 'button',
          text: confirmLabel,
          onclick: () => { onConfirm && onConfirm(); m.close(); },
        }),
      ],
    });
    return m;
  }

  /* ── Card / StatCard ───────────────────────────────────────────── */
  function card({ title, actions = [], bodyNode, mock = false }) {
    const header = title || actions.length
      ? el('div', { class: 'ui-card__header' }, [
          title ? el('h3', { text: title }) : el('span'),
          el('div', { class: 'ui-card__actions' }, [...actions, mock ? mockBadge() : null]),
        ])
      : null;
    return el('div', { class: 'ui-card' }, [header, el('div', { class: 'ui-card__body' }, [bodyNode])]);
  }

  function statCard({ icon, label, value, delta, deltaTone = 'neutral', mock = false }) {
    return el('div', { class: 'ui-stat' }, [
      el('div', { class: 'ui-stat__top' }, [
        el('div', { class: 'ui-stat__icon', html: icon }),
        mock ? mockBadge() : null,
      ]),
      el('div', { class: 'ui-stat__value', text: value }),
      el('div', { class: 'ui-stat__label', text: label }),
      delta ? el('div', { class: `ui-stat__delta ui-stat__delta--${deltaTone}`, text: delta }) : null,
    ]);
  }

  /* ── Chart (wrapper fino sobre Chart.js — CDN carregado pela tela) ── */
  function chart(canvas, config) {
    if (typeof Chart === 'undefined') {
      canvas.replaceWith(errorState({ message: 'Chart.js não carregado.' }));
      return null;
    }
    const palette = {
      color: 'rgba(237,237,240,0.72)',
      grid: 'rgba(255,255,255,0.06)',
    };
    Chart.defaults.color = palette.color;
    Chart.defaults.font.family = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    Chart.defaults.borderColor = palette.grid;
    return new Chart(canvas, config);
  }

  /* ── Pagination ────────────────────────────────────────────────── */
  function pagination({ page, pageSize, total, onChange }) {
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const wrap = el('div', { class: 'ui-pagination' });
    const info = el('span', { class: 'ui-pagination__info', text: total === 0 ? '0 resultados' : `${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, total)} de ${total}` });
    const prev = el('button', { class: 'btn btn--sm', type: 'button', text: '← Anterior', disabled: page <= 1, onclick: () => onChange(page - 1) });
    const next = el('button', { class: 'btn btn--sm', type: 'button', text: 'Próxima →', disabled: page >= totalPages, onclick: () => onChange(page + 1) });
    wrap.appendChild(info);
    wrap.appendChild(el('div', { class: 'ui-pagination__nav' }, [prev, next]));
    return wrap;
  }

  /* ── DataTable ─────────────────────────────────────────────────
     fetchPage({ page, pageSize, search, filters, sortKey, sortDir })
       -> { items, total } | Promise<{ items, total }>
     columns: [{ key, label, render(row), sortable }]
     Estados cobertos: loading (skeleton), erro (com retry), vazio, populado.
     Desacoplado de onde o dado vem — mesma tabela serve dado real ou mock. */
  function dataTable({
    columns,
    fetchPage,
    pageSize = 8,
    searchPlaceholder = 'Pesquisar…',
    filters = [],
    emptyState: emptyOpts = {},
    rowActions,
    title,
  }) {
    const state = { page: 1, search: '', filters: {}, sortKey: null, sortDir: 'asc' };
    filters.forEach((f) => { state.filters[f.key] = f.value; });

    const toolbar = el('div', { class: 'ui-table__toolbar' });
    const searchInput = el('input', {
      type: 'search',
      class: 'ui-table__search',
      placeholder: searchPlaceholder,
      oninput: (e) => { state.search = e.target.value; state.page = 1; load(); },
    });
    toolbar.appendChild(searchInput);
    const filterRow = el('div', { class: 'ui-table__filters' });
    filters.forEach((f) => {
      filterRow.appendChild(dropdown({
        label: f.label,
        options: f.options,
        value: f.value,
        onSelect: (v) => { state.filters[f.key] = v; state.page = 1; load(); },
      }));
    });
    if (filters.length) toolbar.appendChild(filterRow);

    const body = el('div', { class: 'ui-table__body' });
    const footer = el('div', { class: 'ui-table__footer' });
    const wrap = el('div', { class: 'ui-table' }, [
      title ? el('div', { class: 'ui-table__title', text: title }) : null,
      toolbar,
      body,
      footer,
    ]);

    function renderRows(items) {
      const table = el('table', { class: 'ui-table__grid' });
      const thead = el('thead', {}, [
        el('tr', {}, columns.map((c) =>
          el('th', {
            class: c.sortable ? 'sortable' + (state.sortKey === c.key ? ' active' : '') : '',
            onclick: c.sortable ? () => {
              if (state.sortKey === c.key) state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
              else { state.sortKey = c.key; state.sortDir = 'asc'; }
              load();
            } : null,
          }, [document.createTextNode(c.label + (c.sortable && state.sortKey === c.key ? (state.sortDir === 'asc' ? ' ↑' : ' ↓') : ''))])
        ).concat(rowActions ? [el('th', { text: '' })] : [])),
      ]);
      const tbody = el('tbody');
      items.forEach((row) => {
        const tr = el('tr', {}, columns.map((c) => {
          const td = el('td', { 'data-label': c.label });
          const rendered = c.render ? c.render(row) : row[c.key];
          if (rendered instanceof Node) td.appendChild(rendered);
          else td.textContent = rendered === null || rendered === undefined ? '—' : rendered;
          return td;
        }));
        if (rowActions) {
          const actionsTd = el('td', { class: 'ui-table__row-actions', 'data-label': '' });
          rowActions(row).forEach((a) => actionsTd.appendChild(a));
          tr.appendChild(actionsTd);
        }
        tbody.appendChild(tr);
      });
      table.appendChild(thead);
      table.appendChild(tbody);
      body.innerHTML = '';
      body.appendChild(table);
    }

    function load() {
      body.innerHTML = '';
      body.appendChild(skeleton('row', 4));
      footer.innerHTML = '';
      let result;
      try {
        result = fetchPage({ page: state.page, pageSize, search: state.search, filters: state.filters, sortKey: state.sortKey, sortDir: state.sortDir });
      } catch (err) {
        body.innerHTML = '';
        body.appendChild(errorState({ onRetry: load }));
        return;
      }
      Promise.resolve(result)
        .then(({ items, total }) => {
          if (!items.length) {
            body.innerHTML = '';
            body.appendChild(emptyState(emptyOpts));
            footer.innerHTML = '';
            return;
          }
          renderRows(items);
          footer.innerHTML = '';
          footer.appendChild(pagination({
            page: state.page,
            pageSize,
            total,
            onChange: (p) => { state.page = p; load(); },
          }));
        })
        .catch(() => {
          body.innerHTML = '';
          body.appendChild(errorState({ onRetry: load }));
        });
    }

    load();
    return { el: wrap, reload: load };
  }

  return {
    el, escapeHtml, badge, mockBadge, skeleton, emptyState, errorState, toast,
    syncIndicator, dropdown, tabs, modal, confirmModal, card, statCard, chart,
    pagination, dataTable,
  };
})();

/* ── Utilitários genéricos (dado real ou mock — não é conteúdo mockado
   em si, só formatação) ────────────────────────────────────────────── */
function paginate(items, { page = 1, pageSize = 8 } = {}) {
  const start = (page - 1) * pageSize;
  return { items: items.slice(start, start + pageSize), total: items.length };
}

function formatDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

// Usado quando um texto rico (com <br/>/<em/> vindo do CMS) precisa virar
// texto simples de exibição (ex.: coluna de tabela, item de timeline).
function stripTags(str) {
  return String(str || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function timeAgo(iso) {
  if (!iso) return '—';
  const diffMs = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diffMs / 60000);
  if (min < 1) return 'agora mesmo';
  if (min < 60) return `há ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `há ${h}h`;
  const d = Math.floor(h / 24);
  return `há ${d}d`;
}
