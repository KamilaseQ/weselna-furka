import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logowanie admina - Weselna Furka",
  robots: { index: false, follow: false },
};

const errors: Record<string, string> = {
  invalid: "Nieprawidłowe hasło.",
  limited: "Zbyt wiele prób. Spróbuj ponownie za kilka minut.",
  config: "Brakuje konfiguracji logowania po stronie serwera.",
};

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const error = searchParams.error ? errors[searchParams.error] : "";

  return (
    <section className="site-container grid min-h-[70vh] place-items-center py-16">
      <div className="w-full max-w-sm rounded-2xl border border-ink/10 bg-white p-7 shadow-card">
        <p className="eyebrow">Admin</p>
        <h1 className="mt-3 font-serif text-4xl text-ink">Logowanie</h1>
        <form action="/api/admin/login" method="post" className="mt-7 space-y-5">
          <div>
            <label className="field-label" htmlFor="password">
              Hasło
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="field"
              autoComplete="current-password"
              required
            />
          </div>
          {error && <p className="text-sm text-wine">{error}</p>}
          <button type="submit" className="btn-primary w-full">
            Zaloguj
          </button>
        </form>
      </div>
    </section>
  );
}
