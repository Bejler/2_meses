# Dos meses

Página para Ro. 23 de noviembre de 2026.

## Cómo va

Todo está amarrado al scroll: ella no mira un video, lo controla con el dedo.

**1 · El sobre.** Descansa sobre la mesa, respirando. Al empezar a bajar se
endereza y retrocede — toma aire. El sello de lacre tiembla, se parte en dos y
las mitades caen girando. La solapa se resiste un instante, cede, gira hasta
atrás, se pasa de largo y vuelve. La sombra acompaña cada movimiento.

**2 · La carta sale.** Baja un pelo antes de subir, sale inclinada, el papel se
endereza mientras asoma y el sobre se hunde al quedar vacío. Después la carta
viene hacia la cámara, crece, y se convierte en la hoja de la carta: la
transición no se ve.

**3 · La carta se escribe.** Palabra por palabra, al ritmo del scroll.

**4 · El viaje.** El mapa es la costa real de Chile — se reconocen Chiloé, los
canales y los archipiélagos de Aysén. La línea sale de Los Pinos y baja por
Santiago, Talca, Concepción, Temuco, Osorno, Puerto Montt, Hornopirén, Chaitén y
La Junta hasta Puyuhuapi. El contador sube hasta los 1.268 km que los separan en
línea recta, y la cámara sigue al viajero.

**5 · Los recuerdos.** Mientras baja por Chile, las 17 fotos van apareciendo en
el camino, una a una, alternando lados. Cada una asoma, se asienta con un
rebote, acompaña un tramo y se retira cuando llega la siguiente.

**6 · El cierre.** "y así y todo, aquí estamos", y después el te amo mucho.

## Archivos

```
index.html
styles.css
script.js
fotos/f01.jpg … f17.jpg
fuentes/   ← Caveat (la letra manuscrita) y Fraunces
js/        ← GSAP y ScrollTrigger
```

Todo va dentro: ni fuentes ni librerías vienen de internet, así que la página
carga rápido y funciona igual sin señal buena. Pesa 2,8 MB en total, casi todo
son las fotos.

## Cambiar algo

- **El texto de la carta**: en el `index.html`, cada párrafo es un
  `<p class="linea">`. Cada palabra va en su propio `<span class="p">` — si
  agregas texto, respeta ese formato o no se escribirá sola.
- **Las fotos**: reemplaza los archivos en `fotos/` manteniendo los nombres. El
  orden es el número. Si quieres menos, borra las `<figure class="recuerdo">`
  que sobren.
- **Los tiempos de la animación**: en `script.js` cada acto tiene su línea de
  tiempo de 0 a 100. El número al final de cada línea es el momento en que
  arranca. Por ejemplo `}, 34)` en el acto 1 es cuando la solapa cede.

## Subirla a GitHub

1. Sube **todo**, incluidas las carpetas `fotos`, `fuentes` y `js`.
2. Settings → Pages → Source: **Deploy from a branch**.
3. Branch: `main`, carpeta `/ (root)` → Save.

Si cambias el CSS o el JS y no ves el cambio, súbele el número al `?v=1` del
`index.html`.
