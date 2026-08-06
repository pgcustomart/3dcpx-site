const { renderBlock } = require('./blockRenderers');
const {
  wrapSection,
  reEngVisualHome,
  reEngVisualFull,
  useCasesTabs,
  realPortfolioGallery,
  inProgressProjects,
  workshopGallery,
  contactFormSection,
  faqSection,
} = require('./staticSections');

// Agrupa os blocks (já ordenados) por tipo e permite consumi-los em sequência —
// suporta várias instâncias do mesmo tipo na mesma página (ex: 2x stats_bar).
class BlockQueue {
  constructor(blocks) {
    this.byType = new Map();
    for (const block of blocks) {
      if (!block.visible) continue;
      if (!this.byType.has(block.type)) this.byType.set(block.type, []);
      this.byType.get(block.type).push(block);
    }
  }

  next(type, options) {
    const queue = this.byType.get(type);
    if (!queue || queue.length === 0) return '';
    const block = queue.shift();
    return renderBlock(block, options);
  }

  // Retira um bloco da fila sem renderizá-lo — usado quando o content de um bloco
  // precisa ser injetado dentro da composição de OUTRO bloco (ex.: stats_bar dentro do hero).
  shiftContent(type) {
    const queue = this.byType.get(type);
    if (!queue || queue.length === 0) return null;
    return queue.shift().content;
  }
}

function assembleIndex(blocks) {
  const q = new BlockQueue(blocks);
  // Estrutura original da Home: o 1º stats_bar mora DENTRO do hero, o 2º mora DENTRO
  // da seção de prova social (grid de números) — nenhum dos dois é uma seção própria.
  const heroStats = q.shiftContent('stats_bar');
  const proofStats = q.shiftContent('stats_bar');
  return [
    q.next('hero', { variant: 'home', statsContent: heroStats }),
    q.next('sector_ticker', { statsContent: proofStats }),
    q.next('problem_cards'),
    q.next('solutions_grid', { showCta: true, sectionId: 'solucoes' }),
    `
    <section class="reverse-eng" id="engenharia-reversa">
      <div class="container">
        <div class="reverse-eng__inner">
          ${reEngVisualHome()}
          ${q.next('featured_service')}
        </div>
      </div>
    </section>`,
    q.next('portfolio_grid', { showCta: true, sectionId: 'portfolio' }),
    `
    <section class="studio" id="sobre">
      <div class="container">
        <div class="studio__inner">
          ${q.next('founder_bio', { variant: 'compact' })}
          ${q.next('workshop_specs', { variant: 'compact' })}
        </div>
      </div>
    </section>`,
    q.next('cta_final', { eyebrow: 'Vamos começar', sectionId: 'cta' }),
  ].join('\n');
}

function assembleSolucoes(blocks) {
  const q = new BlockQueue(blocks);
  return [
    q.next('hero', { variant: 'page' }),
    `<div style="padding-top: 88px;">${q.next('solutions_grid')}</div>`,
    useCasesTabs(),
    wrapSection({
      sectionClass: 'how-it-works',
      sectionId: 'processo',
      tag: 'Processo',
      title: 'Como funciona',
      sub: 'Simples, direto e sem surpresas no final.',
      inner: q.next('process_steps'),
    }),
    q.next('cta_final'),
  ].join('\n');
}

function assembleEngenhariaReversa(blocks) {
  const q = new BlockQueue(blocks);
  return [
    q.next('hero', { variant: 'page' }),
    `
    <section class="reverse-eng" id="processo" style="padding-top: 88px;">
      <div class="container">
        <div class="reverse-eng__inner">
          ${reEngVisualFull()}
          ${q.next('featured_service')}
        </div>
      </div>
    </section>`,
    q.next('solutions_grid'), // "Quando usar engenharia reversa?" — cards de aplicação (titulo/subtitulo já vêm no content)
    wrapSection({
      sectionClass: 'how-it-works',
      sectionId: 'especificacoes',
      tag: 'Especificações técnicas',
      title: 'Capacidade técnica',
      inner: q.next('process_steps'),
    }),
    q.next('cta_final'),
  ].join('\n');
}

function assemblePortfolio(blocks) {
  const q = new BlockQueue(blocks);
  return [
    q.next('hero', { variant: 'page' }),
    realPortfolioGallery(),
    inProgressProjects(),
    q.next('cta_final'),
  ].join('\n');
}

function assembleSobre(blocks) {
  const q = new BlockQueue(blocks);
  return [
    q.next('hero', { variant: 'page' }),
    `<div style="padding-top: 88px;">${q.next('founder_bio', { variant: 'full' })}</div>`,
    `
    <section class="workshop" id="oficina">
      <div class="container">
        <div class="workshop__inner">
          ${q.next('workshop_specs', { variant: 'full' })}
          ${workshopGallery()}
        </div>
      </div>
    </section>`,
    wrapSection({
      sectionClass: 'how-it-works',
      sectionId: 'valores',
      tag: 'Como trabalhamos',
      title: 'O que diferencia<br />a 3DCPX',
      inner: q.next('process_steps'),
    }),
    q.next('cta_final'),
  ].join('\n');
}

function assembleOrcamento(blocks) {
  const q = new BlockQueue(blocks);
  return [q.next('hero', { variant: 'page' }), contactFormSection(), faqSection(), q.next('cta_final')].join('\n');
}

const templates = {
  index: assembleIndex,
  solucoes: assembleSolucoes,
  'engenharia-reversa': assembleEngenhariaReversa,
  portfolio: assemblePortfolio,
  sobre: assembleSobre,
  orcamento: assembleOrcamento,
};

module.exports = { templates, BlockQueue };
