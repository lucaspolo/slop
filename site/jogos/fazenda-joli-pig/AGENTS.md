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
| Hud (Hudson) | Irmão pequenino, metade do tamanho do Ed. Ajudante em troca de mesada. Não é o caçula: o caçula é o Dani |
| Dani (Daniel Lucio) | Irmão caçula da família, e o maior de todos: o pijama de pelúcia do Ed em verde (`COR.dani`), 1,25 vez o tamanho dele (`ESCALA_DANI`, `MODELO_DANI`). Chega no nível 30 e mora na casa com o Ed. Ajudante em troca de mesada, como o Hud |
| Milton | Irmão, metade do tamanho do Pelúcio. Pilota o PIG-MTP. Bordão: "Milton na área!" |
| Minhoquinhas | Sócias do Ed. Moram na composteira e fazem adubo |
| Lúcia | Nano arteira, dona do Nano Hostel. Cabelo preto com chiquinhas, vestido amarelo até o joelho. Chama o Ed de "tomada" e paga aluguel |
| Maurinho (Mauro Lúcio) | Irmão, arquiteto e muito inteligente. Igual ao Patrinho, com o suéter branco de ursinho marrom (`MODELO_MAURINHO`). Põe os óculos redondos só nas obras, com a prancheta na mão (`MODELO_MAURINHO_OCULOS`, `vPrancheta`). Chega no nível 31 na garupa da lambreta do Patrinho e mostra ao Ed as plantas na prancheta, ainda sem os óculos |
| Curupira | Guardião da floresta, do folclore. Desenho original (`vCurupira`): menino pequeno de pele morena, cabelo de fogo vermelho, laranja e amarelo, saiote de folhas e os pés virados para trás. Aparece no nível 28 e depois passeia de vez em quando na beira da mata |
| Luma | Irmã chihuahua, meiga e brincalhona. Sai pela portinha da casa, brinca com a bolinha roxa e às vezes morde o rabicó do Ed |

## Cenas (cinematics)

- Toda cena entra em `CENAS` e em `ORDEM_CENAS`, e aparece na janela **Cenas** para rever. Rever não muda nada no save. Se a cena mexe no save, a reprise usa um dublê, como a vaca de mentira da abdução.
- Pular a cena tem o mesmo efeito que assistir até o fim. Por exemplo, a vaca abduzida vai embora mesmo se a cena for pulada.
- Toda cena tem uma música própria, no tema dela (veja abaixo).
- Eventos que não são cena, mas o jogador gosta de ver, ganham um cartão na janela Cenas com um botão para chamar na hora: "Chamar a Luma", "Chamar o disco", "Chamar o galo fujão", "Chamar o redemoinho", "Chamar visitantes".
- Uma cena só começa sem janela aberta, com o Ed parado e sem tarefa. Cenas que se repetem usam `repete: true`.
- Na câmera isométrica, um objeto largo e baixo em cima de alguém esconde quem está embaixo. Confira o enquadramento renderizando, e gire a câmera na cena quando precisar, como na cena da mata.

