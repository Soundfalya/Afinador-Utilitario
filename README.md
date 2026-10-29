# Afinador Multinstrumento

Afinador cromático para el navegador, hecho en un solo archivo HTML sin dependencias. Escucha el micrófono, detecta la nota y muestra con una aguja cuántos cents te faltan para la cuerda.

**Úsalo aquí:** https://soundfalya.github.io/afinador-utilitario/

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
- Aguja y cents medidos respecto a la cuerda objetivo, con indicación de subir o bajar.
- Toca una cuerda en pantalla para oír su tono de referencia y fijarla como objetivo.
- Transposición de −6 a +6 semitonos.
- Calibración de A4 entre 415 y 466 Hz.
- Recuerda el instrumento, la transposición y la calibración.

## Uso local

El navegador solo permite el micrófono por HTTPS o desde `localhost`. Para probarlo en tu computador:

```bash
python3 -m http.server 8000
```

Luego abre http://localhost:8000 y da permiso al micrófono.
