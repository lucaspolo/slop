// Easter egg: de vez em quando o Milton ou a Luma sobem num canto da tela e falam alguma coisa.

const CHARACTERS = [
  { img: "img/milton-espiando.svg", says: "Milton, the Puton, na área!" },
  { img: "img/luma-espiando.svg", says: "AU! AU! AU!" },
];

// Intervalo sorteado entre 10 e 20 s, dando cerca de 15 s em média.
const MIN_GAP_MS = 10000;
const MAX_GAP_MS = 20000;
const VISIBLE_MS = 4000;

const peek = document.createElement("div");
peek.className = "peek";
peek.setAttribute("aria-hidden", "true");
peek.innerHTML = '<p class="bubble"></p><img alt="" width="200" height="200">';
document.body.append(peek);

const bubble = peek.querySelector(".bubble");
const img = peek.querySelector("img");

// Baixa os desenhos antes, para o personagem não subir com a imagem ainda vazia.
for (const { img: src } of CHARACTERS) new Image().src = src;

const pick = (list) => list[Math.floor(Math.random() * list.length)];

function scheduleNext() {
  setTimeout(appear, MIN_GAP_MS + Math.random() * (MAX_GAP_MS - MIN_GAP_MS));
}

function appear() {
  // Com a aba em segundo plano ninguém vê, então só espera a próxima vez.
  if (document.hidden) return scheduleNext();

  const character = pick(CHARACTERS);
  img.src = character.img;
  bubble.textContent = character.says;
  peek.classList.toggle("left", Math.random() < 0.5);
  peek.classList.add("show");

  setTimeout(() => {
    peek.classList.remove("show");
    scheduleNext();
  }, VISIBLE_MS);
}

scheduleNext();
