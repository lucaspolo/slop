# Joli Market

Jogo de mercadinho em voxels, num arquivo só (`index.html`, three.js r128 pelo CDN). O Beto, porquinho dono do Joli Market, e o Jaca, jacaré gerente e melhor amigo dele, encomendam da fazenda do Ed, repõem as prateleiras e atendem a freguesia no caixa. Publicado em https://slop.lucaspolo.dev/jogos/joli-market/. As regras gerais do site estão no `AGENTS.md` da raiz; aqui ficam as decisões deste jogo.

⚠️ Este arquivo fica dentro de `site/`, então também é publicado. Não escreva nada que não possa ficar público.

## Origem do código

- O jogo é irmão da [Fazenda Joli Pig](../fazenda-joli-pig/) e usa o mesmo motor e os mesmos desenhos: a classe `Vox`, o `vPorco` (Beto, Ed e a família), o `vJaca`, o caminhão, os ícones dos produtos (`VI`), a classe `Porco` e o visual da interface (CSS, menus, janelas, avisos e falas). Esses trechos foram copiados da fazenda; se um desenho mudar lá, copie de novo para cá.
- O que é só do mercado: os móveis (`vBanca`, `vGondola`, `vGeladeira`, `vVitrine`, `vCaixa`, `vEstante`, `vCaixote`), as paredes (`vParede`), os fregueses (`vFregues`, a partir do `vPessoaBase` da fazenda) e toda a lógica.
- O caminhão do Ed é o mesmo desenho do caminhão do Joli Market, pintado de amarelo como o macacão dele (`CAMINHAO_ED`), com "FAZENDA JOLI PIG" dos dois lados.

## Texto

- Tudo em português do Brasil, no tom carinhoso e bem-humorado da fazenda.
- Nunca use travessão nem meia-risca (os traços longos), nem no jogo, nem nos comentários, nem nos commits. Use vírgula, dois-pontos ou ponto.
- Situações que se repetem têm uma lista com pelo menos 11 falas, sorteadas com `variar(lista)`, que não repete a última. A primeira de cada lista é a original.
- Fala em balão dura o tempo de `tempoDeLeitura(texto)` quando é longa.

## Personagens

| Quem | Como é |
|---|---|
| Beto | Dono do Joli Market. Pelúcia de porquinho creme de macacão azul. É quem o jogador comanda: repõe e atende no caixa. Chama o Ed de "maninho" |
| Jaca | Jacaré filhote, gerente e melhor amigo do Beto, de lenço azul do Joli Market. Tem uma função escolhida pelo jogador: recepção (nível 1), caixa (nível 2) ou reposição (nível 4) |
| Ed | Irmão do Beto, fazendeiro. Chega no caminhão amarelo com a encomenda e leva os caixotes pelo beco até o depósito |
| Família | Pelúcio, Patrinho, Maurinho, Milton e Hud aparecem às vezes como fregueses, a partir do nível 2 (8% das vezes) |

## O mapa

- 1 ladrilho por unidade. A loja vai de x 0 a 12 e z 0 a 10; o depósito é o canto x 9..12, z 0..2, com a porta para a loja em x 10 e a porta do beco em z 1. Do lado de fora: o beco (x 13), a calçada (z 11 e 12), a rua (z 13 e 14) e grama. `tipoChao(x, z)` diz o que é cada ladrilho.
- As paredes são arestas entre ladrilhos (`PAREDE`), e os móveis ocupam ladrilhos (`OCUPADO`). Quem anda usa `caminho(de, para)`: A* em 8 direções, depois `alisar` corta os cantos quando dá para ir reto sem raspar em móvel nem atravessar parede.
- Cada lugar de móvel está em `SLOTS`, com a frente para `z`, `-z` ou `-x` (`f`). Quem usa o móvel fica em `frenteDe(slot)` e olha para `centroDe(slot)`. Os que vêm com o mercado têm `dono: true`; os outros se compram tocando na moedinha, a partir do nível do lugar.
- A câmera é isométrica e gira de 90 em 90 graus. As duas paredes que ficam entre a câmera e a loja abaixam (`atualizarParedes`), e os letreiros pintados nelas somem junto.
- Cada móvel comprado tem uma plaquinha em cima (`texPlaca`, um sprite que sempre fica de frente para a câmera) com o ícone, o nome e o preço do produto. Fica vermelha com "acabou!" quando o móvel esvazia, e pede para escolher o produto quando ele ainda não tem nenhum. A altura de cada tipo está em `ALTURA_PLACA`.
- Móvel novo precisa mostrar os produtos de frente para a câmera de sempre (de +x, +z). Por isso as vitrines olham para +z, e a geladeira é um expositor aberto em degraus, sem portas.

## O dia

O jogo anda em dias (`S.dia`: número, fase, tempo na fase e o resumo do dia). As fases, em `atualizarDia`:

| Fase | O que acontece | Relógio |
|---|---|---|
| chegada | O Beto e o Jaca chegam pela calçada, com o mercado fechado, e o pedido de amanhã vira a entrega de hoje: o Ed vem com o caminhão | 6:30 |
| preparo | Começa quando o caminhão estaciona (ou logo, sem entrega). Dois minutos para repor antes de abrir; a faixa embaixo tem "Abrir agora" | 7:00 às 8:00 |
| aberto | 20 minutos de jogo com fregueses (`DIA.aberto`) | 8:00 às 18:00 |
| fechando | Não entra mais ninguém; quem está dentro termina e sai | 18:00 |
| balanco | Janela com vendas, gastos, saldo, fregueses, estrelas, mais vendidos, o que faltou e o pedido de amanhã. "Começar o dia" escurece a tela e recomeça na chegada | 18:00 |

