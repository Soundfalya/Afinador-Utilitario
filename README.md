# Afinador-5

Afinador multinstrumento y metrónomo para el navegador, con la estética de un sintetizador analógico de los 70. Es un solo archivo HTML sin dependencias. Escucha el micrófono, detecta la nota y muestra en un display de 7 segmentos y una barra de LEDs cuántos cents te faltan para la cuerda. Se adapta a computador y celular.

**Úsalo aquí:** https://soundfalya.github.io/Afinador-Utilitario/

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
