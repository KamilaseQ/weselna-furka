import { Reveal } from "./Reveal";

const promises = [
  {
    title: "Punktualność albo zwrot godziny",
    desc: "Podstawienie z buforem czasu, trasa zaplanowana dzień wcześniej.",
  },
  {
    title: "Cena końcowa znana przy rezerwacji",
    desc: "Kwota z podsumowania jest wiążąca. Bez dopłat na miejscu.",
  },
  {
    title: "Kierowca w cenie",
    desc: "W garniturze, dyskretny, zna trasę przed wyjazdem.",
  },
  {
    title: "Auto przygotowane przed trasą",
    desc: "Mycie i detailing, w środku woda i chusteczki.",
  },
  {
    title: "Jedna osoba do kontaktu",
    desc: "Od pierwszej wiadomości do dnia ślubu.",
  },
  {
    title: "Dyskrecja",
    desc: "Bez zdjęć i nagrań z Waszego dnia.",
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
