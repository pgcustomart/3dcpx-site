// One-off migration: scans the client's real project photos and copies them
// into assets/images/portfolio/<category>/<project>/, then writes
// assets/js/portfolio-data.js with the real project list consumed by the gallery.
const fs = require('fs');
const path = require('path');

const SRC_ROOT = 'C:\\Users\\PG\\Desktop\\imagens site otimizada para implantar';
// Subpasta dedicada — nunca aponte para assets/images/portfolio/ direto,
// pois esse diretório já guarda imagens de outras seções (ex.: portfolio-industria.jpg,
// usada pelo bloco "portfolio_grid" da Home) que este script NÃO deve apagar.
const DEST_ROOT = path.join(__dirname, '..', 'assets', 'images', 'portfolio', 'galeria');
const DATA_OUT = path.join(__dirname, '..', 'assets', 'js', 'portfolio-data.js');
const DEST_URL_PREFIX = 'assets/images/portfolio/galeria';

function slugify(str) {
  return str
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function listDirs(dir) {
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)
    .sort();
}

function listImages(dir) {
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter(f => f.isFile() && /\.webp$/i.test(f.name))
    .map(f => f.name)
    .sort();
}

fs.rmSync(DEST_ROOT, { recursive: true, force: true });
fs.mkdirSync(DEST_ROOT, { recursive: true });

const projects = [];
const categories = [];

for (const categoryName of listDirs(SRC_ROOT)) {
  const categoryDir = path.join(SRC_ROOT, categoryName);
  const categorySlug = slugify(categoryName);
  categories.push({ slug: categorySlug, label: categoryName });

  for (const level1Name of listDirs(categoryDir)) {
    const level1Dir = path.join(categoryDir, level1Name);
    const directImages = listImages(level1Dir);

    const leaves = [];
    if (directImages.length > 0) {
      leaves.push({ title: level1Name, dir: level1Dir, images: directImages });
    } else {
      for (const level2Name of listDirs(level1Dir)) {
        const level2Dir = path.join(level1Dir, level2Name);
        const images = listImages(level2Dir);
        if (images.length > 0) {
          leaves.push({ title: `${level1Name} — ${level2Name}`, dir: level2Dir, images });
        }
      }
    }

    for (const leaf of leaves) {
      const projectSlug = `${categorySlug}-${slugify(leaf.title)}`;
      const destDir = path.join(DEST_ROOT, categorySlug, slugify(leaf.title));
      fs.mkdirSync(destDir, { recursive: true });

      const imagePaths = leaf.images.map((fileName, i) => {
        const ext = path.extname(fileName);
        const destName = `${String(i + 1).padStart(2, '0')}${ext.toLowerCase()}`;
        fs.copyFileSync(path.join(leaf.dir, fileName), path.join(destDir, destName));
        return `${DEST_URL_PREFIX}/${categorySlug}/${slugify(leaf.title)}/${destName}`;
      });

      projects.push({
        slug: projectSlug,
        title: leaf.title,
        category: categorySlug,
        images: imagePaths,
        count: imagePaths.length
      });
    }
  }
}

const fileContents = `// Gerado por scripts/migrate-portfolio-images.js a partir das fotos reais dos projetos.
// Não editar manualmente — rode o script novamente após adicionar/remover fotos.
window.PORTFOLIO_CATEGORIES = ${JSON.stringify(categories, null, 2)};

window.PORTFOLIO_PROJECTS = ${JSON.stringify(projects, null, 2)};
`;

fs.writeFileSync(DATA_OUT, fileContents, 'utf8');

console.log(`Categorias: ${categories.length}`);
console.log(`Projetos: ${projects.length}`);
console.log(`Fotos: ${projects.reduce((sum, p) => sum + p.count, 0)}`);