| Cena | Quando |
|---|---|
| A fazenda é sua | começo do jogo |
| Milton na área | depois da primeira venda |
| O sócio do Beto | numa visita do Joli Market |
| O ajudante pequenino | nível 9 |
| O nariz do Patrinho | nível 10 |
| A dona do hostel | nível 12 |
| Café com o Pelúcio | nível 15 |
| Sócias da terra | nível 16 |
| Amigos da mata | nível 20 |
| Festa na fazenda | nível 25 |
| O guardião da mata | nível 28, depois da cena da mata: o Ed vai à beira da floresta, o Curupira surge num redemoinho de folhas, agradece o cuidado com os bichos e a mata e some deixando pegadas ao contrário. A câmera vira para a floresta (az de `MATA_CINE`), como na cena da mata |
| O caçula grandão | nível 30, uns 15 s depois de o Ed tirar a cerca do terreno novo (`cantoLimpoEm`): o Ed e o Hud acham a fazenda grande demais, o Hud chama o Dani, que chega pela estradinha de cima e combina a ajuda. Não espera o Hud: se ele está ajudando, larga o trabalho, vem de onde está, o tempo dele fica parado durante a cena e no fim só o Dani entra em casa (`daniCenaHud`, `soltarCenaDani`), como no cafezinho. Os três ficam numa fileira de lado na tela com o Ed um pouco atrás, para os três rostos aparecerem (`DANI_CENA`) |
| O arquiteto da família | nível 31: o Maurinho chega na garupa da lambreta do Patrinho e conta das reformas |
| Hora de nanar | toda noite, na metade da noite (com o Hud se ele estiver ajudando, senão com a Luma); de manhã a câmera vai ao galo, que acorda a fazenda. O Dani que estava ajudando entra em casa antes e volta pela porta depois, se a mesada ainda vale |
| Férias no espaço | às vezes, quando o disco voador passa e tem vaca no curral; sempre disponível na janela Cenas |
| Um cafezinho | de vez em quando a partir do nível 3, ou pela opção "Tomar um lanchinho" da casa. Depois da cena do Dani, ele vem sempre que está ajudando e às vezes de casa, e senta no banquinho do convidado (nesse dia não vem convidado) |

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
- Na barra de cima, a hora é um anel com o ícone do período que enche conforme ele passa, com a estação de selo e ao lado quanto falta para o próximo (em minutos, e em segundos no último minuto). À tarde e à noite o pedaço ganha a cor do período, e com chuva aparece uma gotinha. À noite a conta vai até a hora de nanar, e no sono aparece Zzz. Tocar nele abre a janela da estação.
- Poste aceso não faz sombra da lua (`castShadow` desliga com a noite acima de 0,5): a sombra da cabeça caía dentro da luz do próprio poste.
- O varal de luzes (`VARAL`, nível 8) é uma compra única da loja, na aba Enfeites, e fica em `S.varalLuzes`. Ele não se coloca por ladrilho: os mourões ficam em lugares fixos na beira dos caminhos (`VARAL.linhas`: a rua de terra e o caminho até a porteira). O modelo tem o dobro da resolução (`RES_VARAL`, 32 voxels por ladrilho) para o mourão e o fio ficarem finos. À noite as lâmpadas acendem (`MAT_LUZ_COR`, que mantém a cor de cada voxel) e os halos são uma malha de pontos só. A luz que ele espalha não usa as `LUZES_NOITE`: vem de um mapa de luz (`MAPA_LUZ`, uma textura vista de cima) que o `MAT` lê no shader (`onBeforeCompile`), então chão, construções, bichos e enfeites por perto ficam iluminados, mais fraco no alto e embaixo das coisas. Objeto que não usa o `MAT` não recebe essa luz. Caminho novo que deva ficar iluminado entra em `VARAL.linhas`. O varal só fica de pé à noite, para não atrapalhar o jogador: ele brota do chão no fim da tarde (0,63 a 0,7) e se recolhe no fim da noite (0,97 a 1), antes de o Ed acordar; de dia fica escondido. A altura segue o relógio, não `LUZ.noite`, que ainda tem um restinho de noite quando o Ed acorda.
- O varal é alto (`VARAL.alto` = 64 cubinhos de 1/32, 2,0 de altura) e o fio cai pouco (`(a1 - a0) / 12`), para o fundo das lâmpadas ficar em 1,53, acima da cabeça de qualquer personagem (o mais alto, o Ed, tem 1,25). Se aparecer personagem mais alto ou objeto que passe pelos caminhos, confira com `__fazenda.reformas.varalBaixo()` e `alturas()`.
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

- Eventos de enfeite (Luma, disco voador, galo, bichos da mata, nanos do Nano Hostel, visitantes da trilha) não mexem no save. Os tempos ficam só na memória e recomeçam ao abrir o jogo.
- Eles não começam com cena ou janela aberta, e somem quando uma cena começa.
- A abdução é a exceção: ela tira uma vaca do save, e o jogador compra outra.
- Frequência dos eventos de surpresa (em tempo de jogo aberto): o disco voador passa a cada 6 a 12 min (o primeiro entre 3 e 6 min) e, com vaca no curral, tenta a abdução em 60% das passagens (`DISCO_JOGO`); o redemoinho do Saci vem entre 4 e 9 min depois de abrir e depois a cada 8 a 16 min (`REDEMOINHO`); o cafezinho, a cada 6 a 12 min (`sorteioCafezinho`); o galo fujão, a cada 8 a 15 min (o primeiro entre 5 e 10, `GALO_JOGO`). Como são cenas, a abdução e o cafezinho só acontecem se o Ed estiver parado, sem tarefa, naquela hora.
- Saves antigos precisam continuar abrindo. Flag nova de cena começa indefinida e a cena aparece na próxima vez que o jogador abrir o jogo.

## Modelos

