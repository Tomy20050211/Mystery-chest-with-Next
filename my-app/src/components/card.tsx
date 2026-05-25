import { CardProps } from "../types/cardProps";

export function Card({ id, name, rarity, urlImage }: CardProps) {
    return (
    
            <div key={id}>
                <h1>
                    {name}
                </h1>
                <p>
                    {rarity}
                </p>
                <img src={urlImage} alt={name} />
            </div>
        
    )
}