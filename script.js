gsap.registerPlugin(ScrollTrigger);

const $  = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ══════════════════════════════════════════════════════
   ACTO 1 · EL SOBRE

   Reglas que sigo en toda la secuencia:
   · nada arranca de golpe — siempre hay anticipación
   · nada frena en seco — siempre hay un rebote que se asienta
   · lo que se mueve arrastra algo con él (la sombra, el sobre)
   · nada viaja en línea recta perfecta
   ══════════════════════════════════════════════════════ */

const sobre   = $(".sobre");
const solapa  = $(".solapa");
const sello   = $(".sello");
const selloI  = $(".sello-mitad.izq");
const selloD  = $(".sello-mitad.der");
const carta   = $(".carta-dentro");
const papel   = $(".carta-papel");
const sombra  = $(".sombra-sobre");
const rotulo  = $(".rotulo-sobre");
const luz     = $(".polvo-luz");

/* ---- postura de salida: nunca perfectamente de frente ---- */
gsap.set(sobre,  { rotateX: 17, rotateY: -7, rotateZ: -1.4, y: 0, z: 0 });
gsap.set(carta,  { y: "4%", rotateX: 0, rotateZ: 0, scale: 1, z: 0 });
gsap.set(sombra, { scaleX: 1, scaleY: 1, opacity: .85 });

/* ---- respiración: está vivo antes de que lo toquen ---- */
const respira = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: "sine.inOut" } });
respira
  .to(sobre,  { rotateX: 14.6, rotateY: -4.6, y: -5, duration: 2.9 }, 0)
  .to(sombra, { scaleX: .965, scaleY: .9, opacity: .74, duration: 2.9 }, 0)
  .to(luz,    { opacity: .82, duration: 3.6 }, 0);

const T = gsap.timeline({
  defaults: { ease: "none" },
  scrollTrigger: {
    trigger: "#acto-sobre",
    start: "top top",
    end: "+=460%",
    pin: ".sobre-fondo",
    scrub: 0.72,
    anticipatePin: 1,
    invalidateOnRefresh: true,
    onEnter: () => respira.pause(),
    onEnterBack: () => respira.pause(),
    onLeaveBack: () => respira.play(),
  },
});

/* ── 1 · ANTICIPACIÓN ─────────────────────────────
   El sobre se endereza y retrocede, como alguien que
   toma aire antes de abrir algo. La sombra se junta. */

T.to(rotulo, { opacity: 0, y: 14, duration: 7, ease: "power2.in" }, 0);

T.to(sobre, {
  rotateX: 4, rotateY: 3.5, rotateZ: .7, y: -16, z: 50,
  duration: 13, ease: "power2.inOut",
}, 2);

T.to(sombra, {
  scaleX: .86, scaleY: .7, opacity: .95,
  filter: "blur(7px)",
  duration: 13, ease: "power2.inOut",
}, 2);

/* ── 2 · EL SELLO CEDE ────────────────────────────
   Primero tiembla (tensión), después se parte y las
   dos mitades caen con peso, girando y separándose. */

T.to(sello, { rotateZ: -1.6, duration: 1.1, ease: "power1.inOut" }, 13)
 .to(sello, { rotateZ:  1.9, duration: 1.0, ease: "power1.inOut" }, 14.1)
 .to(sello, { rotateZ: -1.3, duration: .9,  ease: "power1.inOut" }, 15.1)
 .to(sello, { rotateZ:  0,   duration: .8,  ease: "power1.inOut" }, 16);

// izquierda: sale hacia afuera y cae
T.to(selloI, { x: "-62%", rotateZ: -44, duration: 11, ease: "power1.out" }, 17);
T.to(selloI, { y: "26%",  duration: 4, ease: "power2.in" }, 17);
T.to(selloI, { y: "190%", duration: 7, ease: "power2.in" }, 21);
T.to(selloI, { opacity: 0, duration: 6, ease: "power1.in" }, 20);