- Modelo novo entra primeiro no visualizador (`?modelos`, em `catalogoModelos`) para o Lucas ver. Ele só vai para o jogo quando ele pedir.
- O galo e o pintinho (`vGalo`, `vPintinho`) estão na escala da galinha. O galo é montado em partes para mexer (`vGalo('corpo' | 'cabeca' | 'asaE' | 'asaD')`, com os pivôs em `GALO_PIVO`); sem parte, vem inteiro, como no visualizador. Veja a seção Galo.
- `Vox.set` só aceita coordenadas inteiras: arredonde antes.
- A ponte do lago do canto Sul (`vPonte`) está no visualizador, no grupo Objetos.
- O Dani está em Personagens, e "Ed, Hud e Dani juntos" mostra os três no tamanho do jogo.
- O pato (`vPato`, escala da galinha, de frente para +z) está em Bichos; a casinha dos patos (`vCasaPatos`) em Construções; a rampa (`vRampaPatos`) em Objetos; o ovo de pata é ícone (`VI.ovopata`).
- O Nano Hostel fica atrás do celeiro, encostado na parede de trás (z 0,625). Ele só pode aparecer quando o mapa é girado, nunca na câmera de sempre.
- Os créditos (Ajustes, Créditos) têm os retratos em voxel da Carolina Torrigo e do Lucas Polo, feitos a partir de fotos.

## Galo

- Cada galinheiro tem um galo em cima de um mourão da cerca (`POUSO_GALO`: o mourão, para onde ele olha, o ladrilho de dentro do cercado e o de fora). O do galinheiro novo aparece quando ele é comprado. Os mourões foram escolhidos para ele não encostar no galinheiro reformado, no andaime, no coletor nem na porteira, mesmo virado (até ±0,6), e ficar acima das galinhas: os dois ficam na cerca de baixo do galinheiro, e o ladrilho de fora é a faixa de grama que separa os galinheiros dos currais. No mourão ele vira o corpo e a cabeça de vez em quando.
- Ele não vai para o save: ao abrir o jogo está no mourão, e quando uma cena começa volta para lá na hora (`galoNoMourao`).
- Estados (`G.estado`): `poleiro`, `voando` (pulo em arco batendo as asas, `voarGalo`), `chao` (com `modo` `ciume`, `fujao` ou `volta`) e `colo`. No chão ele anda pela `rota` dos ladrilhos (`galoIr`). Poses em `atualizarGalo`: `cantar` (bate as asas e estica o pescoço para trás), `alarme` (asas, pulinhos e cabeça para todo lado), `bicar` e `feliz`.
- Cocoricó: na hora de nanar, de manhã, a câmera vai ao galo do galinheiro, ele canta e, com o galinheiro novo, o outro responde com outra voz (`Som.galo(f)`); depois a câmera volta para a casa, as janelas acendem e o Ed sai. Rever a cena mostra o mesmo.
- Alarme (`galoAlarme`): uns 5 s antes do disco voador passar, da chuva começar e do teco-teco do Milton chegar (`GALO_JOGO.alarme`), com um aviso do que vem (`AVISO_ALARME`), e quando o caminhão do Beto vem (sem aviso, que a ligação já avisa). Não acontece em cena.
- Tocar no galo do mourão: ele canta e o Ed vai fazer carinho (tarefa `carinhoGalo`): para no ladrilho de dentro, encostado na cerca (`lugarDoEdNoGalo`), olha para ele, alisa as penas (pose `carinho`) e fala. Só visual, sem xp.
- Ciúme (`galoCiumento`): em 20% das vezes que o Ed recolhe um ovo, no máximo uma vez a cada minuto e meio, o galo daquele galinheiro desce para dentro do cercado, corre atrás do Ed sem sair do pasto (`pontoNoPasto`), bica o pé dele e volta para o mourão. O Ed pula, reclama e sai apressado: anda 50% mais rápido por 3 s (`ed.pressa`). Com o coletor, o Ed não recolhe ovo e o ciúme não acontece.
- Fujão (`fugirGalo`): a cada 8 a 15 min de jogo aberto (o primeiro entre 5 e 10), um galo do mourão pula para o ladrilho de fora e passeia pela grama e pelos caminhos em volta (`chaoLuma`). A Luma, se estiver em casa, sai sem a bolinha e corre latindo atrás dele (`lumaAtrasDoGalo`, ação `galo`) e para ao lado dele na tela, a `LUMA_JOGO.galo` (1,5), do lado em que já está (`ladoDoGalo`), para não ficar escondida atrás dele nem pôr o balão em cima dele; ele corre dela quando ela chega a menos de 1,65. Tocando no galo, o Ed vai buscar (`pegarGalo`); quando o Ed chega perto, ele corre uma vez e o Ed vai de novo. Pego, ele vai no colo do Ed (`ed.colo`, braços na frente) e a tarefa `soltarGalo` entra na frente da fila: o Ed para encostado na cerca, solta, ele voa para o mourão e canta, e o Ed ganha `GALO_JOGO.xpFujao`. Cancelada a tarefa, ele volta sozinho. Sem ninguém buscar, depois de 3 min ele volta sozinho.
- Pintinhos (`PINTINHO`): com galo no galinheiro (o antigo sempre tem; o novo, depois de comprado), cada ovo tem 3% de chance de chocar, se houver lugar no cercado e nenhum outro pintinho crescendo ali. Nasce um pintinho em vez do ovo (`nascerPintinho`), com `d.pinto` (quando nasceu), `d.mae` e `e: 'pinto'`. Ele anda atrás da mãe, não come nem dá ovo, conta como galinha no cercado (não na caixa do coletor) e vira galinha em 10 min pelo relógio, também com o jogo fechado (`crescerPintinho`, `trocarModelo`).
- Falas: `FALAS_GALO_CANTA`, `FALAS_GALO_ALARME`, `FALAS_GALO_CARINHO`, `FALAS_GALO_CIUME`, `FALAS_GALO_PEGOU`, `FALAS_GALO_DEVOLVEU` e `FALAS_LUMA_GALO`.
- Para testar: `__fazenda.galo` (`obj`, `cantar`, `alarme`, `fugir`, `tocar`, `forcarCiume`, `forcarPintinho`, `proxFujao`, `lugar`, `bicho`, `simular`).

