// service worker da Fazenda Joli Pig: deixa o jogo abrir sem internet.
// O jogo (index.html) vem sempre da rede quando há internet, e a cópia fica guardada para abrir offline. O three.js e as
// fontes não mudam: vêm do cache e só são baixados uma vez. VERSAO muda a cada publicação que mexe no jogo (o deploy troca
// o marcador pelo resumo dos arquivos do jogo); aí o navegador instala este arquivo de novo, guarda a versão nova e avisa o
// jogo aberto, que oferece atualizar
const VERSAO = '__VERSAO__';
const JOGO = 'fazenda-joli-pig-jogo-' + VERSAO, FIXOS = 'fazenda-joli-pig-fixos';
const TRES = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
const FONTES = 'https://fonts.googleapis.com/css2?family=Bagel+Fat+One&family=Gochi+Hand&family=Rubik:wght@500;700;800&display=swap';
const LOCAIS = ['./', './manifest.webmanifest', './icones/icone-192.png', './icones/icone-512.png', './icones/icone-mascara-512.png', './icones/apple-touch-icon.png', './icones/icone-32.png'];
// sem resposta da rede nesse tempo, abre a cópia guardada (e a rede continua atualizando a cópia por trás)
const ESPERA_REDE = 4000;
const ESCOPO = new URL('./', self.location).pathname;

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(JOGO);
    await c.addAll(LOCAIS.map(u => new Request(u, { cache: 'reload' })));
    // o three.js e as fontes: se a rede falhar agora, ficam para a próxima vez
    const f = await caches.open(FIXOS);
    await Promise.all([guardarDeFora(f, TRES), guardarFontes(f)]);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k.startsWith('fazenda-joli-pig-jogo-') && k !== JOGO) await caches.delete(k);
    await self.clients.claim();
    // o jogo aberto confere se é a mesma versão; se não for, oferece atualizar
    for (const c of await self.clients.matchAll({ type: 'window' })) c.postMessage({ tipo: 'versao', versao: VERSAO });
  })());
});

self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const u = new URL(r.url);
  if (r.mode === 'navigate'){ if (u.origin === location.origin && u.pathname.startsWith(ESCOPO)) e.respondWith(pagina(e, u)); return; }
  if (u.origin === location.origin){ if (u.pathname.startsWith(ESCOPO)) e.respondWith(guardadoOuRede(r)); return; }
  if (r.url === TRES || u.hostname === 'fonts.gstatic.com' || r.url === FONTES) e.respondWith(fixo(r));
});

// a página: da rede (conferindo com o servidor, sem cache do navegador) e guardada; sem rede ou demorando, a cópia
async function pagina(e, u){
  const c = await caches.open(JOGO), chave = u.origin + u.pathname.replace(/index\.html$/, '');
  const guardada = await c.match(chave);
  const daRede = fetch(chave, { cache: 'no-cache', credentials: 'same-origin' }).then(async res => {
    if (!res.ok || res.redirected) return null;
    await c.put(chave, res.clone());
    return res;
  }).catch(() => null);
  if (!guardada){ const res = await daRede; return res || fetch(e.request); }
  e.waitUntil(daRede);
  const espera = new Promise(ok => setTimeout(() => ok(null), ESPERA_REDE));
  return (await Promise.race([daRede, espera])) || guardada;
}
// ícones e manifesto: a cópia guardada na hora, e a rede atualiza por trás
async function guardadoOuRede(r){
  const c = await caches.open(JOGO), guardado = await c.match(r, { ignoreSearch: true });
  const rede = fetch(r).then(res => { if (res.ok) c.put(r, res.clone()); return res; }).catch(() => guardado || Response.error());
  return guardado || rede;
}
// o three.js e as fontes: do cache; se ainda não estão lá, baixa e guarda
async function fixo(r){
  const c = await caches.open(FIXOS), guardado = await c.match(r.url);
  if (guardado) return guardado;
  try {
    const res = await fetch(r.url, { mode: 'cors', credentials: 'omit' });
    if (res.ok) await c.put(r.url, res.clone());
    return res;
  } catch (err){ return fetch(r); }
}
async function guardarDeFora(c, url){
  if (await c.match(url)) return;
  try { const res = await fetch(url, { mode: 'cors', credentials: 'omit' }); if (res.ok) await c.put(url, res); } catch (err){}
}
// o CSS das fontes e os arquivos de fonte das letras latinas (o português só usa esses)
async function guardarFontes(c){
  try {
    const res = await fetch(FONTES, { mode: 'cors', credentials: 'omit' });
    if (!res.ok) return;
    const css = await res.clone().text();
    await c.put(FONTES, res);
    const urls = [];
    for (const bloco of css.split('/*').slice(1)){
      const nome = bloco.slice(0, bloco.indexOf('*/')).trim();
      if (nome !== 'latin' && nome !== 'latin-ext') continue;
      for (const m of bloco.matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g)) urls.push(m[1]);
    }
    await Promise.all(urls.map(u => guardarDeFora(c, u)));
  } catch (err){}
}