// derecha: un poco después, otro ángulo — nunca simétrico
T.to(selloD, { x: "58%", rotateZ: 52, duration: 11, ease: "power1.out" }, 17.6);
T.to(selloD, { y: "20%", duration: 4.4, ease: "power2.in" }, 17.6);
T.to(selloD, { y: "205%", duration: 7, ease: "power2.in" }, 22);
T.to(selloD, { opacity: 0, duration: 6, ease: "power1.in" }, 20.8);

/* ── 3 · LA SOLAPA SE ABRE ────────────────────────
   Se resiste un instante, cede, gira, y al final pasa
   de largo y vuelve: eso es lo que la hace sentir de papel. */

T.to(solapa, { rotateX: 5.5, duration: 4, ease: "power2.out" }, 19);   // se resiste
T.to(solapa, { rotateX: -96, duration: 11, ease: "power2.in" }, 23);   // cede y acelera
T.to(solapa, { rotateX: -162, duration: 9, ease: "power1.out" }, 34);  // pasa de largo
T.to(solapa, { rotateX: -151, duration: 5, ease: "power2.inOut" }, 43);// rebota
T.to(solapa, { rotateX: -157, duration: 5, ease: "power1.inOut" }, 48);// y se asienta

// y se hunde hacia atrás: una solapa abierta queda DETRÁS del sobre
T.to(solapa, { z: -5, duration: 14, ease: "power2.in" }, 26);

// el sobre acusa la apertura
T.to(sobre, { rotateX: -6.5, y: -22, duration: 12, ease: "power2.out" }, 23);
T.to(sombra, { scaleX: .96, scaleY: .78, opacity: .8, duration: 12, ease: "power2.out" }, 23);

/* ── 4 · LA CARTA SALE ────────────────────────────
   Baja un pelo antes de subir (toma impulso), sale
   inclinada, y el sobre se hunde al perder el peso. */

T.to(carta, { y: "7%", duration: 3.5, ease: "power2.out" }, 40);

T.to(carta, { y: "-54%", duration: 20, ease: "power2.out" }, 44);
T.to(carta, { z: 42, duration: 20, ease: "power2.out" }, 44);
T.to(carta, { rotateZ: -2.4, duration: 12, ease: "power2.out" }, 44);
T.to(carta, { rotateZ: 1.1, duration: 10, ease: "power1.inOut" }, 56);
T.to(carta, { rotateX: 14, duration: 20, ease: "power1.out" }, 44);

// el papel se endereza mientras sale: eso le da flexibilidad
T.fromTo(papel, { skewY: 1.6, scaleY: .97 },
  { skewY: -.7, scaleY: 1, duration: 18, ease: "power2.out" }, 45);

// el sobre se hunde al quedar vacío
T.to(sobre,  { y: 14, rotateX: 4, duration: 14, ease: "power2.inOut" }, 50);
T.to(sombra, { scaleX: 1.05, scaleY: .95, opacity: .7, filter: "blur(13px)",
               duration: 14, ease: "power2.inOut" }, 50);

/* ── 5 · LA CARTA VIENE HACIA LA CÁMARA ───────────
   Crece, se endereza del todo, y de paso tapa el sobre,
   que se va hacia abajo. Con un último asentamiento. */

T.to(carta, { scale: 1.9, y: "-66%", rotateX: 4, rotateZ: 0, z: 120,
              duration: 20, ease: "power2.inOut" }, 62);

// el papel se acerca hasta tapar la pantalla: ahí empieza la carta de verdad
T.to(carta, { scale: 6.4, y: "-48%", rotateX: 0, z: 250,
              duration: 20, ease: "power2.in" }, 78);
T.to(papel, { boxShadow: "0 0 0 rgba(0,0,0,0)", duration: 10, ease: "power1.in" }, 72);
T.set(papel, { backgroundImage: "none" }, 76);
T.to(".renglon", { opacity: 0, duration: 9, ease: "power1.in" }, 73);

// y el fondo se vuelve del color del papel, para que el corte no se note
T.to(".velo-papel", { opacity: 1, scale: 1.9, duration: 17, ease: "power1.inOut" }, 71);