## Interface

- O HUD de cima é uma barra só (`.hud-topo`): nível com a barrinha de xp, dinheiro (sem o "R$", a moeda já diz), ração, adubo (só quando há algum) e a hora com a estação. Cada pedaço é um `.seg`, separados por `.sep`, e `chipPulsa` anima o pedaço.
- No celular a barra ocupa a largura toda. Quando os números não cabem, `ajustarBarra` aperta em dois passos: `aperto1` tira as réguas e troca a barrinha de xp por um anel no selo do nível; `aperto2` diminui letras e ícones. Confira em 390, 360 e 320 px com números grandes.
- Os botões da câmera ficam num bloco 2×2 (girar em cima, zoom embaixo). No celular o bloco fica logo abaixo da barra, no canto direito; na tela larga, no meio da borda direita.

## Controles

- Depois de uma ação num canteiro ou bicho (plantar, arar, regar, tirar o mato, colher, alimentar), a barra amarela liga a ação repetida por 20 s: tocar em outro repete. Arrastar com ela ligada aplica a ação em cada canteiro ou bicho por onde o dedo passa (`pintarAte`); sem ela, arrastar move a câmera. Dois dedos dão zoom e também movem a câmera.
- Plantando, a barra tem "Plantar nos N vazios · R$ X" (`plantarTodosVazios`): enche os canteiros arados e livres dos terrenos do Ed com a mesma semente, usando primeiro as da bolsa, os mais perto primeiro e até o limite de 40 tarefas na fila (`LIMITE_FILA`).

## Reformas do Maurinho

