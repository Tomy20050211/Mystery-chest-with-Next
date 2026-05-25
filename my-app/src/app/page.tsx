import Image from "next/image";
import { arrayCards } from "../data/cards";
import { Card } from "../components/card";

export default function Home() {
  return (
    <div>
      {arrayCards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          name={card.name}
          rarity={card.rarity}
          urlImage={card.urlImage}
        />
      ))}
    </div>
  );
}
