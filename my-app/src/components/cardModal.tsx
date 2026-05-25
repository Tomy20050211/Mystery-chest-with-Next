"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import type { DrawResult } from "../types/collectionProps";

type CardModalProps = {
  drawResult: DrawResult | null;
  isOpen: boolean;
  onClose: () => void;
};

export function CardModal({ drawResult, isOpen, onClose }: CardModalProps) {
  const card = drawResult?.card;

  return (
    <AnimatePresence>
      {isOpen && drawResult && card && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#010a13]/85 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-4xl border border-[#c89b3c]/60 bg-gradient-to-b from-[#091428] to-[#010a13] p-5 text-[#f0e6d2] shadow-[0_0_90px_rgba(200,155,60,0.3)]"
            initial={{ opacity: 0, y: 28, scale: 0.86, rotateX: -12 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 18, scale: 0.9, rotateX: 8 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#c89b3c]">
                  {card.rarity}
                </p>
                <h2 className="mt-2 text-3xl font-black uppercase leading-tight">
                  {card.name}
                </h2>
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#a09b8c]">
                  {drawResult.isNew
                    ? "Nueva carta desbloqueada"
                    : `Copia numero ${drawResult.copies}`}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="border border-[#c89b3c]/55 px-3 py-1 text-sm font-bold text-[#c89b3c] transition duration-200 hover:bg-[#c89b3c] hover:text-[#010a13]"
                aria-label="Cerrar modal"
              >
                X
              </button>
            </div>

            <div className="relative mt-5 aspect-[1215/717] w-full overflow-hidden border border-[#c89b3c]/35 bg-[#010a13]">
              <Image
                src={card.urlImage}
                alt={card.name}
                fill
                className="object-contain transition duration-700 hover:scale-[1.02]"
              />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#010a13] to-transparent" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
