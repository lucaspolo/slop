# Fazenda Joli Pig

Jogo de fazenda em voxels, num arquivo só (`index.html`, three.js r128 pelo CDN). O Ed, porquinho fazendeiro, planta, cuida dos bichos e vende para a família. Publicado em https://slop.lucaspolo.dev/jogos/fazenda-joli-pig/. As regras gerais do site estão no `AGENTS.md` da raiz; aqui ficam as decisões deste jogo.

⚠️ Este arquivo fica dentro de `site/`, então também é publicado. Não escreva nada que não possa ficar público.

## Texto

- Tudo em português do Brasil, num tom carinhoso e bem-humorado de desenho animado.
- Nunca use travessão nem meia-risca (os traços longos), nem no jogo, nem nos comentários, nem nos commits. Use vírgula, dois-pontos ou ponto.
- O helicóptero do Milton se chama PIG-MTP.
- Fala em balão dura o tempo de `tempoDeLeitura(texto)`, para dar tempo de ler. Não use duração fixa curta para frase longa.

## Personagens

| Quem | Como é |
|---|---|
| Ed | Protagonista. Pelúcia de porquinho creme, macacão amarelo com bolso de P rosa. Fala "Oinc!" e "Aoooa!" |
| Beto | Irmão do Ed, dono do Joli Market. Macacão azul. Chama o Ed de "maninho" |
| Jaca | Jacaré filhote, melhor amigo e sócio do Beto. Simpático, cuidadoso no volante, às vezes vem no lugar do Beto |
| Pelúcio | Irmão, dono da Joli Coffee. Compra café seco. Chama o Ed de "irmão" |
| Patrinho | Irmão, chef do Joli Bistrô. Compra trufas, anda de lambreta. Chama o Ed de "irmãozinho" |
| Hud (Hudson) | Irmão caçula, metade do tamanho do Ed. Ajudante em troca de mesada |
| Milton | Irmão, metade do tamanho do Pelúcio. Pilota o PIG-MTP. Bordão: "Milton na área!" |
| Minhoquinhas | Sócias do Ed. Moram na composteira e fazem adubo |
| Lúcia | Nano arteira, dona do Nano Hostel. Cabelo preto com chiquinhas, vestido amarelo até o joelho. Chama o Ed de "tomada" e paga aluguel |
| Luma | Irmã chihuahua, meiga e brincalhona. Sai pela portinha da casa, brinca com a bolinha roxa e às vezes morde o rabicó do Ed |

## Cenas (cinematics)

- Toda cena entra em `CENAS` e em `ORDEM_CENAS`, e aparece na janela **Cenas** para rever. Rever não muda nada no save. Se a cena mexe no save, a reprise usa um dublê, como a vaca de mentira da abdução.
- Pular a cena tem o mesmo efeito que assistir até o fim. Por exemplo, a vaca abduzida vai embora mesmo se a cena for pulada.
- Toda cena tem uma música própria, no tema dela (veja abaixo).
- Eventos que não são cena, mas o jogador gosta de ver, ganham um cartão na janela Cenas com um botão para chamar na hora: "Chamar a Luma", "Chamar o disco", "Chamar o redemoinho", "Chamar visitantes".
- Uma cena só começa sem janela aberta, com o Ed parado e sem tarefa. Cenas que se repetem usam `repete: true`.
- Na câmera isométrica, um objeto largo e baixo em cima de alguém esconde quem está embaixo. Confira o enquadramento renderizando, e gire a câmera na cena quando precisar, como na cena da mata.

| Cena | Quando |
|---|---|
| A fazenda é sua | começo do jogo |
| Milton na área | depois da primeira venda |
| O sócio do Beto | numa visita do Joli Market |
| O ajudante caçula | nível 9 |
| O nariz do Patrinho | nível 10 |
| A dona do hostel | nível 12 |
| Café com o Pelúcio | nível 15 |
| Sócias da terra | nível 16 |
| Amigos da mata | nível 20 |
| Festa na fazenda | nível 25 |
| Hora de nanar | toda noite, na metade da noite (com o Hud se ele estiver ajudando, senão com a Luma) |
| Férias no espaço | às vezes, quando o disco voador passa e tem vaca no curral; sempre disponível na janela Cenas |
| Um cafezinho | de vez em quando a partir do nível 3, ou pela opção "Tomar um lanchinho" da casa |

## Música

