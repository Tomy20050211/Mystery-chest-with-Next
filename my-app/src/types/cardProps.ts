import type { RarityProps } from "./rarityProps";

//Definir propiedades de mis cartas con una interfaz

export interface CardProps {
    id: number;
    name: string;
    rarity: RarityProps;
    urlImage: string;
};