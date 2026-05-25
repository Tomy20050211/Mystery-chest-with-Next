import type { CardProps } from "./cardProps";

export type UnlockedCard = {
  card: CardProps;
  count: number;
};

export type DrawResult = {
  card: CardProps;
  isNew: boolean;
  copies: number;
};
