# slop

Página com os projetos que fiz com IA, publicada em https://slop.lucaspolo.dev/.

É HTML e CSS puros, sem build. Para ver localmente, abra `site/index.html` no navegador.

## Adicionar um projeto

Copie um bloco `<article class="project">` em `site/index.html`, coloque o projeto novo no topo da lista e ajuste título, descrição, selo, tags e links. O link para o código só entra quando o repositório é público.

Cada card tem um desenho em `site/img/<projeto>.svg`. As regras de estilo estão no `AGENTS.md`.

## Publicação

Cada push na `main` roda `.github/workflows/pages.yml`, que publica a pasta `site/` no GitHub Pages.

O domínio `slop.lucaspolo.dev` está configurado em **Settings → Pages** do repositório, e o DNS (Porkbun) tem um registro `CNAME` de `slop` para `lucaspolo.github.io`.