- Depois da cena do nível 31, o menu de cada construção tem "Reformar com o Maurinho" (`itensReforma`). Cada uma tem duas reformas: a 1ª no nível 31 e a 2ª no nível 35 (`REFORMA`, `PRECO_REFORMA`). Só uma obra por vez, e a construção continua funcionando durante a obra.
- A obra dura 3 minutos na 1ª e 6 na 2ª e corre com o jogo fechado: `S.obra` guarda `{ id, n, fim }`, e a obra que terminou fora do jogo entra pronta ao abrir, com um aviso. `S.reformas` guarda o nível de cada construção.
- Pagando, o andaime sobe (`montarAndaime`) e o Maurinho de óculos e prancheta (`maurinhoObra`) entra pela porteira e dá a volta na construção: anda entre os ladrilhos encostados nos lados (`pontosObra`, de preferência do lado que a câmera vê), vira para a parede mais perto e mede com a trena, martela, lê a planta ou aponta (`OBRA_ACOES`, com as poses no `update` do `Porco`), falando de vez em quando. Tocar nele mostra quanto falta. No fim: confete, o desenho novo (`montarFabrica` ou `montarPredio`), xp, o Ed comemora e o Maurinho vai embora. Numa cena ele sai de vista e depois volta para a obra.
- As capacidades vêm de `vagasFab(id)`, `maxAnimais(tp)` e `capCercado(tp, c)`; não use `VAGAS_FAB` nem `ANIMAIS[tp].max` direto.
- Fábricas (e o terreiro) passam de 3 vagas para 4 e depois 5. O galinheiro passa de 8 galinhas para 12 e 16, e o curral de 4 vacas para 6 e 8. Casa, celeiro e poço só mudam o visual. A composteira fica de fora.
- Preços (1ª e 2ª): moinho 9 mil e 24 mil, queijaria 15 mil e 30 mil, padaria 24 mil e 48 mil, cozinha 36 mil e 72 mil, terreiro 15 mil e 36 mil, torrador 54 mil e 108 mil, chocolateria 84 mil e 168 mil, oficina 96 mil e 192 mil, galinheiro 18 mil e 45 mil, curral 24 mil e 60 mil, galinheiro dos patos 24 mil (1ª no nível 36, `NIVEL_REFORMA`), casa e celeiro 30 mil e 90 mil, poço 9 mil e 24 mil.
- A reforma é o desenho original com acréscimos (`REFORMA_1`, `vReforma(id, n)`), sem sair do lugar da construção. Durante a obra a construção ganha o andaime (`vAndaime(id)`). Os modelos estão no visualizador, no grupo "Reformas do Maurinho". A 2ª reforma ainda não tem desenho: enquanto isso `REFORMA.max` é 1.

## Mapa

- O mapa tem 52 × 51 ladrilhos (`W`, `H`), o dobro da área do primeiro (36 × 37). Ele cresceu em duas etapas: entraram colunas e linhas entre as zonas, para as construções não ficarem amontoadas, e o sul ganhou linhas a mais. A terra que sobra é para construções futuras: a fileira das fábricas tem lugar livre entre a cozinha de doces e a composteira, a floresta tem lugar para mais parcelas ao sul das quatro de hoje (z 43 a 50) e o canto Sul tem uma área grande livre abaixo das faixas de lotes.
- Constantes das zonas: `Z_CERCA` (a cerca de baixo da fazenda), `X_PORTEIRA` (a porteira, com `PARADA` meio ladrilho depois), `COL_CURVA` (a coluna em que a estrada dobra para o sul), `Z_ORLA` e `Z_MATA`. Coordenada nova de cena ou evento perto da porteira ou da mata deve vir dessas constantes, não de número solto.
- A horta fica ao lado da casa: seis terrenos de 4 × 4 (`LOTES`) com um caminho de grama entre eles. `loteDe(x, z)` procura o terreno de cada ladrilho.
- O galinheiro e o curral não dividem cerca: entre eles passa uma faixa de grama. O galinheiro e o curral novos (`CERCADOS`) ficam ao lado de cada um, do outro lado de uma passagem com o coletor e o alimentador (`COLETOR`, `ALIMENTADOR`), que atendem os dois. A cerca de baixo do curral novo é a da fazenda.
- Cada ladrilho de cerca ou porteira tem a sua malha (`CERCA_VIS`). Quando um ladrilho vira cerca ou deixa de ser (o canto Sul, um cercado novo), chame `atualizarCercas(x0, z0, x1, z1)`: ele refaz a região e os vizinhos, porque o desenho de cada mourão depende deles.
- A rota (`rota`) é um A* em 8 direções com a lista aberta num heap binário.
- O chão e os tufinhos de grama (`construirChao`, em blocos de `BLOCO_CHAO` ladrilhos) e as árvores da mata e do matagal (`instanciasMata`, em blocos de 8 × 8) são divididos em pedaços com a sua própria esfera de recorte: o que fica fora da tela não é desenhado. Quando um ladrilho muda de tipo, refaça o chão com `refazerChao`.
- Saves do mapa antigo (sem `S.mapa`) são convertidos ao abrir (`migrarMapa`): os canteiros vão para o mesmo lugar do seu terreno, e enfeites, bichos, trufas e maçã andam com a sua zona (`mapaNovoX`, `mapaNovoZ`). Depois que o mapa está montado, `conferirMapaNovo` devolve à loja o enfeite que caiu fora de um gramado livre, tira a trufa ou a maçã que não ficou ao lado de uma árvore e mostra um aviso uma vez.
- Para testar: `__fazenda.mapa` (`W`, `H`, `tipo`, `andavel`, `rota` e os dados dos lugares), `__fazenda.pessoas()`, e `__fazenda.desenho()` e `malhas()` para ver quanto a cena desenha.

