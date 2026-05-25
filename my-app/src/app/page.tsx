import { getCards, getDropRates } from "../actions/cardsActions";
import { MysteryChestClient } from "../components/MysteryChestClient";

export default async function Home() {
  const [cards, dropRates] = await Promise.all([getCards(), getDropRates()]);

  return <MysteryChestClient cards={cards} dropRates={dropRates} />;
}
