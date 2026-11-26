# slop

Site estático com os projetos feitos com IA ("slops") do Lucas Polo, publicado em https://slop.lucaspolo.dev/ pelo GitHub Pages. Tem três seções: a impressão 3D (geradores de peças), os jogos e as simulações.

## Stack

| Peça | O quê |
|---|---|
| Páginas | HTML e CSS puros, sem framework nem build |
| Impressão 3D | Um HTML por gerador, com CSS e JS dentro; three.js r128 e clipper-lib pelo CDN |
| Jogos e simulações | Os jogos maiores vivem no próprio repositório (Vite) e só são linkados; os de um arquivo só, e as simulações, moram aqui num HTML cada |
| Fontes | Bagel Fat One (títulos) e Rubik (texto), do Google Fonts |
| Hospedagem | GitHub Pages via GitHub Actions (`.github/workflows/pages.yml`) |
| DNS | Porkbun, `CNAME slop → lucaspolo.github.io` |

Não há `mise.toml` porque não há ferramenta para fixar. Se um dia entrar um gerador (Hugo, Vite), ele entra com `mise.toml` pinado.

## Estrutura

```
site/              # tudo o que é publicado
  index.html       # página inicial: todos os projetos, numa aba por seção (impressão 3D primeiro)
  jogos/
    index.html     # os jogos, no fundo amarelo original
    <projeto>/index.html  # jogo de um arquivo só que mora aqui (os outros apontam para o próprio GitHub Pages)
  impressao-3d/
    index.html     # a lista dos geradores
    <projeto>/index.html  # cada gerador: prévia 3D, medidas e download do STL
  simulacoes/
    index.html     # a lista das simulações
    <projeto>/index.html  # cada simulação, em three.js ou num canvas 2D (o aspirador ciclone, os schedulers e a fila do supermercado)
  style.css        # o visual escrachado: contorno preto grosso, sombra dura; serve às listas, não aos geradores
  favicon.svg
  tabs.js          # troca de aba na página inicial e lembra a aba no endereço (#impressao-3d, #jogos, #simulacoes)
  easter-egg.js    # o Milton ou a Luma surgem de uma borda sorteada a cada 6–24 s e falam num balão
  img/             # um desenho por projeto: img/<projeto>.svg
                   # e os personagens do easter egg: img/<personagem>-espiando.svg
.github/workflows/
  pages.yml        # publica site/ a cada push na main
```

## Convenções

- Projetos em ordem do mais recente para o mais antigo.
- Cada card aparece duas vezes: na aba da página inicial e na página da seção, com o mesmo HTML (título em `<h2>`). Mude os dois juntos.
- Caminhos são relativos à página: em `jogos/`, `impressao-3d/` e `simulacoes/` as imagens são `../img/...`. O `easter-egg.js` resolve os desenhos a partir do próprio endereço, então funciona em qualquer pasta.
- O link "código" só aparece quando o repositório é público; link para repositório privado dá 404 para o visitante.
- Texto em português.
- A página inicial e as de impressão 3D e simulações usam `<body class="sober">`, com fundo cinza claro; só a página dos jogos fica no amarelo. A cor da aba selecionada vem do `--tint` de cada botão.
- O visual é escrachado de propósito e tem um tema só, sem modo escuro. Os cards ficam tortos, alternando a inclinação, e cada um tem um selo estrelado (`.badge`) com uma palavra curta. O selo fica no canto superior direito; com `class="badge left"` ele vai para o esquerdo. Escolha o lado que não cobre nada importante do desenho (na Luma, a coroa do Pombo-Rei fica à direita).

### Desenho de cada card

Todo projeto tem um desenho em `site/img/<projeto>.svg` que mostra o que o projeto é: os personagens, o cenário e a ação principal. Para descobrir o que desenhar, leia o README e o `docs/` do projeto, e as referências em `docs/referencias/` quando existirem.

- `viewBox="0 0 400 260"`, com fundo preenchendo tudo.
- Estilo de desenho animado: cores chapadas, contorno `#111` de 3 px, `stroke-linejoin` e `stroke-linecap` arredondados.
- Use as cores do próprio projeto (o helicóptero do Milton é `#ff5500`, como em `heli.js`).
- `<title>` dentro do SVG e o mesmo texto no `alt` do `<img>`.
- Texto dentro do SVG usa `Arial Black, Impact, sans-serif`. ⚠️ SVG carregado por `<img>` não enxerga as fontes da página, então `Bagel Fat One` ali cai numa fonte qualquer.
- Confira o resultado renderizando, por exemplo com `google-chrome --headless=new --screenshot=out.png --window-size=800,520 file://$PWD/site/img/<projeto>.svg`. Um dos cantos de cima do desenho fica embaixo do selo, então deixe pelo menos um deles livre.