## Terreno do canto Sul

- Arrendado no nível 30 (`ARRENDAMENTO`; `S.canto` é 1 depois de pagar e 2 depois que o Ed tira a cerca). A cerca tirada é a de baixo da fazenda, da passagem do coletor até o fim do mapa, menos a do curral novo, se ele já foi comprado.
- Logo depois da cerca fica um lago (`LAGO`: as colunas de água de cada linha; ladrilho `lago`, que ninguém atravessa, com a água um degrau abaixo do chão) e uma ponte de madeira (`PONTE`, `vPonte`, ladrilho `ponte`) que sai da abertura da cerca a leste do curral novo. O tabuado da ponte fica na altura do chão, para quem passa não afundar nem flutuar. O lago e a ponte existem desde o começo; antes de tirar a cerca, ninguém chega a eles.
- Atrás das fábricas da mata, depois do lago, ficam três faixas deitadas de lotes à venda, todas só com o terreno limpo: dois terrenos de canteiros (os `LOTES` com `canto: true`, com preço e nível próprios, `precoLote`), os dois terrenos de pomar (os blocos de `POMAR_BLOCOS` com `canto: true`, `blocoAberto`) e uma fileira de colmeias (as de `COLMEIA_SLOTS` a partir de `COLMEIA_CANTO`, `colmeiaAberta`). Cada colmeia ajuda só o pomar do mesmo lado da fazenda (`tempoFruta(tipo, i)`). Quem tira a cerca, ou abre um save com o terreno limpo antes dessas faixas existirem, vê um aviso uma vez (`S.avisoLotesCanto`).
- O galinheiro e o curral novos (`CERCADOS`, `S.cercados`; o dos patos é do canto e tem seção própria) não são do canto: ficam à venda no nível 30 ao lado dos primeiros, prontos na hora, sem obra: cerca, porteira para a passagem, a construção no fundo e o pasto no resto (`aplicarCercado`). As construções estão em `PREDIOS` com `lote: true` e só ganham ladrilho e desenho depois de compradas. O desenho é o dos primeiros com outras cores (`vGalinheiroNovo`, caiado e de telhado azul, com um galo dourado na cumeeira; `vCurralNovo`, de esteios brancos e telhado verde). Eles não têm reforma.
- Cada bicho mora num cercado: `d.c` é 1 no novo e fica de fora no primeiro. `capCercado(tp, c)` diz quanto cabe em cada um, `maxAnimais(tp)` é a soma e `pastoDe(tp, c)` é o pasto onde ele anda. Pela loja, o bicho vai para o primeiro cercado com lugar; pelo menu de um cercado, para aquele. Com dois cercados, cada menu conta, alimenta e coleta só os bichos dele.
- Ao abrir o jogo, o bicho que está fora do pasto do seu cercado volta para ele (`dentroDoPasto`).
- Enfeite não entra em lote à venda (`loteDeCercado`, `blocoEm`, `loteDe`). Os que já estavam lá voltam para a loja quando o lote é comprado (`devolverEnfeites`).
- As galinhas passam por baixo do galinheiro. Se o Ed vai cuidar de um bicho parado debaixo de uma construção, ele vai ao ladrilho do pasto mais perto e se encosta na beira dele (`encostar`, em `proximaTarefa`), sem entrar debaixo da construção.

## Galinheiro dos patos