T.to([".cara", solapa], { opacity: 0, duration: 11, ease: "power2.in" }, 66);
T.to(sobre, { y: 120, rotateX: 18, duration: 16, ease: "power2.in" }, 66);
T.to(sombra, { opacity: 0, scaleX: 1.3, duration: 13, ease: "power2.in" }, 64);
T.to(luz,    { opacity: 0, duration: 16, ease: "power1.inOut" }, 66);

/* ══════════════════════════════════════════════════════
   ACTO 2 · LA CARTA SE ESCRIBE
   Palabra por palabra, al ritmo del scroll.
   ══════════════════════════════════════════════════════ */

$$("#acto-carta .linea").forEach((linea) => {
  gsap.to(linea.querySelectorAll(".p"), {
    color: "var(--tinta)",
    ease: "none",
    stagger: { each: 1, from: "start" },
    scrollTrigger: {
      trigger: linea,
      start: "top 82%",
      end: "bottom 56%",
      scrub: 0.5,
    },
  });
});

gsap.to([".firma", ".fecha"], {
  opacity: 1,
  y: 0,
  duration: 1,
  ease: "power2.out",
  stagger: 0.22,
  scrollTrigger: { trigger: ".firma", start: "top 86%" },
});
gsap.set([".firma", ".fecha"], { y: 16 });

/* ══════════════════════════════════════════════════════
   ACTO 3 · EL VIAJE
   El camino se dibuja y el mapa se arrastra con el viajero.
   ══════════════════════════════════════════════════════ */

const KM_TOTAL = 1268;
const camino   = $("#camino-hecho");
const viajero  = $("#viajero");
const cifra    = $("#cifra");
const lugar    = $("#lugar");
const svgMapa  = $("#mapa");
const remateM  = $("#remate-mapa");

const LARGO = camino.getTotalLength();

// el eje del recorrido: para que la cámara no lo deje fuera de cuadro
const EJE_X = (() => {
  let min = Infinity, max = -Infinity;
  for (let i = 0; i <= 40; i++) {
    const p = camino.getPointAtLength((LARGO * i) / 40);
    if (p.x < min) min = p.x;
    if (p.x > max) max = p.x;
  }
  return (min + max) / 2;
})();
gsap.set(camino, { strokeDasharray: LARGO, strokeDashoffset: LARGO });

const PARADAS = [
  [0.00, "Los Pinos"], [0.09, "Santiago"],   [0.26, "Talca"],
  [0.40, "Concepción"],[0.56, "Temuco"],     [0.72, "Osorno"],
  [0.80, "Puerto Montt"], [0.85, "Hornopirén"],
  [0.91, "Chaitén"],   [0.98, "La Junta"],   [1.00, "Puyuhuapi"],
];

const estado = { p: 0 };

function dibujarViaje() {
  const p = estado.p;

  camino.style.strokeDashoffset = LARGO * (1 - p);

  const punto = camino.getPointAtLength(LARGO * p);
  viajero.setAttribute("cx", punto.x);
  viajero.setAttribute("cy", punto.y);

  // la cámara sigue al viajero, pero sin despegarse nunca del mapa
  const vb = svgMapa.viewBox.baseVal;
  const escala = svgMapa.getBoundingClientRect().width / vb.width;
  const altoMapa = vb.height * escala;
  const anchoMapa = vb.width * escala;
  const pantalla = window.innerHeight;

  let ty = pantalla * 0.44 - punto.y * escala;
  ty = Math.max(pantalla - altoMapa, Math.min(0, ty));

  // en horizontal, el camino entero queda centrado
  const tx = window.innerWidth / 2 - EJE_X * escala;

  gsap.set(svgMapa, { x: Math.max(window.innerWidth - anchoMapa, Math.min(0, tx)), y: ty });

  cifra.textContent = Math.round(KM_TOTAL * p).toLocaleString("es-CL");

  let nombre = PARADAS[0][1];
  for (const [u, n] of PARADAS) if (p >= u - 0.012) nombre = n;
  if (lugar.textContent !== nombre) {
    lugar.textContent = nombre;
    gsap.fromTo(lugar, { opacity: 0, y: 9 },
      { opacity: 1, y: 0, duration: .5, ease: "power2.out" });
  }
}

