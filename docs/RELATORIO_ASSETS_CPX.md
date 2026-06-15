# RELATÓRIO DE ASSETS — 3DCPX
### Mapeamento Completo de Materiais Necessários para Finalização do Site

---

> **Para uso interno e para o cliente.**
> Este relatório lista todos os assets (imagens, logos, ícones e materiais gráficos) necessários para colocar o site 3DCPX em produção. Para cada item estão descritos: quantidade, resolução, pasta de destino e prioridade. Siga a ordem de prioridade para garantir que os elementos mais críticos sejam entregues primeiro.

---

## LEGENDA DE PRIORIDADE

| Prioridade | Significado |
|---|---|
| **ALTA** | Bloqueante — sem esse asset o site não pode ser publicado |
| **MEDIA** | Importante — impacta diretamente na qualidade, mas site pode publicar com placeholder |
| **BAIXA** | Desejável — melhora a experiência, pode ser adicionado após o lançamento |

---

## SUMÁRIO

1. [Hero Principal](#1-hero-principal)
2. [Portfólio — Projetos Realizados](#2-portfólio--projetos-realizados)
3. [Portfólio — Projetos em Andamento](#3-portfólio--projetos-em-andamento)
4. [Foto do Pedro](#4-foto-do-pedro)
5. [Fotos da Oficina](#5-fotos-da-oficina)
6. [Engenharia Reversa — Processo](#6-engenharia-reversa--processo)
7. [Casos de Uso — Abas de Serviço](#7-casos-de-uso--abas-de-serviço)
8. [Logos de Clientes / Parceiros](#8-logos-de-clientes--parceiros)
9. [Depoimentos](#9-depoimentos)
10. [Ícones e Elementos Gráficos](#10-ícones-e-elementos-gráficos)
11. [Conteúdo Textual Pendente](#11-conteúdo-textual-pendente)
12. [Resumo Executivo](#12-resumo-executivo)
13. [Checklist de Entrega](#13-checklist-de-entrega)

---

## 1. HERO PRINCIPAL

**Página:** Home (`index.html`) — Seção `#hero`

O hero atualmente funciona com gradientes CSS (roxo e rosa). A imagem de fundo é **opcional** — o site pode ser publicado sem ela — mas a presença de uma foto real eleva significativamente o impacto visual.

---

### ASSET 1.1 — Imagem de Fundo do Hero

| Campo | Valor |
|---|---|
| **Descrição** | Foto panorâmica da oficina ou impressora em funcionamento |
| **Quantidade** | 1 imagem |
| **Resolução (desktop)** | 1920 × 1080 px |
| **Resolução (mobile)** | 768 × 1080 px (versão recortada verticalmente) |
| **Formato** | JPG — qualidade 85% |
| **Peso máximo** | 400 KB (desktop) / 180 KB (mobile) |
| **Pasta de destino** | `/assets/images/hero/` |
| **Nome do arquivo** | `hero-oficina.jpg` |
| **Prioridade** | **MEDIA** |

**Orientações:**
- Vista panorâmica da oficina com impressoras funcionando
- Iluminação dramática com luz pontual sobre equipamentos
- Área central da foto deve ter partes escuras para o texto ser legível
- Evitar fundo claro ou super iluminado

---

## 2. PORTFÓLIO — PROJETOS REALIZADOS

**Página:** Portfolio (`portfolio.html`) — Seção `#projetos`

São necessários **6 projetos** distribuídos em 4 categorias. Um dos cards ocupa o dobro da altura (card destaque) e requer imagem vertical.

---

### ASSET 2.1 — Projeto Destaque (Card Alto / Vertical)

| Campo | Valor |
|---|---|
| **Descrição** | Projeto mais impactante visualmente — ocupa posição de destaque na grade |
| **Quantidade** | 1 imagem |
| **Resolução** | 600 × 800 px (vertical) |
| **Proporção** | 3:4 |
| **Formato** | JPG — qualidade 85% |
| **Peso máximo** | 180 KB |
| **Pasta de destino** | `/assets/images/portfolio/` |
| **Nome do arquivo** | `portfolio-destaque.jpg` |
| **Prioridade** | **ALTA** |

**Categoria sugerida:** Engenharia reversa ou peça industrial complexa.

---

### ASSET 2.2 — Projeto Engenharia Reversa

| Campo | Valor |
|---|---|
| **Descrição** | Foto de peça original ao lado da reprodução impressa em 3D |
| **Quantidade** | 1 imagem |
| **Resolução** | 600 × 400 px |
| **Proporção** | 3:2 |
| **Formato** | JPG — qualidade 85% |
| **Peso máximo** | 120 KB |
| **Pasta de destino** | `/assets/images/portfolio/` |
| **Nome do arquivo** | `portfolio-engenharia-reversa.jpg` |
| **Prioridade** | **ALTA** |

---

### ASSET 2.3 — Projeto Arquitetura & Construção

| Campo | Valor |
|---|---|
| **Descrição** | Maquete volumétrica de edificação ou planta 3D arquitetônica |
| **Quantidade** | 1 imagem |
| **Resolução** | 600 × 400 px |
| **Proporção** | 3:2 |
| **Formato** | JPG — qualidade 85% |
| **Peso máximo** | 120 KB |
| **Pasta de destino** | `/assets/images/portfolio/` |
| **Nome do arquivo** | `portfolio-arquitetura.jpg` |
| **Prioridade** | **ALTA** |

---

### ASSET 2.4 — Projeto Produto & Design (01)

| Campo | Valor |
|---|---|
| **Descrição** | Protótipo de produto consumer, embalagem ou objeto de design |
| **Quantidade** | 1 imagem |
| **Resolução** | 600 × 400 px |
| **Proporção** | 3:2 |
| **Formato** | JPG — qualidade 85% |
| **Peso máximo** | 120 KB |
| **Pasta de destino** | `/assets/images/portfolio/` |
| **Nome do arquivo** | `portfolio-produto-01.jpg` |
| **Prioridade** | **ALTA** |

---

### ASSET 2.5 — Projeto Produto & Design (02)

| Campo | Valor |
|---|---|
| **Descrição** | Segundo projeto da categoria produto — diferente do anterior |
| **Quantidade** | 1 imagem |
| **Resolução** | 600 × 400 px |
| **Proporção** | 3:2 |
| **Formato** | JPG — qualidade 85% |
| **Peso máximo** | 120 KB |
| **Pasta de destino** | `/assets/images/portfolio/` |
| **Nome do arquivo** | `portfolio-produto-02.jpg` |
| **Prioridade** | **ALTA** |

---

### ASSET 2.6 — Projeto Indústria

| Campo | Valor |
|---|---|
| **Descrição** | Peça mecânica, conector ou conjunto de peças funcionais industriais |
| **Quantidade** | 1 imagem |
| **Resolução** | 600 × 400 px |
| **Proporção** | 3:2 |
| **Formato** | JPG — qualidade 85% |
| **Peso máximo** | 120 KB |
| **Pasta de destino** | `/assets/images/portfolio/` |
| **Nome do arquivo** | `portfolio-industria.jpg` |
| **Prioridade** | **ALTA** |

---

## 3. PORTFÓLIO — PROJETOS EM ANDAMENTO

**Página:** Portfolio (`portfolio.html`) — Seção `#em-andamento`

Três cards mostram projetos atualmente em execução com barra de progresso e status. As fotos devem mostrar o processo em tempo real.

---

### ASSET 3.1 — Projeto em Impressão

| Campo | Valor |
|---|---|
| **Descrição** | Foto de impressora FDM/Resina em operação com peça sendo gerada |
| **Quantidade** | 1 imagem |
| **Resolução** | 480 × 320 px |
| **Proporção** | 3:2 |
| **Formato** | JPG — qualidade 80% |
| **Peso máximo** | 80 KB |
| **Pasta de destino** | `/assets/images/portfolio/em-andamento/` |
| **Nome do arquivo** | `andamento-impressao.jpg` |
| **Prioridade** | **MEDIA** |

---

### ASSET 3.2 — Projeto em Modelagem

| Campo | Valor |
|---|---|
| **Descrição** | Tela de software CAD (Fusion360, SolidWorks ou similar) com modelo em desenvolvimento |
| **Quantidade** | 1 imagem (screenshot ou foto da tela) |
| **Resolução** | 480 × 320 px |
| **Proporção** | 3:2 |
| **Formato** | JPG — qualidade 80% |
| **Peso máximo** | 80 KB |
| **Pasta de destino** | `/assets/images/portfolio/em-andamento/` |
| **Nome do arquivo** | `andamento-modelagem.jpg` |
| **Prioridade** | **MEDIA** |

---

### ASSET 3.3 — Projeto em Acabamento

| Campo | Valor |
|---|---|
| **Descrição** | Peça impressa sendo lixada, pintada ou com pós-processamento em andamento |
| **Quantidade** | 1 imagem |
| **Resolução** | 480 × 320 px |
| **Proporção** | 3:2 |
| **Formato** | JPG — qualidade 80% |
| **Peso máximo** | 80 KB |
| **Pasta de destino** | `/assets/images/portfolio/em-andamento/` |
| **Nome do arquivo** | `andamento-acabamento.jpg` |
| **Prioridade** | **MEDIA** |

---

## 4. FOTO DO PEDRO

**Página:** Sobre (`sobre.html`) — Seção `#sobre`

A foto do Pedro é um dos assets mais importantes para humanizar a marca e transmitir confiança ao cliente.

---

### ASSET 4.1 — Retrato Principal (Busto)

| Campo | Valor |
|---|---|
| **Descrição** | Foto profissional de Pedro — busto, expressão confiante |
| **Quantidade** | 1 imagem |
| **Resolução** | 480 × 640 px |
| **Proporção** | 3:4 (vertical) |
| **Formato** | JPG — qualidade 85% |
| **Peso máximo** | 150 KB |
| **Pasta de destino** | `/assets/images/sobre/` |
| **Nome do arquivo** | `pedro-retrato.jpg` |
| **Prioridade** | **ALTA** |

**Orientações:**
- Fundo escuro ou desfocado
- Iluminação lateral suave
- Traje profissional (camiseta preta, jaleco ou similar)
- Enquadramento: da cabeça até o torso
- Expressão: confiante, não rígida

---

### ASSET 4.2 — Pedro em Ação (Opcional)

| Campo | Valor |
|---|---|
| **Descrição** | Pedro operando scanner, verificando peça ou em frente ao computador com CAD |
| **Quantidade** | 1 imagem |
| **Resolução** | 640 × 480 px |
| **Proporção** | 4:3 ou 3:2 |
| **Formato** | JPG — qualidade 85% |
| **Peso máximo** | 150 KB |
| **Pasta de destino** | `/assets/images/sobre/` |
| **Nome do arquivo** | `pedro-em-acao.jpg` |
| **Prioridade** | **MEDIA** |

---

## 5. FOTOS DA OFICINA

**Página:** Sobre (`sobre.html`) — Seção `#oficina`

A galeria da oficina usa um layout assimétrico: 1 foto grande + 2 fotos menores.

---

### ASSET 5.1 — Vista Geral da Oficina

| Campo | Valor |
|---|---|
| **Descrição** | Foto panorâmica do ambiente — impressoras visíveis, bancadas organizadas |
| **Quantidade** | 1 imagem |
| **Resolução** | 800 × 480 px |
| **Proporção** | 5:3 ou 16:9 |
| **Formato** | JPG — qualidade 85% |
| **Peso máximo** | 200 KB |
| **Pasta de destino** | `/assets/images/oficina/` |
| **Nome do arquivo** | `oficina-vista-geral.jpg` |
| **Prioridade** | **ALTA** |

---

### ASSET 5.2 — Impressora FDM em Operação

| Campo | Valor |
|---|---|
| **Descrição** | Close na impressora durante processo de impressão — filamento visível, cabeçote em movimento |
| **Quantidade** | 1 imagem |
| **Resolução** | 480 × 280 px |
| **Proporção** | 16:9 |
| **Formato** | JPG — qualidade 85% |
| **Peso máximo** | 100 KB |
| **Pasta de destino** | `/assets/images/oficina/` |
| **Nome do arquivo** | `oficina-impressora-fdm.jpg` |
| **Prioridade** | **ALTA** |

---

### ASSET 5.3 — Scanner 3D em Uso

| Campo | Valor |
|---|---|
| **Descrição** | Pedro ou mãos usando scanner 3D sobre uma peça — processo de digitalização |
| **Quantidade** | 1 imagem |
| **Resolução** | 480 × 280 px |
| **Proporção** | 16:9 |
| **Formato** | JPG — qualidade 85% |
| **Peso máximo** | 100 KB |
| **Pasta de destino** | `/assets/images/oficina/` |
| **Nome do arquivo** | `oficina-scanner-3d.jpg` |
| **Prioridade** | **ALTA** |

---

### ASSET 5.4 — Fotos Adicionais da Oficina (Opcional)

| Campo | Valor |
|---|---|
| **Descrição** | Detalhes da oficina: filamentos, peças prontas, bancada de trabalho, impressora de resina |
| **Quantidade** | 3 a 6 imagens |
| **Resolução** | 600 × 400 px cada |
| **Formato** | JPG — qualidade 80% |
| **Peso máximo** | 100 KB cada |
| **Pasta de destino** | `/assets/images/oficina/extras/` |
| **Prioridade** | **BAIXA** |

---

## 6. ENGENHARIA REVERSA — PROCESSO

**Página:** Engenharia Reversa (`engenharia-reversa.html`) — Seção `#processo`

Quatro imagens que ilustram cada etapa do processo de engenharia reversa. O site atualmente usa ícones SVG que já funcionam bem — estas fotos são uma melhoria opcional.

---

### ASSET 6.1 — Peça Física Original

| Campo | Valor |
|---|---|
| **Descrição** | Foto da peça original (dano visível ou desgaste) sobre bancada neutra |
| **Quantidade** | 1 imagem |
| **Resolução** | 320 × 320 px |
| **Proporção** | 1:1 (quadrada) |
| **Formato** | JPG — qualidade 85% |
| **Peso máximo** | 80 KB |
| **Pasta de destino** | `/assets/images/engenharia-reversa/` |
| **Nome do arquivo** | `er-peca-original.jpg` |
| **Prioridade** | **BAIXA** |

---

### ASSET 6.2 — Processo de Escaneamento

| Campo | Valor |
|---|---|
| **Descrição** | Scanner 3D operando sobre a peça — feixes de luz visíveis se possível |
| **Quantidade** | 1 imagem |
| **Resolução** | 320 × 320 px |
| **Proporção** | 1:1 (quadrada) |
| **Formato** | JPG — qualidade 85% |
| **Peso máximo** | 80 KB |
| **Pasta de destino** | `/assets/images/engenharia-reversa/` |
| **Nome do arquivo** | `er-escaneamento.jpg` |
| **Prioridade** | **BAIXA** |

---

### ASSET 6.3 — Modelo 3D em Software CAD

| Campo | Valor |
|---|---|
| **Descrição** | Screenshot ou foto de tela com modelo 3D renderizado em software (Fusion360, SolidWorks, etc.) |
| **Quantidade** | 1 imagem |
| **Resolução** | 320 × 320 px |
| **Proporção** | 1:1 (quadrada) |
| **Formato** | JPG ou PNG — qualidade 85% |
| **Peso máximo** | 80 KB |
| **Pasta de destino** | `/assets/images/engenharia-reversa/` |
| **Nome do arquivo** | `er-modelo-cad.jpg` |
| **Prioridade** | **BAIXA** |

---

### ASSET 6.4 — Peça Impressa (Resultado Final)

| Campo | Valor |
|---|---|
| **Descrição** | Peça impressa ao lado da original — comparativo antes/depois |
| **Quantidade** | 1 imagem |
| **Resolução** | 320 × 320 px |
| **Proporção** | 1:1 (quadrada) |
| **Formato** | JPG — qualidade 85% |
| **Peso máximo** | 80 KB |
| **Pasta de destino** | `/assets/images/engenharia-reversa/` |
| **Nome do arquivo** | `er-peca-impressa.jpg` |
| **Prioridade** | **BAIXA** |

---

## 7. CASOS DE USO — ABAS DE SERVIÇO

**Página:** Soluções (`solucoes.html`) — Seção `#casos`

Quatro imagens para as abas interativas de casos de uso por setor.

---

### ASSET 7.1 — Caso de Uso: Indústria

| Campo | Valor |
|---|---|
| **Descrição** | Peça mecânica ou conector industrial — peça funcional em contexto de uso |
| **Quantidade** | 1 imagem |
| **Resolução** | 640 × 480 px |
| **Proporção** | 4:3 |
| **Formato** | JPG — qualidade 85% |
| **Peso máximo** | 150 KB |
| **Pasta de destino** | `/assets/images/casos-uso/` |
| **Nome do arquivo** | `caso-industria.jpg` |
| **Prioridade** | **MEDIA** |

---

### ASSET 7.2 — Caso de Uso: Arquitetura

| Campo | Valor |
|---|---|
| **Descrição** | Maquete de edificação ou elemento arquitetônico impresso |
| **Quantidade** | 1 imagem |
| **Resolução** | 640 × 480 px |
| **Proporção** | 4:3 |
| **Formato** | JPG — qualidade 85% |
| **Peso máximo** | 150 KB |
| **Pasta de destino** | `/assets/images/casos-uso/` |
| **Nome do arquivo** | `caso-arquitetura.jpg` |
| **Prioridade** | **MEDIA** |

---

### ASSET 7.3 — Caso de Uso: Produto & Startup

| Campo | Valor |
|---|---|
| **Descrição** | Protótipo de produto em uso ou exibição — aspecto de produto final |
| **Quantidade** | 1 imagem |
| **Resolução** | 640 × 480 px |
| **Proporção** | 4:3 |
| **Formato** | JPG — qualidade 85% |
| **Peso máximo** | 150 KB |
| **Pasta de destino** | `/assets/images/casos-uso/` |
| **Nome do arquivo** | `caso-produto.jpg` |
| **Prioridade** | **MEDIA** |

---

### ASSET 7.4 — Caso de Uso: Pesquisa & Saúde

| Campo | Valor |
|---|---|
| **Descrição** | Modelo anatômico, prótese customizada ou equipamento médico impresso |
| **Quantidade** | 1 imagem |
| **Resolução** | 640 × 480 px |
| **Proporção** | 4:3 |
| **Formato** | JPG — qualidade 85% |
| **Peso máximo** | 150 KB |
| **Pasta de destino** | `/assets/images/casos-uso/` |
| **Nome do arquivo** | `caso-saude.jpg` |
| **Prioridade** | **MEDIA** |

---

## 8. LOGOS DE CLIENTES / PARCEIROS

**Página:** Home (`index.html`) — Ticker de Prova Social (expansão futura)

Logos de empresas atendidas ou parceiros técnicos para reforçar credibilidade.

---

### ASSET 8.1 — Logo de Cliente/Parceiro

| Campo | Valor |
|---|---|
| **Descrição** | Logos em versão monocromática/branca das empresas atendidas |
| **Quantidade ideal** | 6 a 12 logos |
| **Resolução** | 160 × 60 px (ou proporcional) |
| **Formato** | **SVG** (preferencial) ou PNG fundo transparente |
| **Versão de cor** | Branca ou cinza claro (para fundo escuro) |
| **Peso máximo** | 20 KB cada |
| **Pasta de destino** | `/assets/images/clientes/` |
| **Nomenclatura** | `logo-[nome-empresa].svg` ou `.png` |
| **Prioridade** | **MEDIA** |

**Observação:** Se a empresa parceira não tiver versão branca do logo, solicitar o arquivo fonte (AI, EPS ou SVG) para adaptação.

---

## 9. DEPOIMENTOS

**Página:** Seção a ser implementada (prevista para fase 2)

---

### ASSET 9.1 — Foto dos Depoentes

| Campo | Valor |
|---|---|
| **Descrição** | Foto de rosto do cliente que forneceu depoimento |
| **Quantidade ideal** | 3 a 6 fotos |
| **Resolução** | 120 × 120 px |
| **Proporção** | 1:1 (quadrada) |
| **Formato** | JPG — qualidade 85% |
| **Peso máximo** | 30 KB cada |
| **Pasta de destino** | `/assets/images/depoimentos/` |
| **Nomenclatura** | `depoimento-[nome].jpg` |
| **Prioridade** | **BAIXA** |

**Alternativa:** Se não houver foto, usar a inicial do nome como avatar (já suportado pelo CSS).

---

### ASSET 9.2 — Textos dos Depoimentos

| Campo | Valor |
|---|---|
| **Descrição** | Texto real de depoimento + nome + cargo + empresa do cliente |
| **Quantidade ideal** | 3 a 6 depoimentos |
| **Formato de entrega** | Texto simples (Word, e-mail ou WhatsApp) |
| **Pasta de destino** | N/A (conteúdo textual para o HTML) |
| **Prioridade** | **BAIXA** |

---

## 10. ÍCONES E ELEMENTOS GRÁFICOS

### O Que JÁ Está Implementado (Não Precisa Fornecer)

Todos os ícones abaixo já estão prontos no código como SVG inline:

| Elemento | Status |
|---|---|
| Ícones dos 6 serviços | Implementado |
| Logo da 3DCPX (texto) | Implementado |
| Ícones de redes sociais | Implementado |
| Avatar placeholder (Pedro) | Implementado |
| Ícones de processo (4 etapas) | Implementado |
| Ícones de navegação | Implementado |
| Indicadores de progresso | Implementado |

### O Que Pode Ser Adicionado (Opcional)

---

### ASSET 10.1 — Logo da 3DCPX em Versão SVG/PNG

| Campo | Valor |
|---|---|
| **Descrição** | Logotipo oficial da 3DCPX caso exista versão gráfica além do texto CSS |
| **Quantidade** | 1 arquivo |
| **Formato** | SVG vetorial (preferencial) ou PNG 300 DPI |
| **Versões necessárias** | Cor (sobre fundo escuro) + Monocromática branca |
| **Peso máximo** | 50 KB |
| **Pasta de destino** | `/assets/images/logo/` |
| **Nomenclatura** | `logo-3dcpx.svg` / `logo-3dcpx-branco.svg` |
| **Prioridade** | **MEDIA** |

---

### ASSET 10.2 — Ícone Favicon

| Campo | Valor |
|---|---|
| **Descrição** | Ícone exibido na aba do navegador |
| **Quantidade** | 1 arquivo |
| **Resolução** | 512 × 512 px (será gerado automaticamente em múltiplos tamanhos) |
| **Formato** | SVG ou PNG fundo transparente |
| **Pasta de destino** | Raiz do projeto (`/favicon.ico` + `/favicon.svg`) |
| **Prioridade** | **ALTA** |

**Observação:** O favicon pode ser a letra "C" ou o símbolo "3D" estilizado da marca. É exibido em todos os contextos onde o site aparece (abas, bookmarks, histórico). Atualmente o site não possui favicon — isso aparece como ícone genérico no navegador.

---

## 11. CONTEÚDO TEXTUAL PENDENTE

Além das imagens, alguns textos precisam ser confirmados ou preenchidos pelo cliente antes da publicação.

| Item | Status | Prioridade |
|---|---|---|
| Número de WhatsApp real | Placeholder: `5500000000000` | **ALTA** |
| E-mail de contato real | Placeholder: `contato@3dcpx.com.br` | **ALTA** |
| Links das redes sociais (Instagram, LinkedIn) | Placeholder: `#` | **ALTA** |
| Bio completa do Pedro | Texto placeholder implementado | **MEDIA** |
| Descrição real dos 6 serviços | Texto placeholder implementado | **MEDIA** |
| Textos do FAQ (8 perguntas) | Texto placeholder implementado | **MEDIA** |
| Métricas reais (projetos, satisfação, anos) | Placeholders: 340+, 98%, <24h, 7+ anos | **ALTA** |
| Nome dos projetos do portfólio | Placeholders genéricos | **ALTA** |
| Localização / cidade da oficina | Não exibido atualmente | **BAIXA** |
| Backend do formulário de contato | Simulado — sem envio real | **ALTA** |

---

## 12. RESUMO EXECUTIVO

### Totais por Prioridade

| Prioridade | Qtd. de Assets | Descrição |
|---|---|---|
| **ALTA** | 12 | Portfólio (6) + Oficina (3) + Pedro (1) + Favicon (1) + Form backend (1) |
| **MEDIA** | 10 | Hero (1) + Casos de uso (4) + Andamento (3) + Logo (1) + Clientes (1 lote) |
| **BAIXA** | 9 | Eng. Reversa (4) + Depoimentos (2) + Extras oficina (1 lote) + Logo gráfico (1) + Localização (1) |

### Estrutura de Pastas Recomendada

```
/assets/
  /images/
    /hero/
      hero-oficina.jpg
    /portfolio/
      portfolio-destaque.jpg
      portfolio-engenharia-reversa.jpg
      portfolio-arquitetura.jpg
      portfolio-produto-01.jpg
      portfolio-produto-02.jpg
      portfolio-industria.jpg
      /em-andamento/
        andamento-impressao.jpg
        andamento-modelagem.jpg
        andamento-acabamento.jpg
    /sobre/
      pedro-retrato.jpg
      pedro-em-acao.jpg
    /oficina/
      oficina-vista-geral.jpg
      oficina-impressora-fdm.jpg
      oficina-scanner-3d.jpg
      /extras/
    /engenharia-reversa/
      er-peca-original.jpg
      er-escaneamento.jpg
      er-modelo-cad.jpg
      er-peca-impressa.jpg
    /casos-uso/
      caso-industria.jpg
      caso-arquitetura.jpg
      caso-produto.jpg
      caso-saude.jpg
    /clientes/
      logo-[empresa].svg
    /depoimentos/
      depoimento-[nome].jpg
    /logo/
      logo-3dcpx.svg
      logo-3dcpx-branco.svg
```

---

## 13. CHECKLIST DE ENTREGA

Use esta lista para acompanhar o recebimento dos materiais do cliente.

### PRIORIDADE ALTA — Necessário para publicação

- [ ] `portfolio-destaque.jpg` — Projeto destaque (vertical 3:4)
- [ ] `portfolio-engenharia-reversa.jpg` — Projeto eng. reversa
- [ ] `portfolio-arquitetura.jpg` — Projeto arquitetura
- [ ] `portfolio-produto-01.jpg` — Projeto produto (1)
- [ ] `portfolio-produto-02.jpg` — Projeto produto (2)
- [ ] `portfolio-industria.jpg` — Projeto indústria
- [ ] `oficina-vista-geral.jpg` — Vista geral da oficina
- [ ] `oficina-impressora-fdm.jpg` — Impressora em operação
- [ ] `oficina-scanner-3d.jpg` — Scanner 3D em uso
- [ ] `pedro-retrato.jpg` — Foto retrato do Pedro
- [ ] `favicon.svg` ou `favicon.png` — Ícone do site
- [ ] Número de WhatsApp real
- [ ] E-mail de contato real
- [ ] Links de redes sociais (Instagram + LinkedIn)
- [ ] Métricas reais (projetos, satisfação, tempo de resposta, anos)
- [ ] Nomes reais dos projetos do portfólio
- [ ] Integração real do formulário de contato (backend)

### PRIORIDADE MÉDIA — Importante para qualidade

- [ ] `hero-oficina.jpg` — Imagem de fundo do hero
- [ ] `pedro-em-acao.jpg` — Pedro em ação (opcional)
- [ ] `andamento-impressao.jpg` — Projeto em impressão
- [ ] `andamento-modelagem.jpg` — Projeto em modelagem
- [ ] `andamento-acabamento.jpg` — Projeto em acabamento
- [ ] `caso-industria.jpg` — Caso de uso indústria
- [ ] `caso-arquitetura.jpg` — Caso de uso arquitetura
- [ ] `caso-produto.jpg` — Caso de uso produto
- [ ] `caso-saude.jpg` — Caso de uso saúde
- [ ] `logo-3dcpx.svg` — Logo gráfico (se existir)
- [ ] 6 a 12 logos de clientes/parceiros

### PRIORIDADE BAIXA — Pode ser adicionado após lançamento

- [ ] `er-peca-original.jpg` — Peça original (eng. reversa)
- [ ] `er-escaneamento.jpg` — Processo de escaneamento
- [ ] `er-modelo-cad.jpg` — Modelo em software CAD
- [ ] `er-peca-impressa.jpg` — Peça impressa resultado
- [ ] 3 a 6 fotos adicionais da oficina
- [ ] Fotos + textos de depoimentos (3 a 6)
- [ ] Localização/endereço da oficina

---

---

## MEDIDAS FINAIS BASEADAS NO LAYOUT

> Seção gerada após implementação dos placeholders visuais (Junho 2026).
> Substitui estimativas anteriores por medidas reais extraídas do CSS do layout.

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
| Portfólio | Card 02 — Destaque (tall) | `portfolio-destaque.jpg` | 600 × 800 px | 3:4 | `/assets/images/portfolio/` | ALTA |
| Portfólio | Card 03 — Produto | `portfolio-produto-01.jpg` | 600 × 400 px | 3:2 | `/assets/images/portfolio/` | ALTA |
| Portfólio | Card 04 — Indústria | `portfolio-industria.jpg` | 600 × 400 px | 3:2 | `/assets/images/portfolio/` | ALTA |
| Portfólio | Card 05 — Eng. Reversa (2ª) | `portfolio-reversa-02.jpg` | 600 × 400 px | 3:2 | `/assets/images/portfolio/` | ALTA |
| Portfólio | Card 06 — Produto (2ª) | `portfolio-produto-02.jpg` | 600 × 400 px | 3:2 | `/assets/images/portfolio/` | ALTA |
| Sobre | Hero — fundo | `hero-sobre.jpg` | 1920 × 500 px | ~19:5 | `/assets/images/hero/` | MEDIA |
| Sobre | Pedro — retrato | `pedro-retrato.jpg` | 480 × 640 px | 3:4 | `/assets/images/sobre/` | ALTA |
| Sobre | Pedro — em ação | `pedro-em-acao.jpg` | 640 × 480 px | 4:3 | `/assets/images/sobre/` | MEDIA |
| Sobre | Oficina — vista geral | `oficina-vista-geral.jpg` | 800 × 480 px | 5:3 | `/assets/images/oficina/` | ALTA |
| Sobre | Oficina — impressora FDM | `oficina-impressora-fdm.jpg` | 480 × 280 px | 16:9 | `/assets/images/oficina/` | ALTA |
| Sobre | Oficina — scanner 3D | `oficina-scanner-3d.jpg` | 480 × 280 px | 16:9 | `/assets/images/oficina/` | ALTA |

**Total de assets com placeholder implementado: 23**
**Assets de prioridade ALTA: 13** · **MEDIA: 6** · **BAIXA: 4**

---

*Documento gerado para o projeto 3DCPX — Impressão 3D Industrial*
*Versão 2.0 — Junho de 2026 — Atualizado após implementação de placeholders visuais*