- Nível 32, R$ 30.000, só com o terreno novo limpo (`CERCADOS.patos` tem `canto: true`; `cercadoAberto(id)` esconde a placa e o lote antes disso). Fica na ponta leste do lago: cerca de x 47 a 51 e z 22 a 29, porteira em cima (49, 22), a casinha no fundo (`PREDIOS` `patos`, `vCasaPatos`: no chão, caiada, telhado verde-água, porta de arco para o pasto) e o pasto no resto (ladrilho `pastoP`).
- A saída para a água é um vão na cerca do lado do lago (`saida`, ladrilho de pasto), com uma rampa de tábuas (`vRampaPatos`, `montarRampaPatos`) no ladrilho de lago ao lado (`RAMPA_PATOS`).
- Pato: R$ 450, até 6 (9 depois da reforma), 1 ração, ovo de pata em 90 s (R$ 24, 4 xp).
- Alimentador dos patos no nível 33 (R$ 5.000) e coletor de ovos de pata no 34 (R$ 9.000), em `ALIMENTADOR.pato` e `COLETOR.pato`: ficam do lado de fora da cerca de cima, dos dois lados da porteira, girados para o pasto (`ry`). Os textos de cada bicho no coletor e no alimentador ficam em `COMO_BICHO`. Sem o galinheiro, a loja mostra os dois travados com o motivo.
- Reforma do Maurinho no nível 36 (`NIVEL_REFORMA.patos`, `nivelDaReforma`; R$ 24.000): alpendre sobre a porta, floreiras, tina d'água e cata-vento de pato (`REFORMA_1.patos`); cabem 9 patos. O ovo de pata (`PRODUTOS.ovopata`, com `cercado: 'patos'`) só entra nos pedidos depois que o galinheiro existe.
- Comportamento (`Bicho.updatePato`, `PATO`): anda e bica no pasto gingando; enquanto produz, de dia e com mais de `PATO.folga` segundos até o ovo, às vezes sai pelo vão, desce a rampa e nada a leste da ponte (`pontoNaAgua`, que só aceita caminho reto por dentro d'água, `caminhoNaAgua`). Na água boia na linha d'água (`PATO.agua`), balança, mergulha de cabeça e solta ondinhas (`soltarOnda`). Volta pela rampa quando o ovo está para ficar pronto (`patoVolta` calcula o tempo do caminho), de noite ou quando o estado muda; assim ele bota no pasto, onde o Ed alcança. Pato voltando do lago não aceita tarefa (`checar`) e o menu dele diz que está voltando.
- Ao abrir o jogo, pato que estava na água volta para o pasto (`dentroDoPasto`).
- Num navegador lento (menos de 10 quadros por segundo) o tempo de jogo anda mais devagar que o relógio, e o ovo pode ficar pronto antes de ele chegar; ele só termina de voltar.

## Economia

- Ração: pacotes de 5, 20 e 50 desde o começo, e de 200, 500 e 1000 nos níveis 8, 12 e 16, com desconto crescente até 40%. A compra confere o pacote e o nível na lista `PACOTES_RACAO`, não no botão.
- Aluguel do Nano Hostel: depois da cena da Lúcia, a cada 20 a 35 minutos de jogo aberto ela sai do hostel e deixa um envelope de R$ 300 na porta da casa. O relógio fica em `S.aluguelEspera` e o envelope em `S.aluguel`; o Ed pega tocando no envelope.
- O contador de ração fica amarelo quando o estoque dá para menos de 10 minutos e vermelho quando não dá para alimentar nem um bicho. Tocar nele abre a loja na ração.

## Produtos da mata

- Os produtos da mata têm destino além do mercado. Receitas novas: polpa de açaí, doce de cupuaçu e paçoca de castanha (cozinha), guaraná em pó (torrador) e bolo de chocolate (padaria, que precisa da chocolateria). Duas construções novas: a chocolateria (nível 21) e a oficina de borracha (nível 23), numa clareira no canto do terreno abandonado, do outro lado da estrada, de frente para ela, cada uma com uma passagem na cerca. Ao arrendar o canto, as construções da clareira ficam, e o resto do terreno ganha o lago e as faixas de lotes à venda (ver Terreno do canto Sul).
- Receita pode ter `nivel` (quando libera) e `precisa` (construção que tem que existir); `travaReceita(rid)` diz o motivo. No menu, ela aparece apagada a partir de dois níveis antes.
- Produto processado da mata tem `requer`: as nativas que precisam estar compradas para ele entrar em pedidos.
- Quem compra para o próprio negócio paga 25% a mais (`COMPRA_DA_MATA`, `BONUS_COMPRADOR`): Pelúcio (cacau e chocolate, e às vezes pede no pedido dele), Patrinho (castanha e chocolate com castanha), Lúcia (doce de cupuaçu e polpa de açaí, que ela leva e paga junto com o aluguel) e Milton (guaraná em pó; levando, ele traz o dobro do presente).
- A primeira bola de borracha fica com a Luma (`S.bolaLuma`: às vezes ela sai com a bolinha laranja) e o primeiro par de botas com o Ed (`S.galochas`: anda 15% mais rápido na chuva).

## Testes e publicação

- Teste localmente antes de publicar: sirva `site/` (`python3 -m http.server`) e rode o jogo num navegador sem tela (puppeteer), carregando o three.js local. Pela janela `window.__fazenda` dá para forçar cenas e eventos.
- Confira o visual renderizando e olhando as capturas, não só os números.
- Valide o deslocamento dos personagens: sempre que alguém anda até um lugar ou fica parado nele (cena, obra, visita, tarefa), confira nas capturas que ele chega e fica olhando para o ponto de interesse. Quem fala olha para quem ouve, quem trabalha olha para o que está fazendo (o Maurinho para a obra, o Ed para o canteiro). `ir` vira o personagem para onde ele anda; ao chegar, chame `olhar(x, z)` no retorno, e numa cena use `virarNaCena` para ele ficar meio de frente para a câmera. Personagem parado de costas para o que importa, ou olhando para o nada, é erro.
- Valide colisões entre objetos: nada do desenho de uma construção ou de uma reforma abaixo de 1,1 de altura passa mais de um cubinho (1/8) do terreno dela, porque ali o Ed para na porta, o Maurinho anda na obra e o jogador põe enfeites. O andaime segue a mesma regra. Onde um desenho original avança mais (o torrador de cobre, as bolas da oficina), `ladrilhoDeBeirada` tira o ladrilho dos caminhos e dos enfeites. `__fazenda.reformas.colisoes(id, n)` lista o que cada desenho (n = nível da reforma ou 'andaime') encosta: porta, pontos da obra, envelope do aluguel, mourões do varal, mesa do cafezinho, caminho da Lúcia, ladrilhos de passagem e de enfeite; `planta(id)` mostra a vista de cima.
- Depois de verificado, faça commit e push direto na `main`; o GitHub Pages publica sozinho. O cache das páginas dura até 10 minutos, e um `?v=<commit>` no endereço mostra a versão nova na hora.

## Curupira

- Depois da cena dele (`S.viuCineCurupira`), a cada 10 a 18 min de jogo aberto (o primeiro entre 4 e 8) ele sai da floresta para a orla, anda até perto da estrada deixando pegadas ao contrário (`pegadaCurupira`, os dedinhos apontam para onde ele veio), para, vira para a câmera, fala uma das `FALAS_CURUPIRA` e volta, sumindo num redemoinho de folhas (`folhasCurupira`). Tocando nele, ele pula e fala. Com uma cena começando, ele some. Nada disso vai para o save (`CURUPIRA`, `proxCurupira`).
- A janela Cenas tem o cartão "O Curupira passeia" com o botão para chamar agora (`chamarCurupira`).
- Música: `TEMAS.curupira`, flautinha em ré dórico.

## Destino dos terrenos de canteiros

- Nível 27 (`DESTINO.niveis`): no menu de um canteiro, "Destinar este terreno" abre a lista das culturas liberadas (`escolherDestino`). O terreno destinado (`S.destinos`: terreno → cultura) passa a ser arado e plantado pelo Hud e pelo Dani quando estão ajudando (`alvosHud` põe `arar` na grama e `plantar` nos canteiros arados; o 5º item do alvo é a cultura). A semente sai da bolsa; sem ela, o ajudante compra com o dinheiro, como o Ed.
- Vagas: uma no 27 e mais uma em 29, 33, 35, 37, 39, 41 e 43 (os níveis com pouca coisa; o 31 fica de fora). Sem vaga, o item aparece apagado e o estado do menu diz quais terrenos estão usando as vagas e em que nível chega a próxima.
- O terreno destinado tem uma plaquinha numa estaca no canto de fora (`montarDestinos`, `texDestino`): cartão com o desenho da cultura e um selo verde de setas, de "sozinho". O menu do canteiro diz o destino e tem "Trocar o destino" e "Tirar o destino".

## Ajudantes: Hud e Dani

- Os dois trabalham do mesmo jeito (`AJUDA`, `atualizarAjudante`): regam, tiram o mato e colhem os canteiros, colhem o pomar, coletam na mata e pegam o mel. Nos terrenos destinados também aram e plantam (ver Destino dos terrenos de canteiros). Vão ao que está mais perto e respeitam o que está reservado pelo Ed e pelo outro (`setReserva`). Cada um tem a tarefa dele (`tarefaHud`, `tarefaDani`).
- Hud: nível 9, R$ 500 por 15 min (`HUD`, `S.hudAte`). Dani: depois da cena dele, R$ 1.500 por 15 min (`DANI`, `S.daniAte`), com passo mais largo (`DANI.vel`) e trabalho no ritmo do Ed (o Hud leva 1,2 vez o tempo).
- Os dois saem e entram pela porta da casa (`HUD_PORTA`). Cada um tem a pílula embaixo, o menu ao tocar nele, o item na casa e o botão no caderno. O tempo deles para com o jogo fechado, no sono e no cafezinho (`pausarRelogios`, `limparCafe`).

