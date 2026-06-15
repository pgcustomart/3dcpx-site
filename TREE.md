# TREE — Estrutura do Projeto 3DCPX

> Atualizado em: Junho de 2026
> Gerado após reorganização profissional da estrutura de pastas.

```
Cpx-site/
│
├─ index.html                        # Home — vitrine principal
├─ sobre.html                        # Pedro + Oficina + Valores
├─ solucoes.html                     # 6 serviços + casos de uso + processo
├─ portfolio.html                    # Projetos realizados + em andamento
├─ engenharia-reversa.html           # Serviço de escaneamento e CAD
├─ orcamento.html                    # Formulário de contato + FAQ
│
├─ assets/
│   ├─ css/
│   │   └─ styles.css                # Folha de estilos principal (~1950 linhas)
│   │
│   ├─ js/
│   │   └─ script.js                 # Menu, scroll, filtros, tabs, FAQ, contadores
│   │
│   ├─ images/
│   │   ├─ hero/
│   │   │   └─ [hero-oficina.jpg]    # Imagem de fundo do hero (aguardando)
│   │   │
│   │   ├─ portfolio/
│   │   │   ├─ [portfolio-destaque.jpg]            # Card alto — projeto principal
│   │   │   ├─ [portfolio-engenharia-reversa.jpg]
│   │   │   ├─ [portfolio-arquitetura.jpg]
│   │   │   ├─ [portfolio-produto-01.jpg]
│   │   │   ├─ [portfolio-produto-02.jpg]
│   │   │   ├─ [portfolio-industria.jpg]
│   │   │   └─ em-andamento/
│   │   │       ├─ [andamento-impressao.jpg]
│   │   │       ├─ [andamento-modelagem.jpg]
│   │   │       └─ [andamento-acabamento.jpg]
│   │   │
│   │   ├─ oficina/
│   │   │   ├─ [oficina-vista-geral.jpg]
│   │   │   ├─ [oficina-impressora-fdm.jpg]
│   │   │   ├─ [oficina-scanner-3d.jpg]
│   │   │   └─ extras/
│   │   │       └─ [fotos-adicionais...]
│   │   │
│   │   ├─ sobre/
│   │   │   ├─ [pedro-retrato.jpg]
│   │   │   └─ [pedro-em-acao.jpg]
│   │   │
│   │   ├─ engenharia-reversa/
│   │   │   ├─ [er-peca-original.jpg]
│   │   │   ├─ [er-escaneamento.jpg]
│   │   │   ├─ [er-modelo-cad.jpg]
│   │   │   └─ [er-peca-impressa.jpg]
│   │   │
│   │   ├─ casos-uso/
│   │   │   ├─ [caso-industria.jpg]
│   │   │   ├─ [caso-arquitetura.jpg]
│   │   │   ├─ [caso-produto.jpg]
│   │   │   └─ [caso-saude.jpg]
│   │   │
│   │   ├─ clientes/
│   │   │   └─ [logo-[empresa].svg]  # Logos em branco/monocromático
│   │   │
│   │   ├─ depoimentos/
│   │   │   └─ [depoimento-[nome].jpg]
│   │   │
│   │   └─ logo/
│   │       ├─ [logo-3dcpx.svg]
│   │       └─ [logo-3dcpx-branco.svg]
│   │
│   ├─ icons/                        # Ícones externos (se necessário)
│   └─ fonts/                        # Fontes locais (se Google Fonts for removida)
│
├─ docs/
│   ├─ GUIA_LAYOUTS_CPX.md           # Especificações visuais de cada seção
│   ├─ RELATORIO_ASSETS_CPX.md       # Mapeamento de todos os assets necessários
│   └─ [GUIA_CONTEUDO_CPX.pdf]       # Versão PDF para o cliente (aguardando)
│
├─ archive/
│   ├─ antigas-versoes/              # Versões anteriores do projeto
│   └─ testes/                       # Experimentos e protótipos descartados
│
├─ .gitignore                        # Regras de exclusão do Git
├─ README.md                         # Documentação principal do projeto
└─ TREE.md                           # Este arquivo — árvore atualizada
```

---

## Legenda

| Símbolo | Significado |
|---|---|
| `[nome.ext]` | Arquivo aguardando — pasta criada, asset ainda não recebido |
| `[fotos-adicionais...]` | Múltiplos arquivos, quantidade variável |
| Sem colchetes | Arquivo já presente no repositório |

---

## Status dos Assets

| Pasta | Status |
|---|---|
| `assets/css/` | Completo |
| `assets/js/` | Completo |
| `assets/images/hero/` | Aguardando foto do cliente |
| `assets/images/portfolio/` | Aguardando 6 fotos (PRIORIDADE ALTA) |
| `assets/images/portfolio/em-andamento/` | Aguardando 3 fotos |
| `assets/images/oficina/` | Aguardando 3 fotos (PRIORIDADE ALTA) |
| `assets/images/sobre/` | Aguardando retrato do Pedro (PRIORIDADE ALTA) |
| `assets/images/engenharia-reversa/` | Aguardando (PRIORIDADE BAIXA) |
| `assets/images/casos-uso/` | Aguardando 4 fotos |
| `assets/images/clientes/` | Aguardando logos |
| `assets/images/depoimentos/` | Aguardando (pós-lançamento) |
| `assets/images/logo/` | Aguardando versão SVG do logo |
| `docs/` | Guias criados — PDF pendente |

Consulte `docs/RELATORIO_ASSETS_CPX.md` para especificações completas de cada asset.
