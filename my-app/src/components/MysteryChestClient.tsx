"use client";

import type { CardProps } from "../types/cardProps";
import type { DropRateProps } from "../types/dropRateProps";
import { CardModal } from "./cardModal";
import { CollectionPanel } from "./CollectionPanel";
import { ConfettiBurst } from "./ConfettiBurst";
import { DropRatesPanel } from "./DropRatesPanel";
import { useMysteryChest } from "../hooks/useMysteryChest";

type MysteryChestClientProps = {
  cards: CardProps[];
  dropRates: DropRateProps[];
};

export function MysteryChestClient({
  cards,
  dropRates,
}: MysteryChestClientProps) {
  const chest = useMysteryChest(cards, dropRates);
  const confettiKey = chest.drawResult?.isNew
    ? `${chest.drawResult.card.id}-${chest.drawResult.copies}`
    : null;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05080f] p-6 text-white">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(5,8,15,0.35),rgba(5,8,15,0.92)),url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lux_7.jpg')] bg-cover bg-center opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,8,15,0.28)_42%,#05080f_82%)]" />

      <div className="relative mx-auto grid min-h-[calc(100vh-48px)] w-full max-w-6xl items-center gap-6 lg:grid-cols-[1fr_380px]">
        <section className="lol-home-panel flex w-full flex-col items-center border border-[#c89b3c]/45 bg-[#010a13]/80 px-8 py-10 text-center shadow-[0_0_70px_rgba(200,155,60,0.18)] backdrop-blur-md">
          <div className="mb-6 h-px w-28 bg-gradient-to-r from-transparent via-[#c89b3c] to-transparent" />

          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#c89b3c]">
            {cards.length} cartas disponibles
          </p>
          <h1 className="mt-4 text-5xl font-black uppercase text-[#f0e6d2] drop-shadow-[0_3px_16px_rgba(200,155,60,0.35)]">
            Cofre misterioso
          </h1>
          <p className="mt-4 text-sm uppercase tracking-[0.18em] text-[#a09b8c]">
            El destino elige tu skin
          </p>

          <button
            type="button"
            onClick={chest.openChest}
            className="lol-chest-button mt-10 border border-[#f0e6d2]/55 bg-gradient-to-b from-[#c89b3c] via-[#a16f1f] to-[#463714] px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-[#010a13] shadow-[0_0_28px_rgba(200,155,60,0.45)] transition duration-300 hover:-translate-y-1 hover:brightness-125 active:translate-y-0"
          >
            Abrir cofre
          </button>

          <DropRatesPanel dropRates={dropRates} />
          <div className="mt-8 h-px w-28 bg-gradient-to-r from-transparent via-[#c89b3c] to-transparent" />
        </section>

        <CollectionPanel
          totalCards={cards.length}
          totalCopies={chest.totalCopies}
          unlockedCards={chest.unlockedCards}
          unlockedCount={chest.unlockedCount}
          onReset={chest.resetCollection}
        />
      </div>

      <ConfettiBurst burstKey={confettiKey} />
      <CardModal
        drawResult={chest.drawResult}
        isOpen={chest.isOpen}
        onClose={chest.closeModal}
      />
    </main>
  );
}
