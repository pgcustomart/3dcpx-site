const { renderDocument } = require('./layout');
const { templates } = require('./pageTemplates');
const { renderBlock } = require('./blockRenderers');

function renderPage(slug, blocks) {
  const assemble = templates[slug];
  if (!assemble) {
    throw new Error(`Nenhum template de página definido para o slug "${slug}"`);
  }

  const footerBlock = blocks.find((b) => b.type === 'footer' && b.visible);
  const mainBlocks = blocks.filter((b) => b.type !== 'footer');

  const mainHtml = assemble(mainBlocks);
  const footerHtml = footerBlock ? renderBlock(footerBlock) : '';

  return renderDocument(slug, mainHtml, footerHtml);
}

module.exports = { renderPage };
