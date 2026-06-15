# GUIA DE ASSETS — 3DCPX
### Resumo Executivo · Todos os materiais necessários para finalização do site

---

> **Para entrega ao cliente.**
> Este documento lista de forma consolidada todos os materiais fotográficos que precisam ser produzidos ou enviados para que o site 3DCPX fique completo e pronto para publicação. As medidas foram extraídas diretamente do layout real após implementação dos placeholders visuais em Junho de 2026.

---

## RESUMO DE PRIORIDADES

| Prioridade | Qtd. | O que é |
|------------|------|---------|
| **ALTA** | 13 | Bloqueante — portfólio, fotos do Pedro, oficina |
| **MEDIA** | 6 | Importante — heroes, Pedro em ação |
| **BAIXA** | 4 | Opcional — process steps engenharia reversa |
| **Total** | **23** | assets fotográficos |

---

## TABELA COMPLETA DE ASSETS

| Página | Área | Arquivo | Medida Final | Pasta | Prioridade |
|--------|------|---------|--------------|-------|------------|
| **HOME** | Hero — fundo | `hero-home.jpg` | 1920 × 1080 px | `/assets/images/hero/` | MEDIA |
| **HOME** | Card portfólio — Eng. Reversa | `portfolio-reversa.jpg` | 600 × 400 px | `/assets/images/portfolio/` | ALTA |
| **HOME** | Card portfólio — Arquitetura | `portfolio-arquitetura.jpg` | 600 × 400 px | `/assets/images/portfolio/` | ALTA |
| **HOME** | Card portfólio — Produto | `portfolio-produto-01.jpg` | 600 × 400 px | `/assets/images/portfolio/` | ALTA |
| **SOLUÇÕES** | Hero — fundo | `hero-solucoes.jpg` | 1920 × 500 px | `/assets/images/hero/` | MEDIA |
| **ENG. REVERSA** | Hero — fundo | `hero-engenharia-reversa.jpg` | 1920 × 500 px | `/assets/images/hero/` | MEDIA |
| **ENG. REVERSA** | Etapa 01 — Peça original | `er-peca-original.jpg` | 320 × 320 px | `/assets/images/engenharia-reversa/` | BAIXA |
| **ENG. REVERSA** | Etapa 02 — Escaneamento 3D | `er-escaneamento.jpg` | 320 × 320 px | `/assets/images/engenharia-reversa/` | BAIXA |
| **ENG. REVERSA** | Etapa 03 — Modelo CAD | `er-modelo-cad.jpg` | 320 × 320 px | `/assets/images/engenharia-reversa/` | BAIXA |
| **ENG. REVERSA** | Etapa 04 — Peça impressa | `er-peca-impressa.jpg` | 320 × 320 px | `/assets/images/engenharia-reversa/` | BAIXA |
| **PORTFÓLIO** | Hero — fundo | `hero-portfolio.jpg` | 1920 × 500 px | `/assets/images/hero/` | MEDIA |
| **PORTFÓLIO** | Card 01 — Eng. Reversa | `portfolio-reversa.jpg` | 600 × 400 px | `/assets/images/portfolio/` | ALTA |
| **PORTFÓLIO** | Card 02 — Destaque (vertical) | `portfolio-destaque.jpg` | 600 × 800 px | `/assets/images/portfolio/` | ALTA |
| **PORTFÓLIO** | Card 03 — Produto | `portfolio-produto-01.jpg` | 600 × 400 px | `/assets/images/portfolio/` | ALTA |
| **PORTFÓLIO** | Card 04 — Indústria | `portfolio-industria.jpg` | 600 × 400 px | `/assets/images/portfolio/` | ALTA |
| **PORTFÓLIO** | Card 05 — Eng. Reversa (2ª) | `portfolio-reversa-02.jpg` | 600 × 400 px | `/assets/images/portfolio/` | ALTA |
| **PORTFÓLIO** | Card 06 — Produto (2ª) | `portfolio-produto-02.jpg` | 600 × 400 px | `/assets/images/portfolio/` | ALTA |
| **SOBRE** | Hero — fundo | `hero-sobre.jpg` | 1920 × 500 px | `/assets/images/hero/` | MEDIA |
| **SOBRE** | Pedro — retrato (busto) | `pedro-retrato.jpg` | 480 × 640 px | `/assets/images/sobre/` | ALTA |
| **SOBRE** | Pedro — em ação | `pedro-em-acao.jpg` | 640 × 480 px | `/assets/images/sobre/` | MEDIA |
| **SOBRE** | Oficina — vista geral | `oficina-vista-geral.jpg` | 800 × 480 px | `/assets/images/oficina/` | ALTA |
| **SOBRE** | Oficina — impressora FDM | `oficina-impressora-fdm.jpg` | 480 × 280 px | `/assets/images/oficina/` | ALTA |
| **SOBRE** | Oficina — scanner 3D | `oficina-scanner-3d.jpg` | 480 × 280 px | `/assets/images/oficina/` | ALTA |

