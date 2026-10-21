# slop

Página estática que lista os projetos feitos com IA ("slops") do Lucas Polo, publicada em https://slop.lucaspolo.dev/ pelo GitHub Pages.

## Stack

| Peça | O quê |
|---|---|
| Página | HTML e CSS puros, sem framework nem build |
| Hospedagem | GitHub Pages via GitHub Actions (`.github/workflows/pages.yml`) |
| DNS | Porkbun, `CNAME slop → lucaspolo.github.io` |

Não há `mise.toml` porque não há ferramenta para fixar. Se um dia entrar um gerador (Hugo, Vite), ele entra com `mise.toml` pinado.

## Estrutura

```
site/              # tudo o que é publicado
  index.html       # a lista de projetos, um <article class="project"> por projeto
  style.css        # tema claro e escuro via prefers-color-scheme
  favicon.svg
.github/workflows/
  pages.yml        # publica site/ a cada push na main
```

## Convenções

- Projetos em ordem do mais recente para o mais antigo.
- O link "código" só aparece quando o repositório é público; link para repositório privado dá 404 para o visitante.
- Texto em português.

## Armadilhas

- ⚠️ O domínio customizado é configurado no repositório (**Settings → Pages**), não por arquivo `CNAME`. Com publicação via Actions, o GitHub ignora o `CNAME` do artefato; adicionar um não muda nada e só confunde quem lê.
- ⚠️ Só o conteúdo de `site/` vai para o ar. Arquivo fora dessa pasta não é publicado, então não adianta referenciá-lo do HTML.
