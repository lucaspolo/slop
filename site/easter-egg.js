// Easter egg: de vez em quando o Milton ou a Luma surgem de uma borda qualquer da tela e falam num balão.

const CHARACTERS = [
  {
    img: "img/milton-espiando.svg",
    says: "Milton, the Puton, na área!",
    // Balança a cabeça de um lado para o outro enquanto fala.
    talk: [{ transform: "rotate(-9deg)" }, { transform: "rotate(9deg)" }],
    talkMs: 300,
  },
  {
    img: "img/luma-espiando.svg",
    says: "AU! AU! AU!",
    // Dá um tranco para cima a cada latido.
    talk: [
      { transform: "translateY(0) scale(1, 1)" },
      { transform: "translateY(-12%) scale(0.92, 1.1)" },
    ],
    talkMs: 190,
  },
];

// Os desenhos são cortados embaixo. A rotação vira esse corte para a borda de onde o
// personagem surge, e `out` é a direção para fora da tela.
const SIDES = {
  bottom: { rotate: 0, out: [0, 1] },
  top: { rotate: 180, out: [0, -1] },
  left: { rotate: 90, out: [-1, 0] },
  right: { rotate: -90, out: [1, 0] },
};

// Intervalo sorteado entre 6 e 24 s, dando cerca de 15 s em média.
const MIN_GAP_MS = 6000;
const MAX_GAP_MS = 24000;
const LETTER_MS = 45;
const HOLD_MS = 1600;
// Distância mínima entre o personagem e os cantos da tela, em fração da borda.
const EDGE_MARGIN = 0.06;

const motion = !matchMedia("(prefers-reduced-motion: reduce)").matches;

const peek = document.createElement("div");
peek.className = "peek";
peek.setAttribute("aria-hidden", "true");
peek.innerHTML = '<div class="actor"><img alt="" width="200" height="200"></div><p class="bubble"></p>';
document.body.append(peek);

const actor = peek.querySelector(".actor");
const img = peek.querySelector("img");
const bubble = peek.querySelector(".bubble");

// Baixa os desenhos antes, para o personagem não surgir com a imagem ainda vazia.
for (const { img: src } of CHARACTERS) new Image().src = src;

const pick = (list) => list[Math.floor(Math.random() * list.length)];
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const play = (el, keyframes, options) =>
  el.animate(keyframes, { fill: "forwards", ...options, duration: motion ? options.duration : 0 }).finished;

function scheduleNext() {
  setTimeout(appear, MIN_GAP_MS + Math.random() * (MAX_GAP_MS - MIN_GAP_MS));
}

// Posiciona o personagem num ponto sorteado da borda e diz ao CSS para qual lado abrir o balão.
function place(sideName) {
  const size = peek.offsetWidth;
  const vertical = sideName === "left" || sideName === "right";
  const length = vertical ? innerHeight : innerWidth;
  const offset = length * EDGE_MARGIN + Math.random() * Math.max(0, length * (1 - 2 * EDGE_MARGIN) - size);

  peek.style.inset = "auto";
  peek.style[sideName] = "0";
  peek.style[vertical ? "top" : "left"] = `${offset}px`;
  peek.dataset.side = sideName;
  peek.dataset.half = offset + size / 2 < length / 2 ? "start" : "end";
}

async function appear() {
  // Com a aba em segundo plano ninguém vê, então só espera a próxima vez.
  if (document.hidden) return scheduleNext();

  const character = pick(CHARACTERS);
  const sideName = pick(Object.keys(SIDES));
  const { rotate, out: [dx, dy] } = SIDES[sideName];
  const at = (k) => ({ transform: `translate(${dx * k}%, ${dy * k}%) rotate(${rotate}deg)` });

  img.src = character.img;
  bubble.textContent = "";
  place(sideName);
  for (const a of peek.getAnimations({ subtree: true })) a.cancel();
  actor.style.transform = at(110).transform;
  bubble.style.opacity = "0";
  peek.classList.add("show");

  // Entra passando um pouco do ponto e volta, como quem pula para dentro da tela.
  await play(actor, [at(110), { ...at(-14), offset: 0.55 }, { ...at(5), offset: 0.8 }, at(0)], {
    duration: 650,
    easing: "ease-out",
  });

  const talking = motion
    ? img.animate(character.talk, {
        duration: character.talkMs,
        direction: "alternate",
        iterations: Infinity,
        easing: "ease-in-out",
      })
    : null;

  play(bubble, [
    { opacity: 0, transform: "scale(0) rotate(-12deg)" },
    { opacity: 1, transform: "scale(1.15) rotate(4deg)", offset: 0.7 },
    { opacity: 1, transform: "scale(1) rotate(0)" },
  ], { duration: 380, easing: "ease-out" });

  if (motion) {
    for (const letter of character.says) {
      bubble.textContent += letter;
      await wait(LETTER_MS);
    }
  } else {
    bubble.textContent = character.says;
  }
  await wait(HOLD_MS);

  talking?.cancel();
  await play(bubble, [{ opacity: 1, transform: "scale(1)" }, { opacity: 0, transform: "scale(0)" }], {
    duration: 160,
    easing: "ease-in",
  });
  // Recua um pouquinho antes de sumir.
  await play(actor, [at(0), { ...at(-6), offset: 0.3 }, at(110)], { duration: 420, easing: "ease-in" });

  peek.classList.remove("show");
  scheduleNext();
}

scheduleNext();
