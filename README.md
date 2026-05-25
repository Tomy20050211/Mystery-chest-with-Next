# Mystery Chest with Next

Aplicacion hecha con Next.js para abrir un cofre misterioso inspirado en League of Legends. Cada apertura entrega una carta aleatoria con skin, rareza, animacion de modal y seguimiento de coleccion.

![Lux Elementalista](https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lux_7.jpg)

## Funcionalidades

- Sorteo aleatorio de cartas usando porcentajes por rareza.
- Modal animado con `framer-motion`.
- Imagen completa de la skin usando `next/image`.
- Panel de coleccion con cartas desbloqueadas.
- Contador de copias cuando una carta sale repetida.
- Mensaje de carta nueva.
- Confeti cuando desbloqueas una carta por primera vez.
- Persistencia en `localStorage`.
- Separacion entre server components, client components, hooks, data, types y utils.

## Preview De Cartas

| Mitica | Legendaria | Epica |
| --- | --- | --- |
| ![Lux Elementalista](https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lux_7.jpg) | ![Ahri KDA ALL OUT](https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_28.jpg) | ![Kai'Sa KDA ALL OUT](https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Kaisa_26.jpg) |

## Tecnologias

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Data Dragon de Riot Games para splash arts

## Como Ejecutar

```bash
npm install
npm run dev
```

Abre la app en:

```text
http://localhost:3000
```

Para validar el proyecto:

```bash
npm run lint
npm run build
```

## Arquitectura

```text
src/
  actions/
    cardsActions.ts
  app/
    page.tsx
    api/cards/route.ts
  components/
    MysteryChestClient.tsx
    cardModal.tsx
    CollectionPanel.tsx
    ConfettiBurst.tsx
    DropRatesPanel.tsx
  data/
    cards.ts
    dropRates.ts
  hooks/
    useMysteryChest.ts
    useCardCollection.ts
    useModal.ts
  types/
    cardProps.ts
    collectionProps.ts
    dropRateProps.ts
    rarityProps.ts
  utils/
    getRandomCard.ts
```

## Server Y Client

`src/app/page.tsx` es un server component. Su responsabilidad es pedir los datos iniciales y enviar props limpias al cliente.

```tsx
const [cards, dropRates] = await Promise.all([getCards(), getDropRates()]);
return <MysteryChestClient cards={cards} dropRates={dropRates} />;
```

`src/actions/cardsActions.ts` usa `"use server"` y centraliza los datos que salen desde el servidor:

```ts
"use server";

export async function getCards() {
  return arrayCards;
}
```

`MysteryChestClient.tsx` usa `"use client"` porque maneja interaccion del usuario, hooks, modal, confeti y estado de coleccion.

## Hooks Importantes

### `useMysteryChest`

Archivo: `src/hooks/useMysteryChest.ts`

Es el hook principal de la experiencia. Une el sorteo, el modal y la coleccion.

Responsabilidades:

- Ejecutar `openChest()`.
- Pedir una carta aleatoria con `getRandomCard`.
- Registrar si la carta es nueva o repetida.
- Abrir el modal con el resultado.

### `useCardCollection`

Archivo: `src/hooks/useCardCollection.ts`

Maneja la coleccion desbloqueada por el jugador.

Responsabilidades:

- Guardar copias por `id` de carta.
- Saber cuantas cartas unicas se desbloquearon.
- Saber cuantas aperturas totales existen.
- Persistir la coleccion en `localStorage`.
- Reiniciar la coleccion.

### `useModal`

Archivo: `src/hooks/useModal.ts`

Hook pequeno para abrir y cerrar el modal.

Responsabilidades:

- Guardar `isOpen`.
- Exponer `openModal()`.
- Exponer `closeModal()`.

## Funciones Importantes

### `getRandomCard`

Archivo: `src/utils/getRandomCard.ts`

Selecciona una carta usando probabilidades por rareza. Primero sortea la rareza y luego elige una carta aleatoria dentro de esa rareza.

```ts
const totalChance = dropRates.reduce((total, item) => total + item.chance, 0);
let roll = Math.random() * totalChance;
```

Esto permite que las cartas mas raras tengan menos probabilidad de salir.

### `splashUrl`

Archivo: `src/data/cards.ts`

Ayuda a no repetir URLs largas de Data Dragon.

```ts
const splashUrl = (champion: string, skinNumber: number) =>
  `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion}_${skinNumber}.jpg`;
```

## Probabilidades

Archivo: `src/data/dropRates.ts`

```ts
common: 45%
special: 28%
epic: 17%
legendary: 8%
mitic: 2%
```

Las rarezas altas tienen menor probabilidad de salir. El panel `DropRatesPanel` muestra estos porcentajes en la interfaz.

## Componentes Clave

### `CardModal`

Muestra la carta obtenida. Usa `AnimatePresence` y `motion` para animar entrada y salida.

Tambien muestra si la carta es nueva o cuantas copias tienes.

### `CollectionPanel`

Muestra:

- Cartas desbloqueadas.
- Total de cartas disponibles.
- Numero total de aperturas.
- Contador de copias por carta.

### `ConfettiBurst`

Renderiza confeti animado cuando `drawResult.isNew` es verdadero.

## Fuente De Imagenes

Las imagenes vienen de Data Dragon:

```text
https://ddragon.leagueoflegends.com/cdn/img/champion/splash/
```

Por eso `next.config.ts` permite imagenes remotas desde:

```ts
ddragon.leagueoflegends.com
```