- A luz e o fundo acompanham a hora (`atualizarLuz`): manhã dourada, meio-dia branco, fim de tarde alaranjado.
- Uma placa sobre a porta diz ABERTO ou FECHADO. Fregueses só chegam na fase aberto.
- O jogo reabre na fase em que estava (`retomarDia`): na chegada recomeça a chegada, no fechamento vai direto ao balanço.
- O resumo do dia (`R()`) soma vendas, pedidos ao Ed, compras de móveis e melhorias, atendidos, desistências e o que faltou na prateleira.


- Encomenda: "Ligar pro Ed" abre a janela de pedido. O normal é o pedido de amanhã (`S.pedidoAmanha`, até 24 caixotes, 36 com a melhoria), pago na hora e entregue na chegada do dia seguinte; dá para mudar ou cancelar até começar o próximo dia, e o Ed devolve ou cobra a diferença. Com o mercado em funcionamento também dá para pedir urgente (`encomendar`, até 8 caixotes, 14 com a melhoria), que chega no mesmo dia com 25% de frete. O que ficar de uma entrega sem descarregar quando o dia acaba vai direto para o depósito. Os produtos aparecem agrupados pela situação (`situacao(p)`): está acabando, pouco no depósito, com estoque e sem lugar na loja, com quanto tem na loja e no depósito. Em cima, o Ed sugere um pedido (`sugestaoPedido`): para amanhã, umas três prateleiras de cada produto à venda menos o que deve sobrar de hoje; urgente, o que está acabando. O Ed cobra o mesmo preço da fazenda (`custo`, por unidade); o preço na prateleira é o dobro (`preco(p)`). O pedido fica em `S.pedido` com a hora da chegada e quantos caixotes já foram descarregados, e continua de onde parou se o jogo fechar no meio.
- Depósito: `S.estoque` guarda as unidades; as estantes mostram um caixote para cada `caixa` unidades, com o produto em cima.
- Escolher o produto de um móvel: a lista mostra primeiro o que ainda não está na loja (em verde) e diz em quantos outros móveis cada produto já está.
- Reposição: tocar num móvel com produto, que não está cheio e tem estoque, já põe a tarefa na fila do Beto (sem menu). O Beto vai à estante mais perto, pega o caixote e arruma uma unidade de cada vez. Cada móvel mostra até 6 unidades (`CAP`).
- Caixa: quem atende fica em `CAIXA.atendente`; o freguês, em `CAIXA.cliente`, e a fila sobe pelo corredor (`FILA`). Sem tarefa, o Beto vai sozinho para o caixa quando tem gente na fila. Tocar no caixa com ninguém lá chama o Beto na hora.
- Fregueses: chegam pela calçada, entram pela porta, pegam o que está na lista (`montarLista`) e vão para a fila. A paciência é de uns 60 s na fila (90 s com a musiquinha), 30% a mais até o nível 3. Quem desiste devolve as compras para o depósito.
- Começo mais calmo: até o nível 3 os fregueses chegam mais espaçados (`atualizarFregueses`), cabem `2 + nível` na loja ao mesmo tempo, e pedir algo que o mercado nem vende não tira estrela. O mercado abre com R$ 250, 3 estrelas e meia e um presente de 14 caixotes do Ed, que vai como a entrega do primeiro dia. Antes de mexer nesses números, rode a simulação (`__market.simular`) por uns 10 minutos de jogo e compare.
- Estrelas: `S.rep` vai de 0 a 100 (1 a 5 estrelas). Sobe com freguês atendido, desce quando falta produto na prateleira (mais) ou quando o mercado nem vende o que a pessoa queria (menos), e quando alguém desiste da fila. Mais estrelas, mais fregueses.
- Socorro: se o mercado fica sem nada para vender, sem estoque e sem dinheiro para um caixote, o Ed manda umas caixas por conta dele (`verificarSocorro`), para o jogo nunca travar.
- O que acontece "daqui a pouco" na lógica usa `depois(seg, fn)`, que conta o tempo de jogo, não `setTimeout`. Assim os testes podem rodar o jogo mais rápido.

## Cenas

- "Abrindo as portas" (`CENA_ABERTURA`), no começo, com o Beto e o Jaca na calçada do mercado ainda fechado, e "Presente do maninho" (`CENA_ED`), na primeira entrega, que é de graça. Pular vale como assistir: roda o que cada fala faria. A abertura pode ser revista nos Ajustes.
- A câmera vai até onde a cena acontece e volta para onde estava no fim.

## Save

- `localStorage`, chave `joliMarket.v1`. Fregueses e tarefas não ficam no save; o estoque, os móveis com o que tem em cada um, o dia, os pedidos, as melhorias e a função do Jaca, sim.
- Campo novo entra em `estadoNovo()`; `carregar()` completa os saves antigos com os valores dele.

## Testes e publicação

- Teste localmente antes de publicar: sirva `site/` e rode o jogo num navegador sem tela (puppeteer), carregando o three.js local. Pela janela `window.__market` dá para forçar fregueses, xp e dinheiro, pular cenas, acelerar o relógio (`acelerar(k)`) e rodar a lógica sem desenhar (`simular(seg)`), o que serve para ver a economia em vários minutos de jogo.
- Confira o visual renderizando e olhando as capturas, em tela larga e de celular (390 px).
- Depois de verificado, faça commit e push direto na `main`; o GitHub Pages publica sozinho.
