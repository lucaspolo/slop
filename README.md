# slop

Página com os projetos que fiz com IA, publicada em https://slop.lucaspolo.dev/.

É HTML e CSS puros, sem build. Para ver localmente, sirva a pasta `site/` e abra http://localhost:8000/:

```sh
python3 -m http.server -d site
```

Abrir o `index.html` direto pelo `file://` não serve, porque os links para `jogos/` e `impressao-3d/` apontam para pastas.

## Páginas

| Página | O quê |
|---|---|
| `/` | Todos os projetos, em abas: impressão 3D e jogos |
| `/jogos/` | Os jogos, no visual amarelo original |
| `/impressao-3d/` | Os geradores de peças para impressão 3D |
| `/impressao-3d/<projeto>/` | Cada gerador: ajusta as medidas e baixa o STL no navegador |

## Adicionar um projeto

Copie um bloco `<article class="project">` e coloque o projeto novo no topo da lista em dois lugares: no painel da aba certa em `site/index.html` e na página da seção, `site/jogos/index.html` ou `site/impressao-3d/index.html`. Ajuste título, descrição, selo, tags e links. O link para o código só entra quando o repositório é público.

Um gerador novo mora em `site/impressao-3d/<projeto>/index.html`, com tudo dentro do próprio arquivo.

Cada card tem um desenho em `site/img/<projeto>.svg`. As regras de estilo estão no `AGENTS.md`.

## Publicação

Cada push na `main` roda `.github/workflows/pages.yml`, que publica a pasta `site/` no GitHub Pages.

O domínio `slop.lucaspolo.dev` está configurado em **Settings → Pages** do repositório, e o DNS (Porkbun) tem um registro `CNAME` de `slop` para `lucaspolo.github.io`.
