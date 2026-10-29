# Afinador-5

Afinador multinstrumento y metrónomo para el navegador, con la estética de un sintetizador analógico de los 70. Es una página HTML sin dependencias que se puede instalar como app y funciona sin internet. Escucha el micrófono, detecta la nota y muestra en un display de 7 segmentos y una barra de LEDs cuántos cents te faltan para la cuerda. Se adapta a computador y celular.

**Úsalo aquí:** https://soundfalya.github.io/Afinador-Utilitario/

## Instalar como app

Ábrelo una vez con internet y queda guardado en el dispositivo. Desde ahí abre y afina sin conexión, con su propio ícono.

- **Android (Chrome):** toca «Instalar» en el aviso de la página, o en el menú ⋮ elige «Instalar app».
- **iPhone / iPad (Safari):** toca Compartir y luego «Agregar a inicio».
- **Computador (Chrome o Edge):** usa el ícono de instalar en la barra de direcciones.

Cuando se publica una versión nueva, la app muestra «Hay una versión nueva» la próxima vez que la abres con internet. Toca «Actualizar».

## Instrumentos

| Instrumento | Afinación |
|---|---|
| Guitarra | E2 A2 D3 G3 B3 E4 |
| Bajo | E1 A1 D2 G2 |
| Ukelele | G4 C4 E4 A4 |
| Cuatro venezolano | A3 D4 F#4 B3 |
| Cromático | Cualquier nota |

## Funciones

- Detección de tono con el algoritmo YIN, limitada al rango del instrumento elegido.
- Barra de LEDs y cents medidos respecto a la cuerda objetivo, con indicación de apretar o aflojar.
- Toca una cuerda en pantalla para oír su tono de referencia y fijarla como objetivo.
- Transposición de −6 a +6 semitonos y calibración de A4 entre 415 y 466 Hz con perillas (arrastra arriba/abajo, rueda del mouse o flechas; doble clic para reiniciar).
- Metrónomo de 40 a 240 BPM con compases 2/4, 3/4, 4/4 y 6/8, acento en el primer tiempo y TAP tempo.
- Teclado de 2 octavas que toca tonos de referencia y marca la nota detectada.
- Recuerda el instrumento, la transposición y la calibración.

## Uso local

El navegador solo permite el micrófono por HTTPS o desde `localhost`. Para probarlo en tu computador:

```bash
python3 -m http.server 8000
```

Luego abre http://localhost:8000 y da permiso al micrófono.

## Publicar cambios

La app se guarda en el dispositivo mediante `sw.js`. **Cada vez que cambie `index.html`, `manifest.webmanifest`, `fonts/` o `icons/`, sube `VERSION` en `sw.js`** (`v1` → `v2`…). Si no se sube, quienes tienen la app instalada siguen usando la copia anterior sin conexión. Una revisión automática en cada PR falla si se olvida.

Si alguna vez la parte sin conexión quedara rota, se puede reemplazar `sw.js` por este contenido, que borra la copia guardada en todos los dispositivos y deja la página funcionando directo desde internet:

```js
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil((async () => {
  for (const k of await caches.keys()) await caches.delete(k);
  await self.registration.unregister();
  for (const c of await self.clients.matchAll({ type:'window' })) c.navigate(c.url);
})()));
```

Las fuentes Barlow y Barlow Condensed se incluyen en `fonts/` bajo la licencia SIL Open Font License (`fonts/OFL.txt`).
