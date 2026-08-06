(async function init() {
  const session = await requireSession();
  const content = renderShell('midia', { title: 'Mídia / Uploads', user: session });
  content.appendChild(UI.el('p', { class: 'page-lead', text: 'Envie imagens para o Cloudinary e acompanhe os uploads recentes.' }));

  const uploads = [...MOCK.uploadsRecentes]; // sessão local — some ao topo quando um upload real acontece aqui

  const fileInput = UI.el('input', { type: 'file', accept: 'image/*', id: 'mediaFileInput', style: 'display:none;' });
  const statusEl = UI.el('span', { style: 'color:var(--text-2);font-size:12.5px;' });
  const uploadBtn = UI.el('button', { class: 'btn btn--primary btn--sm', type: 'button', text: 'Enviar imagem', onclick: () => fileInput.click() });
  const uploadCard = UI.card({
    title: 'Enviar nova imagem',
    bodyNode: UI.el('div', { style: 'display:flex;align-items:center;gap:12px;flex-wrap:wrap;' }, [uploadBtn, statusEl]),
  });
  content.appendChild(uploadCard);
  content.appendChild(fileInput);

  const tableSlot = UI.el('div', { class: 'section-block' });
  content.appendChild(tableSlot);

  function renderTable() {
    tableSlot.innerHTML = '';
    const table = UI.dataTable({
      title: 'Uploads recentes',
      columns: [
        { key: 'nome', label: 'Arquivo', sortable: true },
        { key: 'tipo', label: 'Tipo' },
        { key: 'tamanho', label: 'Tamanho' },
        { key: 'quando', label: 'Enviado', sortable: true, render: (u) => timeAgo(u.quando) },
      ],
      fetchPage: ({ page, pageSize, search, sortKey, sortDir }) => {
        let items = uploads.filter((u) => !search || u.nome.toLowerCase().includes(search.toLowerCase()));
        if (sortKey) items = [...items].sort((a, b) => (a[sortKey] > b[sortKey] ? 1 : -1) * (sortDir === 'asc' ? 1 : -1));
        return paginate(items, { page, pageSize });
      },
      pageSize: 8,
      searchPlaceholder: 'Pesquisar arquivo…',
      emptyState: { icon: '🖼️', title: 'Nenhum upload ainda' },
      rowActions: (u) => (u.url
        ? [UI.el('button', { class: 'btn btn--sm', type: 'button', text: 'Copiar URL', onclick: () => { navigator.clipboard.writeText(u.url); UI.toast('URL copiada.', { variant: 'success' }); } })]
        : [UI.mockBadge('exemplo')]),
    });
    tableSlot.appendChild(table.el);
  }
  renderTable();

  fileInput.addEventListener('change', async () => {
    const file = fileInput.files[0];
    if (!file) return;
    statusEl.textContent = 'Enviando…';
    uploadBtn.disabled = true;
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch('/api/upload', { method: 'POST', credentials: 'same-origin', body: formData });
      const data = await res.json();
      if (!res.ok) {
        statusEl.textContent = data.error || 'Falha no upload.';
        UI.toast(data.error || 'Falha no upload.', { variant: 'danger' });
        return;
      }
      uploads.unshift({ nome: file.name, tipo: 'imagem', tamanho: `${Math.round(file.size / 1024)} KB`, quando: new Date().toISOString(), url: data.url });
      statusEl.textContent = 'Enviado com sucesso.';
      UI.toast('Upload concluído.', { variant: 'success' });
      renderTable();
    } catch (err) {
      statusEl.textContent = 'Erro de conexão no upload.';
      UI.toast('Erro de conexão no upload.', { variant: 'danger' });
    } finally {
      uploadBtn.disabled = false;
      fileInput.value = '';
    }
  });
})();
