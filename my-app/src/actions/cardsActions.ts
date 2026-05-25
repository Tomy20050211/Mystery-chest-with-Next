"use server";

import { arrayCards } from "../data/cards";
import { dropRates } from "../data/dropRates";

export async function getCards() {
  return arrayCards;
}

export async function getDropRates() {
  return dropRates;
}
