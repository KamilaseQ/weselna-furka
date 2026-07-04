import Link from "next/link";

export default function NotFound() {
  return (
    <div className="studio-floor flex min-h-[70vh] items-center">
      <div className="site-container text-center">
        <p className="eyebrow">Błąd 404</p>
        <h1 className="mt-3 text-5xl text-ink sm:text-6xl">
          Tej strony tu nie ma.
        </h1>
        <p className="mt-4 text-ink-muted">
          Może zjechała na wesele. Wróćmy na właściwą trasę.
        </p>
        <Link href="/" className="btn-primary mt-8">
          Strona główna
        </Link>
      </div>
    </div>
  );
}
