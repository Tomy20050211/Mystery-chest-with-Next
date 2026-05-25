"use client";

import type { UnlockedCard } from "../types/collectionProps";

type CollectionPanelProps = {
  totalCards: number;
  totalCopies: number;
  unlockedCards: UnlockedCard[];
  unlockedCount: number;
  onReset: () => void;
};

export function CollectionPanel({
  totalCards,
  totalCopies,
  unlockedCards,
  unlockedCount,
  onReset,
}: CollectionPanelProps) {
  return (
    <aside className="w-full border border-[#c89b3c]/35 bg-[#010a13]/80 p-5 text-[#f0e6d2] shadow-[0_0_55px_rgba(0,0,0,0.45)] backdrop-blur-md lg:max-w-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#c89b3c]">
            Coleccion
          </p>
          <h2 className="mt-2 text-2xl font-black uppercase">
            {unlockedCount}/{totalCards}
          </h2>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="border border-[#c89b3c]/50 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#c89b3c] transition hover:bg-[#c89b3c] hover:text-[#010a13]"
        >
          Reiniciar
        </button>
      </div>

      <div className="mt-4 h-2 overflow-hidden border border-[#c89b3c]/35 bg-[#091428]">
        <div
          className="h-full bg-gradient-to-r from-[#0ac8b9] to-[#c89b3c] transition-all duration-500"
          style={{ width: `${(unlockedCount / totalCards) * 100}%` }}
        />
      </div>

      <p className="mt-3 text-sm uppercase tracking-[0.16em] text-[#a09b8c]">
        {totalCopies} aperturas registradas
      </p>

      <div className="mt-5 max-h-72 space-y-3 overflow-y-auto pr-2">
        {unlockedCards.length === 0 ? (
          <p className="text-sm text-[#a09b8c]">
            Todavia no has desbloqueado cartas.
          </p>
        ) : (
          unlockedCards.map(({ card, count }) => (
            <div
              key={card.id}
              className="flex items-center justify-between gap-3 border border-[#c89b3c]/20 bg-[#091428]/70 px-3 py-2"
            >
              <div>
                <p className="text-sm font-bold">{card.name}</p>
                <p className="text-xs uppercase tracking-[0.16em] text-[#c89b3c]">
                  {card.rarity}
                </p>
              </div>
              <span className="shrink-0 border border-[#c89b3c]/35 px-2 py-1 text-sm font-black">
                x{count}
              </span>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