- Cada cena tem um tema em `TEMAS`, tocado pelo objeto `Musica`. A cena declara `musica: '<tema>'`. Momentos especiais tocam uma vinheta curta de `VINHETAS`, ou trocam de tema no meio, como a mata, que vira batucada quando os bichos chegam. A hora de nanar toca uma canção de ninar (`ninar`) e, de manhã, a vinheta `bomdia` depois do canto da galinha (`Som.galo`).
- As melodias são originais, em estilo midi (osciladores). Não reproduza música de terceiros, nem "uma versão" dela.
- Cada tema tem `ganho` para ficar com o mesmo volume médio dos outros, abaixo dos efeitos sonoros. Ao criar um tema, meça o volume e ajuste.
- A música baixa com a caixa de fala aberta, some aos poucos ao terminar ou pular e respeita o botão de som dos Ajustes.

## Falas que se repetem

- Toda situação que se repete (visitas, cafezinho, Ed tocado, saudação na estrada, Saci, disco, trufa...) tem uma lista com as falas originais primeiro e pelo menos mais 10 variações no mesmo tom e intenção.
- Sorteie com `variar(lista)`, que não repete a última fala da mesma lista. Para listas montadas na hora, passe uma chave fixa: `variar(D.conversa(of), D.conversa)`.
- Fala que o Lucas ditou fica na lista, como "AOOOA! Um etzinho!" e "Eita, a vaquinha foi passar férias no espaço!" e "Já está noite, hora de ir nanar!" (que é sempre a fala da primeira noite).

## Dia, tarde e noite

- O jogo tem um relógio próprio, `S.relogio`, de 0 a 1, que dá uma volta a cada 30 minutos de jogo aberto e fica no save. Ele não anda com o jogo fechado. `S.dia` conta as voltas.
- O relógio não anda igual o tempo todo: a tarde anda a 2/3 (`NANAR.tarde`), e o resto da noite passa acelerado no sono. Fica dia 12 min, tarde 13,5 min e noite 4,5 min até a hora de nanar.
- Períodos em `PERIODOS`: dia de 0 a 0,4 (com o amanhecer no começo), tarde de 0,4 a 0,7 (com o pôr do sol no fim) e noite de 0,7 a 1. Use `periodo()` para saber em qual está, inclusive para os eventos de cada período.
- A luz segue os quadros-chave de `LUZ_CICLO`: força e cor do sol e do céu, degradê do fundo (no dia, o céu da estação) e o quanto as luzes da noite acendem. A chuva só escurece a partir dessa luz.
- À noite acendem as janelas da casa e do Nano Hostel, as lâmpadas dos postes (com halo) e aparecem estrelas no fundo. Brilho novo de janela ou lâmpada usa `brilhoDe(vox, escala, opções, [cores])`, que monta só os voxels daquela cor com o material `MAT_LUZ`.
- As luzes de verdade da noite são sempre 4 (`LUZES_NOITE`), postas nos postes mais perto da câmera e na porta de casa. Não crie luz nova por objeto: mudar a quantidade de luzes faz o three.js recompilar os materiais.
- A saudação na estrada segue o período do jogo, não a hora do aparelho.
- Hora de nanar (`NANAR`): na metade da noite (0,85) o Ed termina a tarefa que está fazendo, a fila fica guardada (`segurarFila`) e começa a cena. O Ed vai até a frente da casa com o Hud (se ele estiver ajudando) ou com a Luma, que sai pela portinha. Na última fala da noite aparecem os botões "Ir nanar" e "Só mais um pouquinho".
  - Ir nanar: entram em casa, as janelas apagam uma por uma (`JANELAS_CASA`, uma malha por janela), saem Zzz e a noite corre em 12 s até o amanhecer (0,03). A galinha canta e eles saem para o bom dia. O Ed acorda descansado (`S.descansado`): anda e trabalha 20% mais rápido até a tarde. A mesada do Hud, os pedidos e a maçã não contam o tempo do sono (`pausarRelogios`).
  - Só mais um pouquinho: o Ed fica com sono (`S.sonolento`) até dormir: 15% mais lento e bocejando. Ele vai dormir sozinho, sem escolha, quando fica 6 s parado sem nada para fazer ou perto do fim da noite (0,97), e não acorda descansado.
  - Pular a cena vale como dormir. Rever na janela Cenas não muda relógio, dia nem descanso.
  - Durante o sono, por ser cena, não chegam visitas e os prazos da mata não correm. A cena só começa 20 s depois de abrir o jogo.
