"use client";

import { useState } from "react";
import type { CardProps } from "../types/cardProps";
import type { DrawResult } from "../types/collectionProps";
import type { DropRateProps } from "../types/dropRateProps";
import { getRandomCard } from "../utils/getRandomCard";
import { useCardCollection } from "./useCardCollection";
import { useModal } from "./useModal";

export function useMysteryChest(cards: CardProps[], dropRates: DropRateProps[]) {
  const modal = useModal();
  const collection = useCardCollection(cards);
  const [drawResult, setDrawResult] = useState<DrawResult | null>(null);

  function openChest() {
    const card = getRandomCard(cards, dropRates);

    if (!card) {
      return;
    }

    const result = collection.unlockCard(card);
    setDrawResult({
      card,
      isNew: result.isNew,
      copies: result.copies,
    });
    modal.openModal();
  }

  return {
    ...collection,
    drawResult,
    isOpen: modal.isOpen,
    closeModal: modal.closeModal,
    openChest,
  };
}
