import type { DropRateProps } from "../types/dropRateProps";

type DropRatesPanelProps = {
  dropRates: DropRateProps[];
};

export function DropRatesPanel({ dropRates }: DropRatesPanelProps) {
  return (
    <div className="mt-8 grid w-full grid-cols-2 gap-2 text-left sm:grid-cols-5">
      {dropRates.map((dropRate) => (
        <div
          key={dropRate.rarity}
          className="border border-[#c89b3c]/25 bg-[#091428]/70 px-3 py-2"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#a09b8c]">
            {dropRate.rarity}
          </p>
          <p className="mt-1 text-lg font-black text-[#c89b3c]">
            {dropRate.chance}%
          </p>
        </div>
      ))}
    </div>
  );
}
