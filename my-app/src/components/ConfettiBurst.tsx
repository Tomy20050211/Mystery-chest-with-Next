"use client";

import { AnimatePresence, motion } from "framer-motion";

const confettiPieces = Array.from({ length: 28 }, (_, index) => ({
  id: index,
  left: 12 + ((index * 17) % 76),
  delay: (index % 7) * 0.045,
  rotate: ((index * 29) % 140) - 70,
  color: ["#c89b3c", "#f0e6d2", "#0ac8b9", "#cdfafa"][index % 4],
}));

type ConfettiBurstProps = {
  burstKey: string | null;
};

export function ConfettiBurst({ burstKey }: ConfettiBurstProps) {
  return (
    <AnimatePresence>
      {burstKey && (
        <div
          key={burstKey}
          className="pointer-events-none fixed inset-0 z-[60] overflow-hidden"
        >
          {confettiPieces.map((piece) => (
            <motion.span
              key={piece.id}
              className="absolute top-[-16px] h-3 w-2"
              style={{
                left: `${piece.left}%`,
                backgroundColor: piece.color,
              }}
              initial={{ opacity: 0, y: 0, rotate: 0, scale: 0.6 }}
              animate={{
                opacity: [0, 1, 1, 0],
                y: ["0vh", "35vh", "82vh"],
                rotate: [0, piece.rotate, piece.rotate * 2],
                scale: [0.6, 1, 0.9],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.6, delay: piece.delay, ease: "easeOut" }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