### Páginas trazidas de artefatos do Claude

Alguns projetos nasceram como artefato no claude.ai e vieram para cá como página própria (os geradores, o Porquinhos do Roli, o Guincho Porco Seguro, o Diferencial Aberto, o Teardown da Embreagem, o Dentro do Aspirador Ciclone, o Simulador de Elevadores e o Formigário 3D). Na vinda:

- Troque o cabeçalho que o claude.ai injeta por um `<head>` de verdade, com `lang="pt-BR"`, título `<nome> · slop`, descrição e favicon, e acrescente `[hidden] { display: none !important; }`, que vinha desse cabeçalho.
- Tire tudo o que usa `window.claude` (salvar no banco do artefato, `downloads`, `hot`) e os textos que mandam falar com o Claude. Progresso fica no `localStorage`; arquivo sai por link `blob:`.
- No site, o helicóptero do Milton se chama PIG-MTP, não PY2MTP. Troque nos artefatos que trouxerem o nome antigo.

### Fazenda Joli Pig

As decisões e regras do jogo (cenas, música, falas, eventos, economia, testes) ficam em `site/jogos/fazenda-joli-pig/AGENTS.md`. Leia antes de mexer no jogo.

### Joli Market

O mercadinho do Beto e do Jaca, irmão da Fazenda Joli Pig, com o mesmo motor e os mesmos desenhos. As decisões do jogo ficam em `site/jogos/joli-market/AGENTS.md`.

### Visualizador de modelos da Fazenda Joli Pig

Os desenhos ficam dentro do script do jogo, então o visualizador é um modo da própria página: `jogos/fazenda-joli-pig/?modelos`, e `jogos/fazenda-joli-pig/modelos/` só encaminha para lá. Nesse modo o jogo não carrega nem grava o save. Modelo novo entra em `catalogoModelos`; o que estiver em `VI` e não for usado no catálogo aparece sozinho no grupo Ícones.

### Fila do Supermercado

O motor da simulação fica entre `// ===== MOTOR INÍCIO =====` e `// ===== MOTOR FIM =====` e não toca no DOM: dá para carregar esse trecho no node e rodar horas simuladas contra a teoria (M/M/1, M/M/c pelo Erlang C, M/D/1 e a lei de Little). Os números citados no texto dos capítulos saíram dessas contas; mudou o motor ou um cenário, confira de novo.

### Casa ao Sol

Editor de planta com sol, sombras, medidores de luz e mapa de luz. O motor fica no `<script id="sim-src">` (o objeto `CasaSim`) e não toca no DOM nem no three.js, então dá para carregar esse trecho no node e testar. Ele cuida de:

- posição do sol, com as fórmulas do SunCalc (azimute convertido para a partir do norte), nascer, pôr e trajetória do dia;
- normalização da planta: pontas fundidas num nó, paredes partidas nos cruzamentos e nos T, duplicadas removidas, trechos alinhados emendados e aberturas presas dentro das suas paredes;
- áreas como faces do grafo das paredes e das divisas; um grupo de paredes solto dentro de uma área (um pátio) vira furo nela;
- encaixe do cursor (`encaixar`), que com `faces: true` atrai para as faces das paredes em vez do eixo, e os cantos dessas faces (`cantosDasFaces`), que é o que a régua usa;
- peças das paredes em volta das aberturas e contorno da cobertura, pelo clipper-lib, que entra como parâmetro;
- luz natural num ponto, em lux (seção "Luz natural" do motor, a partir de `cenaLuz`);
- o que sai dessa luz: a série do dia (`luzDoDia`, `resumoDoDia`), as horas de sol direto num ponto ou num vidro (`horasDeSol`), a vista do céu de um ponto (`vistaDoCeu`) e os pontos do mapa de luz (`gradeDoComodo`, `prepararPonto`, `lerPonto`).

Regras da página:

