import { Reveal } from "./Reveal";

const promises = [
  {
    title: "Punktualność ponad wszystko",
    desc: "Szofer podjeżdża zawsze przed czasem — żeby stres tego dnia nigdy nie dotyczył auta.",
  },
  {
    title: "Bez ukrytych opłat",
    desc: "Cena z podsumowania jest wiążąca. Żadnych dopłat i niespodzianek na miejscu.",
  },
  {
    title: "Kierowca w cenie",
    desc: "Rozumie rangę tego dnia i jest do niego perfekcyjnie przygotowany — dyskretny, w garniturze, ze znajomością trasy.",
  },
  {
    title: "Auto w nienagannym stanie",
    desc: "Zawsze umyte, wypielęgnowane i lśniące. W środku czekają na Was woda i chusteczki — w cenie.",
  },
  {
    title: "Jedna, bliska osoba do kontaktu",
    desc: "Kontaktuje się z Wami bezpośrednio kierowca, który będzie z Wami w dniu wesela — nie anonimowa infolinia.",
  },
];

/** "Nasze obietnice" as a numbered editorial ledger. */
export function TrustBadges() {
  return (
    <div className="mx-auto max-w-3xl">
      {promises.map((p, i) => (
        <Reveal key={p.title} delay={i * 60}>
          <div className="group grid grid-cols-[56px_1fr] items-baseline gap-4 border-t border-ink/10 py-6 sm:grid-cols-[72px_1fr_1.1fr] sm:gap-6">
            <span className="font-serif text-2xl italic leading-none text-gold/60 transition-colors duration-300 group-hover:text-wine">
              0{i + 1}
            </span>
            <h3 className="font-serif text-xl leading-snug text-ink sm:text-2xl">
              {p.title}
            </h3>
            <p className="col-start-2 text-sm leading-relaxed text-ink-muted sm:col-start-3">
              {p.desc}
            </p>
          </div>
        </Reveal>
      ))}
      <div className="border-t border-ink/10" />
    </div>
  );
}
