# 3DCPX — Site Institucional

Site institucional da **3DCPX Impressão 3D Industrial**. Frontend estático em HTML, CSS e JavaScript puro — sem dependências, sem build step, pronto para hospedagem direta.

---

## Tecnologias

- HTML5 semântico
- CSS3 com variáveis customizadas (sem framework)
- JavaScript vanilla (ES6+)
- Google Fonts — Inter

## Estrutura de Pastas

```
/
├─ index.html                  Home — vitrine principal
├─ sobre.html                  Pedro + Oficina + Valores
├─ solucoes.html               6 serviços + casos de uso + processo
├─ portfolio.html              Projetos realizados + em andamento
├─ engenharia-reversa.html     Serviço de escaneamento e CAD
├─ orcamento.html              Formulário de contato + FAQ
│
├─ assets/
│   ├─ css/
│   │   └─ styles.css          Folha de estilos principal (~1950 linhas)
│   ├─ js/
│   │   └─ script.js           Interações: menu, scroll, filtros, tabs, FAQ
│   ├─ images/
│   │   ├─ hero/               Imagem de fundo do hero principal
│   │   ├─ portfolio/          Fotos dos projetos realizados
│   │   │   └─ em-andamento/   Fotos de projetos em execução
│   │   ├─ oficina/            Fotos do espaço de trabalho
│   │   │   └─ extras/         Fotos adicionais da oficina
│   │   ├─ sobre/              Foto do Pedro (retrato + ação)
│   │   ├─ engenharia-reversa/ Fotos do processo de ER (4 etapas)
│   │   ├─ casos-uso/          Fotos para as abas de casos de uso
│   │   ├─ clientes/           Logos de clientes e parceiros (SVG/PNG)
│   │   ├─ depoimentos/        Fotos dos depoentes
│   │   └─ logo/               Logotipo oficial em SVG e variações
│   ├─ icons/                  Ícones adicionais (se necessário)
│   └─ fonts/                  Fontes locais (se Google Fonts for removida)
│
├─ docs/
│   ├─ GUIA_LAYOUTS_CPX.md     Especificações visuais de cada seção
│   ├─ RELATORIO_ASSETS_CPX.md Mapeamento de todos os assets necessários
│   └─ GUIA_CONTEUDO_CPX.pdf   (Versão PDF para compartilhar com o cliente)
│
├─ archive/
│   ├─ antigas-versoes/        Versões anteriores preservadas para referência
│   └─ testes/                 Arquivos de experimentos e protótipos
│
├─ .gitignore
├─ README.md                   Este arquivo
└─ TREE.md                     Árvore completa e atualizada do projeto
```

## Publicação

O site pode ser publicado em qualquer serviço de hospedagem estática:

| Serviço | Como publicar |
|---|---|
| **Netlify** | Arrastar a pasta do projeto para app.netlify.com ou conectar ao GitHub |
| **GitHub Pages** | Ativar Pages no repositório → branch main → pasta `/` (root) |
| **Vercel** | `vercel --prod` na raiz do projeto |
| **Hostinger / cPanel** | Upload de todos os arquivos via FTP para `public_html/` |

Não é necessário nenhum build step — apenas copiar os arquivos para o servidor.

## Checklist Pré-Publicação

- [ ] Substituir número de WhatsApp placeholder (`5500000000000`)
- [ ] Substituir e-mail placeholder (`contato@3dcpx.com.br`)
- [ ] Adicionar links reais de Instagram e LinkedIn
- [ ] Inserir fotos reais no portfólio (ver `docs/RELATORIO_ASSETS_CPX.md`)
- [ ] Configurar backend do formulário de contato (Formspree, Netlify Forms, etc.)
- [ ] Adicionar favicon (`favicon.ico` e `favicon.svg` na raiz)
- [ ] Revisar métricas (projetos realizados, anos de experiência, etc.)

## Contato do Projeto

Desenvolvido por **PG Custom**