- O modelo salvo (no `localStorage` e no JSON exportado) guarda paredes, aberturas, árvores, cobertura, local, os medidores de luz (`medidores`: posição, altura do sensor, nome e a meta em lux, 0 quando não tem), as réguas (`reguas`: as duas pontas) e as âncoras das áreas (`comodos`: um ponto, o nome, `coberto`, `externo` e o acabamento do piso e do teto). As áreas são recalculadas a cada mudança, e a âncora dá nome, tipo e acabamento à área que contém o ponto.
- Uma parede com `tipo: 'divisa'` é uma linha que fecha uma área sem ser parede (a boca de um corredor, a frente de uma varanda, dois ambientes de um salão). Mora em `paredes` para os nós, os cruzamentos e as áreas saírem da mesma conta, mas não tem corpo: não barra luz, não aceita abertura e no 3D é só uma faixa no chão. Código novo que trate parede como coisa sólida tem de pular as divisas (`ehDivisa`).
- A área tem três tipos, tirados de `coberto` e `externo`: cômodo fechado (coberto), área coberta e aberta como uma varanda (coberto e externo) e área descoberta como um quintal (sem coberto). Muro é parede com outra altura.
- Área sem âncora nasce cômodo fechado, a não ser que uma divisa a deixe aberta para fora de todas as áreas ou para uma área que não é cômodo fechado; aí nasce descoberta. `aplicar` chama `fixarAreas`, que dá a toda área nova uma âncora com o tipo de nascença. ⚠️ Sem isso o tipo era recalculado sempre, e marcar o corredor como coberto punha cobertura no quintal vizinho.
- As réguas são desenhadas num SVG por cima da cena (`#reguas`), não no three.js, para o traço ter sempre o mesmo tamanho na tela e nada da casa o esconder. A régua é escolhida pelo rótulo; pelo traço ela só ganha do piso de uma área e da copa de uma árvore, para uma régua encostada numa parede não impedir de escolher a parede.
- Toda mudança passa por `aplicar`, que normaliza, recalcula, reconstrói a cena e guarda o passo para desfazer.
- A planta fica no plano (x, z), com z crescendo para baixo na tela. `local.norte` diz para onde aponta o norte, em graus no sentido horário a partir do alto da planta.
- "Ver por dentro" troca o material da cobertura por um que não escreve cor nem profundidade: ela some da imagem, mas continua no mapa de sombras.
- Só cômodo fechado conta como lado de dentro: a aba (brise) de uma janela vai para o lado que não é cômodo fechado, seja a rua, um quintal ou uma varanda.
- Os valores térmicos dos materiais (U, capacidade térmica, fator solar do vidro e absortância das cores) são típicos e aproximados. Estão guardados para as próximas etapas: calor ao longo do dia e ventilação. A luz já usa a absortância (a parede devolve `1 - abs` da luz) e a transmissão do vidro (`tv`).

Medidores de luz (a leitura é a iluminância na horizontal, na altura do sensor):

- A leitura soma três partes: o sol direto, o céu que o ponto enxerga (de frente ou pelos vidros) e a luz refletida dentro do cômodo coberto.
- Quanta luz há no céu vem do modelo da IES (RP-21); como ela se espalha, do céu geral da CIE (tipos 12, 7 e 1 para limpo, parcial e encoberto). A condição do céu fica na barra de baixo, junto da data e da hora, e é guardada com elas, fora do modelo.
- `tracar` segue um raio contra as paredes (com o rebaixo do vão, o caixilho e o montante), a laje, as abas e as árvores. Porta comum conta fechada; cada vidro desconta a sua transmissão, que cai com a inclinação do raio.
- A luz refletida é uma estimativa pelo método do fluxo dividido: o que entra pelos vidros, depois do primeiro rebate, espalhado por igual no cômodo. Por isso ela é a mesma em todos os pontos de um cômodo. Ao ar livre, numa área descoberta ou numa casa sem cobertura ela é zero. O piso e o teto de cada cômodo têm acabamento próprio (`PISOS`, `TETOS`); sem escolha valem 30% e 70%.
- A conta da luz refletida é por zona (`prepararZona`): áreas cobertas ligadas por divisas são uma zona só, então dividir um salão com uma divisa não muda a luz. A luz entra na zona pelos vidros, pelas divisas que dão para fora dela e pela fresta em cima de uma parede mais baixa que a laje; esses vãos abertos contam como superfície que não devolve nada.
- ⚠️ O sol direto só entra na luz refletida pelos vidros, não pelos vãos abertos. Espalhar por igual o sol que entra pela ponta de um corredor coberto fazia o corredor ler mais luz coberto do que descoberto (3.650 contra 2.660 lx no meio de um corredor de 10 m). O medidor que está no sol continua lendo o sol direto.
- O desenho e a conta de luz usam as mesmas formas: `cobertura`, `caixaAba`, `formaArvore`, `CAIXILHO` e `profCaixilho` saem do motor. Mudou uma medida dessas, mude lá, para a sombra desenhada e a leitura continuarem batendo.
- `prepararLuz` guarda o que só muda com a casa (o céu que cada medidor enxerga) e `lerLuz` aplica o céu do instante: animar o dia só refaz a segunda parte.
- ⚠️ Ao mexer no motor de luz, confira de novo no node: um medidor ao ar livre tem de ler a luz de fora (`ceu.horizontal`); o céu visto pelos vidros tem de ficar a menos de 2% de uma soma de força bruta com `tracar` sobre `hemisferio(400000)`; a refletida de uma sala 4 × 4 × 2,8 m branca com uma janela de 1,2 × 1,2 m, com céu encoberto, dá perto de 1% da luz de fora, como na fórmula do BRE; e um medidor rente ao piso só lê sol direto dentro da mancha de sol que o three.js desenha.

