# Kit Black Friday · Landing page

Página estática: HTML, CSS e JS puros, sem build.

## Rodar
Abra `index.html` no navegador, ou no VS Code use a extensão **Live Server** (botão "Go Live").

## Estrutura
- `index.html`: conteúdo da página
- `css/style.css`: estilos (cores e fontes nas variáveis do `:root`)
- `js/main.js`: bloco `CONFIG` no topo + animações do mockup
- `assets/img/`: miniaturas dos templates e imagens do mockup

## Editar antes de publicar (js/main.js → CONFIG)
- `CHECKOUT_URL`: link do checkout
- `PRICE` / `OLD_PRICE`: preço e preço "de"
- `GUARANTEE_DAYS`: dias de garantia (0 oculta)
- `USERS`: número real de comércios que usam (vazio mostra o público do kit)
- `RESULTADOS` e `AVALIACOES`: resultados e depoimentos reais de clientes

## Publicar
Qualquer hospedagem estática serve (Vercel, Netlify, GitHub Pages): suba a pasta inteira.
