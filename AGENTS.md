# slop

Site estático com os projetos feitos com IA ("slops") do Lucas Polo, publicado em https://slop.lucaspolo.dev/ pelo GitHub Pages. Tem duas seções: os jogos e a impressão 3D (geradores de peças).

## Stack

| Peça | O quê |
|---|---|
| Páginas | HTML e CSS puros, sem framework nem build |
| Impressão 3D | Um HTML por gerador, com CSS e JS dentro; three.js r128 e clipper-lib pelo CDN |
| Fontes | Bagel Fat One (títulos) e Rubik (texto), do Google Fonts |
| Hospedagem | GitHub Pages via GitHub Actions (`.github/workflows/pages.yml`) |
| DNS | Porkbun, `CNAME slop → lucaspolo.github.io` |

Não há `mise.toml` porque não há ferramenta para fixar. Se um dia entrar um gerador (Hugo, Vite), ele entra com `mise.toml` pinado.

## Estrutura

```
site/              # tudo o que é publicado
  index.html       # página inicial: todos os projetos, numa aba por seção (impressão 3D primeiro)
  jogos/index.html # os jogos, no fundo amarelo original
  impressao-3d/
    index.html     # a lista dos geradores
    <projeto>/index.html  # cada gerador: prévia 3D, medidas e download do STL
  style.css        # o visual escrachado: contorno preto grosso, sombra dura; serve às listas, não aos geradores
  favicon.svg
  tabs.js          # troca de aba na página inicial e lembra a aba no endereço (#impressao-3d, #jogos)
  easter-egg.js    # o Milton ou a Luma surgem de uma borda sorteada a cada 6–24 s e falam num balão
  img/             # um desenho por projeto: img/<projeto>.svg
                   # e os personagens do easter egg: img/<personagem>-espiando.svg
.github/workflows/
  pages.yml        # publica site/ a cada push na main
```

## Convenções

- Projetos em ordem do mais recente para o mais antigo.
- Cada card aparece duas vezes: na aba da página inicial e na página da seção, com o mesmo HTML (título em `<h2>`). Mude os dois juntos.
- Caminhos são relativos à página: em `jogos/` e `impressao-3d/` as imagens são `../img/...`. O `easter-egg.js` resolve os desenhos a partir do próprio endereço, então funciona em qualquer pasta.
- O link "código" só aparece quando o repositório é público; link para repositório privado dá 404 para o visitante.
- Texto em português.
- A página inicial e a de impressão 3D usam `<body class="sober">`, com fundo cinza claro; só a página dos jogos fica no amarelo. A cor da aba selecionada vem do `--tint` de cada botão.
- O visual é escrachado de propósito e tem um tema só, sem modo escuro. Os cards ficam tortos, alternando a inclinação, e cada um tem um selo estrelado (`.badge`) com uma palavra curta. O selo fica no canto superior direito; com `class="badge left"` ele vai para o esquerdo. Escolha o lado que não cobre nada importante do desenho (na Luma, a coroa do Pombo-Rei fica à direita).

### Desenho de cada card

Todo projeto tem um desenho em `site/img/<projeto>.svg` que mostra o que o projeto é: os personagens, o cenário e a ação principal. Para descobrir o que desenhar, leia o README e o `docs/` do projeto, e as referências em `docs/referencias/` quando existirem.

- `viewBox="0 0 400 260"`, com fundo preenchendo tudo.
- Estilo de desenho animado: cores chapadas, contorno `#111` de 3 px, `stroke-linejoin` e `stroke-linecap` arredondados.
- Use as cores do próprio projeto (o helicóptero do Milton é `#ff5500`, como em `heli.js`).
- `<title>` dentro do SVG e o mesmo texto no `alt` do `<img>`.
- Texto dentro do SVG usa `Arial Black, Impact, sans-serif`. ⚠️ SVG carregado por `<img>` não enxerga as fontes da página, então `Bagel Fat One` ali cai numa fonte qualquer.
- Confira o resultado renderizando, por exemplo com `google-chrome --headless=new --screenshot=out.png --window-size=800,520 file://$PWD/site/img/<projeto>.svg`. Um dos cantos de cima do desenho fica embaixo do selo, então deixe pelo menos um deles livre.

### Geradores de impressão 3D

- Cada gerador é uma página inteira e independente, com visual próprio e modo escuro; não usa `style.css`.
- O STL é montado no navegador e baixado por um link `blob:` (função `save`). Não há servidor nem chamada externa além dos scripts do CDN.
- Quando há mais de um arquivo (o cesto gera um STL por tipo de peça e um LEIA-ME), eles vão num `.zip` sem compressão, montado por `zipFiles`.
- O trecho entre `// GEOMETRY START` e `// GEOMETRY END` só depende de parâmetros e devolve triângulos; mantenha a interface fora dele.

## Armadilhas

- ⚠️ O domínio customizado é configurado no repositório (**Settings → Pages**), não por arquivo `CNAME`. Com publicação via Actions, o GitHub ignora o `CNAME` do artefato; adicionar um não muda nada e só confunde quem lê.
- ⚠️ Não teste o easter egg com `google-chrome --headless --virtual-time-budget`: o relógio virtual não avança as animações do `easter-egg.js`, então o balão não aparece. Também não role a página nesse modo, porque a captura põe os elementos fixos fora do lugar. Teste num navegador de verdade: sirva `site/` (`python3 -m http.server`) e chame `appear()` no console para o personagem surgir na hora.
- ⚠️ Só o conteúdo de `site/` vai para o ar. Arquivo fora dessa pasta não é publicado, então não adianta referenciá-lo do HTML.
