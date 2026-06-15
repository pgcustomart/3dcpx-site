# GUIA DE LAYOUTS — 3DCPX
### Manual de Imagens e Áreas Visuais do Site

---

> **Para uso interno e para o cliente.**
> Este documento descreve todas as áreas visuais do site 3DCPX, com especificações precisas de tamanho, formato e orientações de captura fotográfica. Siga as recomendações desta seção para garantir que as imagens entregues sejam aproveitadas com qualidade máxima — sem necessidade de retrabalho.

---

## SUMÁRIO

1. [Estrutura Geral do Site](#1-estrutura-geral-do-site)
2. [Hero Principal (Home)](#2-hero-principal-home)
3. [Seção Portfólio — Home](#3-seção-portfólio--home)
4. [Portfólio Completo (portfolio.html)](#4-portfólio-completo-portfoliohtml)
5. [Seção Sobre — Pedro (sobre.html)](#5-seção-sobre--pedro-sobrehtml)
6. [Galeria da Oficina (sobre.html)](#6-galeria-da-oficina-sobrehtml)
7. [Seção Soluções (solucoes.html)](#7-seção-soluções-solucoeshtml)
8. [Casos de Uso — Abas (solucoes.html)](#8-casos-de-uso--abas-solucoeshtml)
9. [Engenharia Reversa (engenharia-reversa.html)](#9-engenharia-reversa-engenharia-reversahtml)
10. [Logos de Clientes / Prova Social](#10-logos-de-clientes--prova-social)
11. [Depoimentos](#11-depoimentos)
12. [Rodapé (Footer)](#12-rodapé-footer)
13. [Ícones e Elementos Gráficos](#13-ícones-e-elementos-gráficos)
14. [Padrões Gerais de Qualidade](#14-padrões-gerais-de-qualidade)

---

## 1. ESTRUTURA GERAL DO SITE

O site 3DCPX é composto por **6 páginas**:

| Página | Arquivo | Descrição |
|---|---|---|
| Home | `index.html` | Vitrine principal — resumo de tudo |
| Sobre | `sobre.html` | Pedro + Oficina + Valores |
| Soluções | `solucoes.html` | 6 serviços + casos de uso + processo |
| Portfólio | `portfolio.html` | Grade de projetos realizados + em andamento |
| Eng. Reversa | `engenharia-reversa.html` | Serviço de escaneamento e CAD |
| Orçamento | `orcamento.html` | Formulário de contato + FAQ |

**Paleta visual do site:**
- Fundo: Preto profundo `#0a0a0a`
- Acento primário: Roxo `#7C71F5`
- Acento secundário: Rosa `#D4689F`
- Acento terciário: Dourado `#C9A04A`
- Texto: Branco suave `#f0ede8`

> As fotos devem ter **boa exposição em ambientes com iluminação controlada**. Imagens muito escuras ou com fundo branco puro podem não combinar com a paleta do site.

---

## 2. HERO PRINCIPAL (HOME)

**Arquivo:** `index.html` — Seção `#hero`

### Finalidade
É a primeira coisa que o visitante vê. Deve causar impacto imediato e transmitir modernidade, precisão e credibilidade industrial. Atualmente usa gradientes CSS como fundo — pode receber uma imagem de fundo ou vídeo curto.

### Uso Atual
O hero utiliza:
- Fundo com grade geométrica (CSS)
- Dois brilhos coloridos (roxo e rosa) como elementos decorativos
- Texto sobreposto com headline + estatísticas

### Recomendação de Imagem (Opcional — Fundo)

| Especificação | Desktop | Mobile |
|---|---|---|
| Tamanho ideal | 1920 × 1080 px | 768 × 1080 px |
| Proporção | 16:9 | 9:16 ou 3:4 |
| Peso máximo | 400 KB | 180 KB |
| Formato | JPG (qualidade 85%) | JPG (qualidade 80%) |

**Importante:** Se for usar imagem no hero, ela deve ter **área escura suficiente** para o texto branco ser legível por cima. Prefira fotos com partes escuras no centro ou aplique overlay.

### Orientações de Captura
- Ambiente de oficina ou impressora em funcionamento, vista panorâmica
- Iluminação dramática (luz pontual sobre peça ou impressora)
- Alta profundidade de campo para revelar detalhes técnicos
- Evitar fundos claros ou ambientes muito iluminados

---

## 3. SEÇÃO PORTFÓLIO — HOME

**Arquivo:** `index.html` — Seção `#portfolio`

### Finalidade
Apresenta 3 projetos de destaque na home para estimular o visitante a acessar o portfólio completo. São cards em grade com imagem + categoria + título + materiais usados.

### Especificações das Imagens

| Especificação | Desktop | Mobile |
|---|---|---|
| Tamanho ideal | 600 × 400 px | 400 × 300 px |
| Proporção | 3:2 ou 4:3 | 3:2 |
| Altura mínima | 400 px | 300 px |
| Peso máximo | 120 KB cada | 80 KB cada |
| Formato | JPG | JPG |

**Quantidade:** 3 imagens (um projeto de cada categoria principal)

### Orientações de Captura
- Fundo neutro (preto, cinza escuro ou superfície texturizada)
- Peça centralizada com boa iluminação lateral
- Enquadramento próximo que valorize os detalhes da impressão
- Evitar fundos bagunçados ou com outros objetos ao redor

### Categorias Representadas
1. Engenharia Reversa (`reversa`)
2. Arquitetura & Construção (`arquitetura`)
3. Produto & Design (`produto`)

---

## 4. PORTFÓLIO COMPLETO (portfolio.html)

**Arquivo:** `portfolio.html` — Seção `#projetos`

### Finalidade
Grade filtrável com **6 projetos realizados** e **3 projetos em andamento**. Cada projeto tem imagem, categoria, título, material e uma breve descrição.

### Layout da Grade

A grade possui um card especial (`.portfolio-card--tall`) que ocupa o dobro da altura vertical. Planeje a composição para que a imagem principal do portfólio possa ser usada nesse card.

```
┌─────────────────┬─────────┬─────────┐
│                 │  Card 2 │  Card 3 │
│   Card 1        ├─────────┼─────────┤
│  (card alto)    │  Card 4 │  Card 5 │
├────────────────────────────────────-┤
│           Card 6 (full-width)        │
└──────────────────────────────────────┘
```

### Especificações das Imagens por Tipo

**Cards normais (Cards 2, 3, 4, 5, 6):**

| Especificação | Desktop | Mobile |
|---|---|---|
| Tamanho ideal | 600 × 400 px | 400 × 280 px |
| Proporção | 3:2 | 3:2 |
| Peso máximo | 120 KB | 80 KB |
| Formato | JPG | JPG |

**Card alto / destaque (Card 1):**

| Especificação | Desktop | Mobile |
|---|---|---|
| Tamanho ideal | 600 × 800 px | 400 × 560 px |
| Proporção | 3:4 (vertical) | 3:4 |
| Peso máximo | 180 KB | 120 KB |
| Formato | JPG | JPG |

**Total de imagens:** 6 para projetos realizados + 3 para projetos em andamento (total: **9 imagens**)

### Categorias dos 6 Projetos

| Nº | Categoria | Exemplo de Conteúdo |
|---|---|---|
| 1 | Engenharia Reversa | Peça digitalizada e reproduzida |
| 2 | Arquitetura | Maquete de edifício ou planta volumétrica |
| 3 | Produto & Design | Protótipo de produto consumer |
| 4 | Indústria | Peça mecânica ou conector industrial |
| 5 | Produto & Design | Acessório, embalagem ou objeto de design |
| 6 | Indústria | Conjunto de peças funcionais |

### Projetos em Andamento (3 cards)
Podem ser fotos parciais de projetos sendo executados no momento — impressora funcionando, peça em andamento, modelo 3D na tela.

---

## 5. SEÇÃO SOBRE — PEDRO (sobre.html)

**Arquivo:** `sobre.html` — Seção `#sobre`

### Finalidade
Humanizar a marca apresentando Pedro, o responsável técnico. A foto deve transmitir competência, seriedade e proximidade ao mesmo tempo.

### Especificações da Foto (Retrato)

| Especificação | Desktop | Mobile |
|---|---|---|
| Tamanho ideal | 480 × 640 px | 320 × 420 px |
| Proporção | 3:4 (vertical/retrato) | 3:4 |
| Área de foco | Rosto + ombros (busto) | Idem |
| Peso máximo | 150 KB | 80 KB |
| Formato | JPG | JPG |

### Orientações de Captura
- Fundo escuro ou desfocado (bokeh) — combina com a paleta do site
- Iluminação lateral suave (luz de janela ou softbox)
- Pedro com expressão confiante e acessível — sem forçar sorriso
- Usar roupas adequadas ao ambiente profissional (camiseta preta, jaleco ou similar)
- Pode ser na oficina com a impressora ao fundo (desfocada)
- Evitar selfies, fotos com fundo branco puro ou corte lateral que não preserve o rosto centralizado

### Variação Recomendada
- **Foto 1:** Busto (principal) — para o card da seção Sobre
- **Foto 2:** Corpo inteiro ou 3/4, em ação (operando scanner ou verificando peça) — opcional, para uso em outras seções

---

## 6. GALERIA DA OFICINA (sobre.html)

**Arquivo:** `sobre.html` — Seção `#oficina`

### Finalidade
Apresentar as instalações da oficina/laboratório, transmitindo credibilidade técnica. O layout usa uma grade com **1 foto grande + 2 fotos menores**.

### Layout da Galeria

```
┌───────────────────────┬──────────────┐
│                       │   Foto 2     │
│       Foto 1          │  (menor)     │
│      (principal)      ├──────────────┤
│                       │   Foto 3     │
└───────────────────────┴──────────────┘
```

### Especificações por Foto

**Foto 1 — Vista geral da oficina (grande):**

| Especificação | Desktop | Mobile |
|---|---|---|
| Tamanho ideal | 800 × 480 px | 600 × 360 px |
| Proporção | 5:3 ou 16:9 | 16:9 |
| Peso máximo | 200 KB | 120 KB |
| Formato | JPG | JPG |

**Foto 2 — Impressora FDM:**

| Especificação | Desktop | Mobile |
|---|---|---|
| Tamanho ideal | 480 × 280 px | 400 × 240 px |
| Proporção | 16:9 ou 3:2 | 3:2 |
| Peso máximo | 100 KB | 60 KB |
| Formato | JPG | JPG |

**Foto 3 — Scanner 3D em uso:**

| Especificação | Desktop | Mobile |
|---|---|---|
| Tamanho ideal | 480 × 280 px | 400 × 240 px |
| Proporção | 16:9 ou 3:2 | 3:2 |
| Peso máximo | 100 KB | 60 KB |
| Formato | JPG | JPG |

### Orientações de Captura

**Foto 1 (Vista geral):**
- Ângulo amplo mostrando o ambiente completo
- Iluminação homogênea do ambiente
- Impressoras visíveis, bancadas organizadas
- Hora ideal: equipamentos ligados ou em operação

**Foto 2 (Impressora FDM):**
- Close na impressora durante impressão
- Filamento visível, cabeçote em movimento se possível
- Foco no processo — não apenas na máquina parada

**Foto 3 (Scanner 3D):**
- Pedro utilizando o scanner em uma peça
- Ângulo lateral ou 3/4 mostrando o equipamento e a peça
- Iluminação adequada para o scanner ser visível

---

## 7. SEÇÃO SOLUÇÕES (solucoes.html)

**Arquivo:** `solucoes.html` — Seção `#servicos`

### Finalidade
Apresentar os 6 serviços oferecidos pela 3DCPX em cards com ícone, título e descrição. Atualmente usam ícones SVG — podem receber imagens de fundo ou fotos representativas opcionais.

### Serviços Listados

| Nº | Serviço | Ícone Atual |
|---|---|---|
| 1 | Prototipagem Rápida | Cubo 3D |
| 2 | Engenharia Reversa | Globo/scanner |
| 3 | Peças Funcionais | Cruz/peça |
| 4 | Modelagem 3D | Diamante/CAD |
| 5 | Pós-processamento | Ferramenta |
| 6 | Produção sob Demanda | Relógio |

### Imagens Opcionais (Background dos Cards)

Se decidir adicionar fotos de fundo aos cards de serviços:

| Especificação | Desktop | Mobile |
|---|---|---|
| Tamanho ideal | 480 × 300 px | 400 × 240 px |
| Proporção | 16:10 | 16:10 |
| Peso máximo | 80 KB cada | 50 KB cada |
| Formato | JPG | JPG |
| Observação | Aplicar overlay escuro sobre a foto (no CSS) | Idem |

**Total opcional:** 6 imagens (uma por serviço)

---

## 8. CASOS DE USO — ABAS (solucoes.html)

**Arquivo:** `solucoes.html` — Seção `#casos`

### Finalidade
Apresentar exemplos práticos para 4 setores diferentes através de abas interativas: Indústria, Arquitetura, Produto & Startup, Pesquisa & Saúde. Cada aba pode ter uma imagem ilustrativa.

### Especificações

| Especificação | Desktop | Mobile |
|---|---|---|
| Tamanho ideal | 640 × 480 px | 400 × 300 px |
| Proporção | 4:3 | 4:3 |
| Peso máximo | 150 KB | 80 KB |
| Formato | JPG | JPG |

**Quantidade:** 4 imagens (uma por aba)

### Sugestão de Conteúdo por Aba

| Aba | Sugestão de Foto |
|---|---|
| Indústria | Peça mecânica ou conector industrial impresso |
| Arquitetura | Maquete volumétrica de edificação |
| Produto & Startup | Protótipo de produto em uso ou exposição |
| Pesquisa & Saúde | Modelo anatômico, prótese ou equipamento médico |

---

## 9. ENGENHARIA REVERSA (engenharia-reversa.html)

**Arquivo:** `engenharia-reversa.html` — Seções `#processo` e `#aplicacoes`

### Finalidade
Detalhar o processo de engenharia reversa em 4 etapas visuais e apresentar 4 áreas de aplicação. As fotos devem ilustrar cada etapa do processo.

### Processo em 4 Etapas

| Etapa | Conteúdo Atual | Foto Sugerida |
|---|---|---|
| 1. Peça Física | Ícone SVG | Foto da peça original em mãos ou sobre bancada |
| 2. Escaneamento | Ícone SVG | Scanner operando sobre a peça |
| 3. Modelo 3D | Ícone SVG | Tela de software CAD com modelo renderizado |
| 4. Nova Peça | Ícone SVG | Peça impressa ao lado da peça original |

### Especificações para Fotos de Processo

| Especificação | Desktop | Mobile |
|---|---|---|
| Tamanho ideal | 320 × 320 px | 240 × 240 px |
| Proporção | 1:1 (quadrada) | 1:1 |
| Peso máximo | 80 KB cada | 50 KB cada |
| Formato | JPG ou PNG | JPG |

**Quantidade:** 4 imagens (opcionais, os ícones SVG já cobrem visualmente)

### Aplicações em 4 Setores

| Setor | Sugestão de Foto/Ícone |
|---|---|
| Automotiva | Peça de carro (suporte, conector, painel) |
| Equipamentos | Componente de máquina ou ferramenta industrial |
| Arquitetura | Ornamento ou elemento arquitetônico reproduzido |
| Saúde | Prótese, órtese ou modelo anatômico |

---

## 10. LOGOS DE CLIENTES / PROVA SOCIAL

**Arquivo:** `index.html` — Seção `#prova-social`

### Finalidade
O ticker de prova social exibe métricas de negócio (projetos, satisfação, prazo, anos). Pode ser expandido para incluir logos de clientes/parceiros em um carrossel.

### Especificações para Logos

| Especificação | Valor |
|---|---|
| Tamanho ideal | 160 × 60 px |
| Proporção | Livre (logo em versão horizontal preferível) |
| Fundo | Transparente |
| Peso máximo | 20 KB cada |
| Formato | **SVG** (preferencial) ou **PNG com fundo transparente** |
| Versão de cor | Branco/monocromático (para fundo escuro do site) |

**Quantidade ideal:** 6 a 12 logos

### Orientações
- Solicite logos em versão **branca ou monocromática** aos clientes/parceiros
- Formato SVG é o ideal por ser vetorial e leve
- Se o cliente só tiver PNG colorido, converter para cinza-claro ou branco no Photoshop/Illustrator
- Evitar logos com bordas ou padding excessivo

---

## 11. DEPOIMENTOS

**Arquivo:** Ainda não implementado (previsto)

### Finalidade
Seção de depoimentos de clientes para reforço de credibilidade. Pode incluir foto do depoente ou apenas texto com nome/empresa.

### Especificações para Fotos de Depoentes

| Especificação | Valor |
|---|---|
| Tamanho ideal | 120 × 120 px |
| Proporção | 1:1 (quadrada, recortada em círculo pelo CSS) |
| Peso máximo | 30 KB cada |
| Formato | JPG |
| Enquadramento | Rosto centralizado, fundo simples |

**Quantidade ideal:** 3 a 6 depoimentos

### Alternativa Sem Foto
Se o cliente não quiser fotos de depoentes, usar inicial do nome (letra única) como avatar — o CSS já suporta esse padrão.

---

## 12. RODAPÉ (Footer)

**Arquivo:** Todas as páginas

### Finalidade
O footer exibe logo, links de navegação e ícones de redes sociais. Não requer imagens adicionais — usa apenas ícones SVG inline já implementados.

### Logo no Footer

| Especificação | Valor |
|---|---|
| Formato atual | Texto CSS (sem imagem) |
| Versão imagem (opcional) | SVG vetorial |
| Tamanho se imagem | 120 × 40 px |
| Fundo | Transparente |

---

## 13. ÍCONES E ELEMENTOS GRÁFICOS

### Ícones Já Implementados (SVG Inline)

Todos os ícones abaixo já estão implementados no código e **não precisam ser fornecidos**:

| Local | Ícones |
|---|---|
| Soluções | Cubo 3D, Scanner, Peça, Diamante, Ferramenta, Relógio |
| Navegação | Hamburger, Seta |
| Footer | Instagram, LinkedIn, WhatsApp |
| Sobre | Avatar placeholder |
| Eng. Reversa | Processo em 4 etapas |
| Depoimentos | Aspas |

### Elementos que Podem Ser Adicionados

| Elemento | Formato | Tamanho |
|---|---|---|
| Ícone de certificação/qualidade | SVG | 48 × 48 px |
| Logo de parceiros técnicos | SVG ou PNG | 160 × 60 px |
| Ícone de garantia | SVG | 48 × 48 px |

---

## 14. PADRÕES GERAIS DE QUALIDADE

### Regras Obrigatórias para Todas as Fotos

| Regra | Detalhes |
|---|---|
| Resolução mínima | 72 DPI para web / 300 DPI para versão impressa |
| Espaço de cor | sRGB (padrão para web) |
| Fundo recomendado | Preto, cinza escuro ou desfocado |
| Iluminação | Controlada — evitar flash direto |
| Nitidez | Foco bem definido nas peças/equipamentos |
| Pós-produção | Leve ajuste de contraste/saturação é aceitável |

### Nomenclatura dos Arquivos

Use nomes descritivos em **minúsculas com hífens** (sem espaços, sem acentos):

```
hero-oficina.jpg
portfolio-maquete-arquitetura.jpg
sobre-pedro-retrato.jpg
oficina-vista-geral.jpg
oficina-impressora-fdm.jpg
oficina-scanner-3d.jpg
portfolio-peca-industrial-01.jpg
logo-cliente-empresa-abc.svg
```

### Formatos Recomendados por Uso

| Uso | Formato | Motivo |
|---|---|---|
| Fotografias (peças, oficina, pessoas) | JPG 85% | Melhor relação qualidade/peso |
| Logos e ícones | SVG | Vetorial, escalável sem perda |
| Logos sem versão SVG | PNG fundo transparente | Preserva transparência |
| Imagens com transparência | PNG | Única opção com alpha |
| Thumbnails de portfólio | JPG 80% | Leveza para carregamento rápido |

### Otimização Antes de Enviar

Antes de enviar as imagens, comprimí-las usando uma das ferramentas abaixo:

- **TinyPNG.com** — online, gratuito, para JPG e PNG
- **Squoosh.app** — online, gratuito, controle fino de qualidade
- **ImageOptim** — Mac, gratuito
- **Photoshop** → Exportar para Web → JPG 80-85%

---

---

## MEDIDAS FINAIS BASEADAS NO LAYOUT

> Seção gerada após implementação dos placeholders visuais (Junho 2026).
> Medidas derivadas diretamente do espaço real ocupado no layout, não de estimativas.

### Tabela Consolidada de Assets

| Página | Área | Arquivo | Medida Final | Proporção | Pasta | Prioridade |
|--------|------|---------|--------------|-----------|-------|------------|
| Home | Hero — fundo | `hero-home.jpg` | 1920 × 1080 px | 16:9 | `/assets/images/hero/` | MEDIA |
| Home | Card portfólio — Eng. Reversa | `portfolio-reversa.jpg` | 600 × 400 px | 3:2 | `/assets/images/portfolio/` | ALTA |
| Home | Card portfólio — Arquitetura | `portfolio-arquitetura.jpg` | 600 × 400 px | 3:2 | `/assets/images/portfolio/` | ALTA |
| Home | Card portfólio — Produto | `portfolio-produto-01.jpg` | 600 × 400 px | 3:2 | `/assets/images/portfolio/` | ALTA |
| Soluções | Hero — fundo | `hero-solucoes.jpg` | 1920 × 500 px | ~19:5 | `/assets/images/hero/` | MEDIA |
| Eng. Reversa | Hero — fundo | `hero-engenharia-reversa.jpg` | 1920 × 500 px | ~19:5 | `/assets/images/hero/` | MEDIA |
| Eng. Reversa | Etapa 01 — Peça original | `er-peca-original.jpg` | 320 × 320 px | 1:1 | `/assets/images/engenharia-reversa/` | BAIXA |
| Eng. Reversa | Etapa 02 — Escaneamento 3D | `er-escaneamento.jpg` | 320 × 320 px | 1:1 | `/assets/images/engenharia-reversa/` | BAIXA |
| Eng. Reversa | Etapa 03 — Modelo CAD | `er-modelo-cad.jpg` | 320 × 320 px | 1:1 | `/assets/images/engenharia-reversa/` | BAIXA |
| Eng. Reversa | Etapa 04 — Peça impressa | `er-peca-impressa.jpg` | 320 × 320 px | 1:1 | `/assets/images/engenharia-reversa/` | BAIXA |
| Portfólio | Hero — fundo | `hero-portfolio.jpg` | 1920 × 500 px | ~19:5 | `/assets/images/hero/` | MEDIA |
| Portfólio | Card 01 — Eng. Reversa (normal) | `portfolio-reversa.jpg` | 600 × 400 px | 3:2 | `/assets/images/portfolio/` | ALTA |
| Portfólio | Card 02 — Destaque (tall, 2 linhas) | `portfolio-destaque.jpg` | 600 × 800 px | 3:4 | `/assets/images/portfolio/` | ALTA |
| Portfólio | Card 03 — Produto | `portfolio-produto-01.jpg` | 600 × 400 px | 3:2 | `/assets/images/portfolio/` | ALTA |
| Portfólio | Card 04 — Indústria | `portfolio-industria.jpg` | 600 × 400 px | 3:2 | `/assets/images/portfolio/` | ALTA |
| Portfólio | Card 05 — Eng. Reversa (2ª) | `portfolio-reversa-02.jpg` | 600 × 400 px | 3:2 | `/assets/images/portfolio/` | ALTA |
| Portfólio | Card 06 — Produto (2ª) | `portfolio-produto-02.jpg` | 600 × 400 px | 3:2 | `/assets/images/portfolio/` | ALTA |
| Sobre | Hero — fundo | `hero-sobre.jpg` | 1920 × 500 px | ~19:5 | `/assets/images/hero/` | MEDIA |
| Sobre | Pedro — retrato (3:4, busto) | `pedro-retrato.jpg` | 480 × 640 px | 3:4 | `/assets/images/sobre/` | ALTA |
| Sobre | Pedro — em ação | `pedro-em-acao.jpg` | 640 × 480 px | 4:3 | `/assets/images/sobre/` | MEDIA |
| Sobre | Oficina — vista geral | `oficina-vista-geral.jpg` | 800 × 480 px | 5:3 | `/assets/images/oficina/` | ALTA |
| Sobre | Oficina — impressora FDM | `oficina-impressora-fdm.jpg` | 480 × 280 px | 16:9 | `/assets/images/oficina/` | ALTA |
| Sobre | Oficina — scanner 3D em uso | `oficina-scanner-3d.jpg` | 480 × 280 px | 16:9 | `/assets/images/oficina/` | ALTA |

### Notas de implementação

- **Card Alto (Destaque):** O card 02 em `portfolio.html` usa `grid-row: span 2`, ocupando o dobro da altura. A imagem exibida em `~373 × 450px` — enviar em 600×800 px para qualidade.
- **Heroes/Page-headers:** O site funciona visualmente sem fundo fotográfico (usa CSS puro). As imagens são melhorias de impacto, não bloqueantes.
- **Cards de portfólio Home:** Exibem em `~373 × 200px`. Enviar em 600×400 px para cobertura de telas de alta resolução.
- **Gallery da Oficina:** Foto principal exibe em `~536 × 240px` (span total); fotos menores em `~264 × 140px`. Enviar nas medidas recomendadas para qualidade de tela retina.

---

*Documento gerado para o projeto 3DCPX — Impressão 3D Industrial*
*Versão 2.0 — Junho de 2026 — Atualizado após implementação de placeholders visuais*
