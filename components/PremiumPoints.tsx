import { Reveal } from "./Reveal";

/**
 * Quiet signals of a premium standard — the details that justify the tier
 * without ever naming price. Editorial numbered cards, warm palette.
 */
const points = [
  {
    title: "Profesjonalny detailing przed każdym ślubem",
    desc: "Auto za każdym razem przechodzi pełny, profesjonalny detailing — lakier, felgi i wnętrze wyglądają jak prosto z salonu.",
  },
  {
    title: "Świeże kwiaty z warszawskich kwiaciarni",
    desc: "Dekoracje komponujemy zawsze z żywych kwiatów, odbieranych tego samego dnia od zaufanych warszawskich florystów.",
  },
  {
    title: "Jeden ślub, jedno auto — tylko dla Was",
    desc: "W dniu wesela auto i kierowca są zarezerwowani wyłącznie dla Was. Nigdy nie łączymy dwóch uroczystości jednego dnia.",
  },
  {
    title: "Kierowca w nienagannym stroju",
    desc: "Szofer przyjeżdża perfekcyjnie zadbany, w garniturze dopasowanym do rangi dnia — dyskretny i uważny na każdy szczegół.",
  },
  {
    title: "Trasa policzona i dopięta z wyprzedzeniem",
    desc: "Waszą trasę analizujemy i wyliczamy wcześniej — z zapasem czasu na każdy dojazd, żeby w dniu ślubu nic nikogo nie zaskoczyło.",
  },
  {
    title: "Drobne detale, o których nie musicie pamiętać",
    desc: "Schłodzona woda, chusteczki, ślubna tablica rejestracyjna — dopięte tak, żebyście myśleli wyłącznie o sobie.",
  },
];

export function PremiumPoints() {
  return (
    <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {points.map((p, i) => (
        <Reveal key={p.title} delay={(i % 3) * 100}>
          <div className="border-t border-ink/10 pt-5">
            <p className="font-serif text-3xl italic leading-none text-gold/60">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-3 font-serif text-xl leading-snug text-ink">
              {p.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              {p.desc}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
