import type { CardProps } from "../types/cardProps";
import type { DropRateProps } from "../types/dropRateProps";

function getRandomItem<T>(items: T[]) {
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}

export function getRandomCard(cards: CardProps[], dropRates: DropRateProps[]) {
  if (cards.length === 0) {
    return null;
  }

  const totalChance = dropRates.reduce((total, item) => total + item.chance, 0);
  let roll = Math.random() * totalChance;
  const selectedRate =
    dropRates.find((item) => {
      roll -= item.chance;
      return roll <= 0;
    }) ?? dropRates[dropRates.length - 1];

  const cardsByRarity = cards.filter(
    (card) => card.rarity === selectedRate.rarity,
  );

  return getRandomItem(cardsByRarity.length > 0 ? cardsByRarity : cards);
}
