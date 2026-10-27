// Abas da página inicial: mostra uma seção por vez. Sem JS, as seções aparecem uma embaixo da outra.

const tabs = [...document.querySelectorAll('[role="tab"]')];
const panelOf = (tab) => document.getElementById(tab.getAttribute("aria-controls"));

function select(tab) {
  for (const t of tabs) {
    const on = t === tab;
    t.setAttribute("aria-selected", String(on));
    t.tabIndex = on ? 0 : -1;
    panelOf(t).hidden = !on;
  }
}

tabs.forEach((tab, i) => {
  tab.addEventListener("click", () => {
    select(tab);
    // Guarda a aba no endereço, para o link compartilhado e o voltar do navegador abrirem nela.
    history.replaceState(null, "", "#" + tab.dataset.hash);
  });
  // Setas trocam de aba, como pede o padrão de abas acessíveis.
  tab.addEventListener("keydown", (event) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const next = tabs[(i + step + tabs.length) % tabs.length];
    next.click();
    next.focus();
  });
});

// O endereço com #jogos abre direto na aba dos jogos; sem nada, abre na primeira.
select(tabs.find((t) => location.hash === "#" + t.dataset.hash) ?? tabs[0]);
