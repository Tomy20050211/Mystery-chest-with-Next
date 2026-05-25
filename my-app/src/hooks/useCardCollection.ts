"use client";

import { useEffect, useMemo, useState } from "react";
import type { CardProps } from "../types/cardProps";
import type { UnlockedCard } from "../types/collectionProps";

const STORAGE_KEY = "mystery-chest-unlocked-cards";

type StoredCollection = Record<number, number>;

export function useCardCollection(cards: CardProps[]) {
  const [cardCopies, setCardCopies] = useState<StoredCollection>(() => {
    if (typeof window === "undefined") {
      return {};
    }

    try {
      const storedValue = window.localStorage.getItem(STORAGE_KEY);
      return storedValue ? (JSON.parse(storedValue) as StoredCollection) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cardCopies));
  }, [cardCopies]);

  const unlockedCards = useMemo<UnlockedCard[]>(() => {
    return cards
      .filter((card) => cardCopies[card.id])
      .map((card) => ({
        card,
        count: cardCopies[card.id],
      }))
      .sort((first, second) => second.count - first.count);
  }, [cards, cardCopies]);

  function unlockCard(card: CardProps) {
    const currentCopies = cardCopies[card.id] ?? 0;
    const nextCopies = currentCopies + 1;

    setCardCopies((current) => ({
      ...current,
      [card.id]: nextCopies,
    }));

    return {
      isNew: currentCopies === 0,
      copies: nextCopies,
    };
  }

  function resetCollection() {
    setCardCopies({});
  }

  return {
    unlockedCards,
    unlockedCount: unlockedCards.length,
    totalCopies: Object.values(cardCopies).reduce(
      (total, count) => total + count,
      0,
    ),
    unlockCard,
    resetCollection,
  };
}