const viaje = gsap.timeline({
  scrollTrigger: {
    trigger: "#acto-mapa",
    start: "top top",
    end: "+=680%",
    pin: ".mapa-fondo",
    scrub: 0.85,
    anticipatePin: 1,
    invalidateOnRefresh: true,
    onRefresh: dibujarViaje,
  },
})
  .to({}, { duration: 6 })                                        // un respiro antes de salir
  .to(estado, { p: 1, duration: 80, ease: "power1.inOut", onUpdate: dibujarViaje })
  .to(".hud", { opacity: 0, y: -18, duration: 7, ease: "power2.in" }, 87)
  .fromTo(remateM, { opacity: 0, y: 26, scale: .97 },
                   { opacity: 1, y: 0, scale: 1, duration: 9, ease: "power2.out" }, 88)
  .to(".lienzo-mapa", { opacity: .22, duration: 8, ease: "power2.inOut" }, 92)
  .to(remateM, { opacity: 0, y: -16, duration: 5, ease: "power2.in" }, 97);

/* ── los recuerdos van saliendo del camino ──
   Cada uno asoma mientras el viaje avanza, se asienta con
   un rebote corto, acompaña un tramo y se retira. */

const azar = (a, b) => a + Math.random() * (b - a);
const recuerdos = $$(".recuerdo");
const ENTRA = 9;
const PASO  = 72 / recuerdos.length;   // una tras otra, sin amontonarse

recuerdos.forEach((foto, i) => {
  const t = ENTRA + i * PASO;
  const lado = i % 2 ? 1 : -1;
  const giro = azar(3.4, 8.2) * lado;

  gsap.set(foto, { rotate: giro * 1.8, scale: .84, y: 48, opacity: 0 });

  viaje
    // asoma
    .to(foto, { opacity: 1, duration: 1.5, ease: "power1.out" }, t)
    .to(foto, { y: 0, duration: 2.6, ease: "power2.out" }, t)
    .to(foto, { scale: 1, duration: 3.1, ease: "back.out(1.8)" }, t)
    .to(foto, { rotate: giro, duration: 3.8, ease: "power3.out" }, t + .3)
    // y se retira justo cuando la siguiente asoma
    .to(foto, { opacity: 0, y: -34, scale: .94, duration: 1.7, ease: "power2.in" },
        t + PASO * 0.88);
});

dibujarViaje();

/* ══════════════════════════════════════════════════════
   ACTO 5 · CIERRE
   ══════════════════════════════════════════════════════ */

gsap.timeline({ scrollTrigger: { trigger: "#cierre", start: "top 72%" } })
  .from(".cierre-chico", { opacity: 0, y: 18, duration: .8, ease: "power2.out" })
  .from("#cierre h2", { opacity: 0, y: 46, scale: .94, duration: 1.3, ease: "power3.out" }, .18)
  .from(".cierre-firma", { opacity: 0, y: 18, duration: .9, ease: "power2.out" }, .72);

/* ══════════════════════════════════════════════════════
   SI PIDIERON MENOS MOVIMIENTO
   ══════════════════════════════════════════════════════ */

if (quieto) {
  respira.pause();
  ScrollTrigger.getAll().forEach((t) => t.kill());
  gsap.set([sobre, sombra, sello, rotulo], { clearProps: "all" });
  gsap.set(carta, { y: "4%" });
  gsap.set(solapa, { rotateX: -176 });
  gsap.set(".recuerdo", { opacity: 1, y: 0, rotate: 0, scale: 1 });
  gsap.set([".firma", ".fecha", remateM], { opacity: 1, y: 0 });
  estado.p = 1;
  dibujarViaje();
}