O que vem das leituras (o painel do medidor, o mapa e a planilha):

- O painel do medidor mostra o dia inteiro: gráfico em escala logarítmica (o sol direto dá cem vezes a luz de dentro), tempo na meta ou acima (sem meta, acima de 300 lx), sol direto por estação e a vista do céu. O que é do dia inteiro é refeito por `campos.dia()` quando `luz.diaSujo` acende (mudou a data, o céu ou a casa); o que marca o instante, por `campos.hora()`. Painel novo que mostre algo do dia registra as suas funções em `campos`.
- O mapa de luz (`est.mapa`, guardado fora do modelo) pinta o piso de cada cômodo com a luz a 0,75 m, numa grade de 25 cm (50 cm acima de 110 m²). Cada ponto usa a mesma conta de um medidor, então o mapa e um medidor no mesmo lugar dão o mesmo número, e a preparação anda aos poucos, 12 ms por quadro (`avancarMapa`), um cômodo de cada vez. Para animar o dia sem refazer tudo, o céu de cada ponto fica guardado em 432 pedaços e a hora só muda a luminância deles.
- A textura do mapa guarda `log10` dos lux e o sombreador consulta a rampa de cores: as sete faixas têm borda nítida mesmo com o valor interpolado. A rampa (`LUX_CORES`) é de um matiz só, do escuro ao claro, com passos iguais de claridade; ao trocar uma cor, confira de novo a ordem e os passos.
- O sinal da meta nunca vai só na cor: verde vem com ✓ e vermelho com ↓.
- "Sol direto no vidro" conta o tempo em que o sol pega pelo menos um quarto do vidro. Contar qualquer réstia fazia o número pular de 2h40 para 5h20 entre os dois equinócios, que têm o mesmo sol.
- ⚠️ Ao mexer nisso, confira de novo: o mapa contra a leitura de um medidor no mesmo ponto (os pedaços do céu erram menos de 3%), as horas de sol de um ponto ao ar livre contra a duração do dia, e a janela voltada para o equador com muito sol no inverno e nenhum no verão.
- ⚠️ Ao mexer nas áreas, confira de novo: a casa de exemplo tem de dar as mesmas leituras (2.025, 2.472 e 936 lx em 21/06 às 10h, céu limpo); um salão dividido por uma divisa tem de dar a mesma luz do salão inteiro; uma área coberta tem de ler menos que a mesma área descoberta; e uma régua de face a face numa sala de 4 m pelo eixo, com paredes de 15 cm, tem de dar 3,85 m.

### Geradores de impressão 3D

- Cada gerador é uma página inteira e independente, com visual próprio e modo escuro; não usa `style.css`.
- O STL é montado no navegador e baixado por um link `blob:` (função `save`). Não há servidor nem chamada externa além dos scripts do CDN.
- Quando há mais de um arquivo (o cesto gera um STL por tipo de peça e um LEIA-ME), eles vão num `.zip` sem compressão, montado por `zipFiles`.
- O trecho entre `// GEOMETRY START` e `// GEOMETRY END` só depende de parâmetros e devolve triângulos; mantenha a interface fora dele.

## Armadilhas

- ⚠️ O domínio customizado é configurado no repositório (**Settings → Pages**), não por arquivo `CNAME`. Com publicação via Actions, o GitHub ignora o `CNAME` do artefato; adicionar um não muda nada e só confunde quem lê.
- ⚠️ Não teste o easter egg com `google-chrome --headless --virtual-time-budget`: o relógio virtual não avança as animações do `easter-egg.js`, então o balão não aparece. Também não role a página nesse modo, porque a captura põe os elementos fixos fora do lugar. Teste num navegador de verdade: sirva `site/` (`python3 -m http.server`) e chame `appear()` no console para o personagem surgir na hora.
- ⚠️ A Fazenda Joli Pig é um PWA, com service worker: o passo "Marcar a versão da Fazenda Joli Pig" do `pages.yml` troca o marcador `__VERSAO__` do jogo e do `sw.js` pelo resumo dos arquivos do jogo. Sem ele, o celular não percebe versão nova. Detalhes no `AGENTS.md` do jogo.
- ⚠️ Só o conteúdo de `site/` vai para o ar. Arquivo fora dessa pasta não é publicado, então não adianta referenciá-lo do HTML.