- O chip da hora mostra o período, uma barra que enche conforme ele passa e quanto falta para o próximo (em minutos, e em segundos no último minuto). À noite a conta vai até a hora de nanar, e no sono aparece Zzz.
- Poste aceso não faz sombra da lua (`castShadow` desliga com a noite acima de 0,5): a sombra da cabeça caía dentro da luz do próprio poste.
- O varal de luzes (`VARAL`, nível 8) é uma compra única da loja, na aba Enfeites, e fica em `S.varalLuzes`. Ele não se coloca por ladrilho: os mourões ficam em lugares fixos na beira dos caminhos (`VARAL.linhas`: a rua de terra e o caminho até a porteira). O modelo tem o dobro da resolução (`RES_VARAL`, 32 voxels por ladrilho) para o mourão e o fio ficarem finos. À noite as lâmpadas acendem (`MAT_LUZ_COR`, que mantém a cor de cada voxel) e os halos são uma malha de pontos só. A luz que ele espalha não usa as `LUZES_NOITE`: vem de um mapa de luz (`MAPA_LUZ`, uma textura vista de cima) que o `MAT` lê no shader (`onBeforeCompile`), então chão, construções, bichos e enfeites por perto ficam iluminados, mais fraco no alto e embaixo das coisas. Objeto que não usa o `MAT` não recebe essa luz. Caminho novo que deva ficar iluminado entra em `VARAL.linhas`. O varal só fica de pé à noite, para não atrapalhar o jogador: ele brota do chão no fim da tarde (0,63 a 0,7) e se recolhe no fim da noite (0,97 a 1), antes de o Ed acordar; de dia fica escondido. A altura segue o relógio, não `LUZ.noite`, que ainda tem um restinho de noite quando o Ed acorda.
- O mapa de luz (`montarMapaLuz`) junta as fontes da pista (`fontesPista`, sempre) e do varal (`fontesVaral`, depois da compra), cada uma com cor, raio e peso. Ele cobre a fazenda e a pista (de `Z_PISTA` até `H`). Luz fixa nova entra como mais uma lista de fontes.
- A pista de pouso tem balizas baixinhas nas duas beiradas e uma fileira verde numa cabeceira e vermelha na outra (`LUZES_PISTA`), que acendem à noite.
- Os veículos da estrada (trânsito e visitas) andam de farol aceso à noite: `acenderFarois(malha, opções)` põe as lanternas da frente e de trás e um facho no chão à frente (`MAT_FACHO`). A frente do veículo é o +x da malha, o sentido em que ele anda na estrada.

## Mata: guardião e trilha ecológica

- Com uma parcela comprada, a mata tem problemas para o Ed resolver (`OCORRENCIAS`): fogo e lixo com prazo, e galho caído, que não tem prazo mas fecha a trilha da parcela e da de trás até ser tirado. Um problema por vez, só com o jogo aberto; o prazo não corre durante cenas.
- A saúde da mata (`S.saudeMata`, 0 a 100, começa em 80) fica no save. Resolver sobe, esquecer derruba, e sem problemas ela volta sozinha devagar até 70. `estadoMata()` diz o efeito: exuberante (80+) dá uma unidade a mais por colheita, faz os bichos aparecerem mais e aumenta a contribuição da trilha; maltratada (abaixo de 45) faz o contrário.
- O mirante (nível 21, depois da primeira parcela) fica na orla, à esquerda da trilha, com a escada virada para o lado que a câmera de sempre enxerga. De dia e de tarde chegam grupos de visitantes que sobem, fazem a trilha e pagam na caixinha. Os visitantes não ficam no save; só o total (`S.visitasTrilha`).
- À noite, andando pela mata (z a partir de `Z_MATA - 1`), o Ed e o Hud acendem uma lanterna na mão esquerda (`LANTERNAS`): o modelo (`vLanterna`), uma luz de verdade para cada um, criada junto com as luzes da noite para a quantidade de luzes não mudar, e um facho no chão à frente. Ela acende e apaga aos poucos ao entrar e sair da mata e fica guardada de dia.
- Os nanos ganham um mirante do tamanho deles atrás do celeiro, ao lado do banco, na mesma escala relativa (calculada pela altura dos modelos).

## Eventos e save

- Eventos de enfeite (Luma, disco voador, bichos da mata, nanos do Nano Hostel, visitantes da trilha) não mexem no save. Os tempos ficam só na memória e recomeçam ao abrir o jogo.
- Eles não começam com cena ou janela aberta, e somem quando uma cena começa.
- A abdução é a exceção: ela tira uma vaca do save, e o jogador compra outra.
- Saves antigos precisam continuar abrindo. Flag nova de cena começa indefinida e a cena aparece na próxima vez que o jogador abrir o jogo.