---

## ORIENTAÇÕES GERAIS DE ENTREGA

### Formato e qualidade
- **Fotos de peças, oficina, pessoas:** JPG, qualidade 85%
- **Logos e ícones:** SVG vetorial (ou PNG com fundo transparente)

### Nomenclatura obrigatória
Use os nomes exatos da coluna "Arquivo" da tabela acima, em minúsculas com hífens, sem acentos e sem espaços.

### Estrutura de pastas
Coloque cada arquivo na pasta indicada na coluna "Pasta". Exemplo:

```
/assets/images/hero/
  hero-home.jpg
  hero-solucoes.jpg
  hero-engenharia-reversa.jpg
  hero-portfolio.jpg
  hero-sobre.jpg

/assets/images/portfolio/
  portfolio-reversa.jpg
  portfolio-destaque.jpg
  portfolio-arquitetura.jpg
  portfolio-produto-01.jpg
  portfolio-produto-02.jpg
  portfolio-industria.jpg
  portfolio-reversa-02.jpg

/assets/images/sobre/
  pedro-retrato.jpg
  pedro-em-acao.jpg

/assets/images/oficina/
  oficina-vista-geral.jpg
  oficina-impressora-fdm.jpg
  oficina-scanner-3d.jpg

/assets/images/engenharia-reversa/
  er-peca-original.jpg
  er-escaneamento.jpg
  er-modelo-cad.jpg
  er-peca-impressa.jpg
```

### Substituição dos placeholders
Quando o asset estiver pronto, basta colocar o arquivo na pasta correta com o nome correto e substituir o `<div class="image-placeholder">` pela tag `<img>` no HTML correspondente. Os placeholders estão identificados no código com comentários de seção para facilitar a localização.

---

## CHECKLIST PRIORIDADE ALTA (necessário para publicação)

- [ ] `portfolio-reversa.jpg` — Peça de eng. reversa (Home + Portfólio)
- [ ] `portfolio-destaque.jpg` — Projeto destaque vertical (Portfólio card 02)
- [ ] `portfolio-arquitetura.jpg` — Maquete arquitetônica (Home card 02)
- [ ] `portfolio-produto-01.jpg` — Protótipo produto (Home + Portfólio)
- [ ] `portfolio-produto-02.jpg` — Produto 2ª (Portfólio card 06)
- [ ] `portfolio-industria.jpg` — Peça industrial (Portfólio card 04)
- [ ] `portfolio-reversa-02.jpg` — Eng. reversa 2ª (Portfólio card 05)
- [ ] `pedro-retrato.jpg` — Foto busto do Pedro (Sobre)
- [ ] `oficina-vista-geral.jpg` — Vista panorâmica da oficina (Sobre)
- [ ] `oficina-impressora-fdm.jpg` — Impressora em operação (Sobre)
- [ ] `oficina-scanner-3d.jpg` — Scanner 3D em uso (Sobre)

## CHECKLIST PRIORIDADE MEDIA

- [ ] `hero-home.jpg` — Fundo do hero da Home (1920 × 1080 px)
- [ ] `hero-solucoes.jpg` — Fundo do hero de Soluções (1920 × 500 px)
- [ ] `hero-engenharia-reversa.jpg` — Fundo do hero de Eng. Reversa (1920 × 500 px)
- [ ] `hero-portfolio.jpg` — Fundo do hero de Portfólio (1920 × 500 px)
- [ ] `hero-sobre.jpg` — Fundo do hero de Sobre (1920 × 500 px)
- [ ] `pedro-em-acao.jpg` — Pedro trabalhando (640 × 480 px)

## CHECKLIST PRIORIDADE BAIXA

- [ ] `er-peca-original.jpg` — Peça original (320 × 320 px)
- [ ] `er-escaneamento.jpg` — Scanner em uso (320 × 320 px)
- [ ] `er-modelo-cad.jpg` — Software CAD na tela (320 × 320 px)
- [ ] `er-peca-impressa.jpg` — Peça impressa + original (320 × 320 px)

---

*Documento gerado para o projeto 3DCPX — Impressão 3D Industrial*
*Versão 1.0 — Junho de 2026 — Medidas baseadas no layout real após implementação de placeholders*
