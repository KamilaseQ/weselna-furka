import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { PathChoice } from "@/components/PathChoice";
import { LockIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Zarezerwuj — wybierz ścieżkę | Weselna Furka",
};

export default function StartPage() {
  return (
    <div className="studio-floor min-h-[70vh]">
      <section className="site-container py-20">
        <div className="animate-fadeUp opacity-0" style={{ animationDelay: "80ms" }}>
          <SectionHeading
            eyebrow="Rezerwacja"
            title="Jak chcecie zarezerwować auto?"
            subtitle="Gotowy pakiet albo konfiguracja pod Wasz dzień."
          />
        </div>
        <div
          className="mx-auto mt-12 max-w-4xl animate-fadeUp opacity-0"
          style={{ animationDelay: "220ms" }}
        >
          <PathChoice />
        </div>
        <p
          className="mt-8 flex animate-fadeUp items-center justify-center gap-2 text-sm text-ink-faint opacity-0"
          style={{ animationDelay: "360ms" }}
        >
          <LockIcon className="h-4 w-4" />
          Płatność dopiero po potwierdzeniu terminu.
        </p>
      </section>
    </div>
  );
}