## Modelos

- Modelo novo entra primeiro no visualizador (`?modelos`, em `catalogoModelos`) para o Lucas ver. Ele só vai para o jogo quando ele pedir.
- `Vox.set` só aceita coordenadas inteiras: arredonde antes.
- O Nano Hostel fica atrás do celeiro, encostado na parede de trás (z 0,625). Ele só pode aparecer quando o mapa é girado, nunca na câmera de sempre.
- Os créditos (Ajustes, Créditos) têm os retratos em voxel da Carolina Torrigo e do Lucas Polo, feitos a partir de fotos.

## Controles

- Depois de uma ação num canteiro ou bicho (plantar, arar, regar, tirar o mato, colher, alimentar), a barra amarela liga a ação repetida por 20 s: tocar em outro repete. Arrastar com ela ligada aplica a ação em cada canteiro ou bicho por onde o dedo passa (`pintarAte`); sem ela, arrastar move a câmera. Dois dedos dão zoom e também movem a câmera.
- Plantando, a barra tem "Plantar nos N vazios · R$ X" (`plantarTodosVazios`): enche os canteiros arados e livres dos terrenos do Ed com a mesma semente, usando primeiro as da bolsa, os mais perto primeiro e até o limite de 40 tarefas na fila (`LIMITE_FILA`).

## Economia

- Ração: pacotes de 5, 20 e 50 desde o começo, e de 200, 500 e 1000 nos níveis 8, 12 e 16, com desconto crescente até 40%. A compra confere o pacote e o nível na lista `PACOTES_RACAO`, não no botão.
- Aluguel do Nano Hostel: depois da cena da Lúcia, a cada 20 a 35 minutos de jogo aberto ela sai do hostel e deixa um envelope de R$ 300 na porta da casa. O relógio fica em `S.aluguelEspera` e o envelope em `S.aluguel`; o Ed pega tocando no envelope.
- Ração e adubo ficam num chip só (`#chipEstoque`), cada um no seu pedaço; o adubo só aparece quando há algum. Os botões da câmera também ficam em pares: girar num botão dividido ao meio e zoom em outro.
- O contador de ração fica amarelo quando o estoque dá para menos de 10 minutos e vermelho quando não dá para alimentar nem um bicho. Tocar nele abre a loja na ração.

## Produtos da mata

- Os produtos da mata têm destino além do mercado. Receitas novas: polpa de açaí, doce de cupuaçu e paçoca de castanha (cozinha), guaraná em pó (torrador) e bolo de chocolate (padaria, que precisa da chocolateria). Duas construções novas: a chocolateria (nível 21) e a oficina de borracha (nível 23), numa clareira no canto do terreno abandonado, do outro lado da estrada, de frente para ela, cada uma com uma passagem na cerca. A fazenda não tem mais espaço livre: o canto Nordeste é da composteira e das minhoquinhas, e o lado de baixo da rua é do pomar. Ao arrendar o canto, as construções da clareira ficam.
- Receita pode ter `nivel` (quando libera) e `precisa` (construção que tem que existir); `travaReceita(rid)` diz o motivo. No menu, ela aparece apagada a partir de dois níveis antes.
- Produto processado da mata tem `requer`: as nativas que precisam estar compradas para ele entrar em pedidos.
- Quem compra para o próprio negócio paga 25% a mais (`COMPRA_DA_MATA`, `BONUS_COMPRADOR`): Pelúcio (cacau e chocolate, e às vezes pede no pedido dele), Patrinho (castanha e chocolate com castanha), Lúcia (doce de cupuaçu e polpa de açaí, que ela leva e paga junto com o aluguel) e Milton (guaraná em pó; levando, ele traz o dobro do presente).
- A primeira bola de borracha fica com a Luma (`S.bolaLuma`: às vezes ela sai com a bolinha laranja) e o primeiro par de botas com o Ed (`S.galochas`: anda 15% mais rápido na chuva).

## Testes e publicação

- Teste localmente antes de publicar: sirva `site/` (`python3 -m http.server`) e rode o jogo num navegador sem tela (puppeteer), carregando o three.js local. Pela janela `window.__fazenda` dá para forçar cenas e eventos.
- Confira o visual renderizando e olhando as capturas, não só os números.
- Depois de verificado, faça commit e push direto na `main`; o GitHub Pages publica sozinho. O cache das páginas dura até 10 minutos, e um `?v=<commit>` no endereço mostra a versão nova na hora.
