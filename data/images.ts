import blurData from "./blur-placeholders.json";

export interface SiteImage {
  src: string;
  alt: string;
  objectPosition?: string;
  /** short caption shown on gallery thumbnails, e.g. "Zewnętrze" */
  label?: string;
  /** tiny base64 preview shown while the full image loads */
  blurDataURL?: string;
}

export interface CarImageSet {
  cover: SiteImage;
  gallery: SiteImage[];
}

const blur = blurData as Record<string, string>;

/** build a SiteImage and auto-attach its blur placeholder by src */
function img(
  src: string,
  alt: string,
  objectPosition?: string,
  label?: string
): SiteImage {
  return { src, alt, objectPosition, label, blurDataURL: blur[src] };
}

export const carImageSets = {
  "mercedes-s-klasa": {
    cover: img(
      "/images/cars/mercedes-s-klasa-cover.jpg",
      "Biały Mercedes-Benz S-Klasa do ślubu w Warszawie",
      "58% center"
    ),
    gallery: [
      img(
        "/images/cars/mercedes-s-klasa-cover.jpg",
        "Mercedes-Benz S-Klasa do ślubu - widok z zewnątrz",
        "58% center",
        "Z boku"
      ),
      img(
        "/images/cars/mercedes-s-klasa-front.jpg",
        "Mercedes-Benz S-Klasa do ślubu przed salą weselną",
        "center",
        "Z przodu"
      ),
      img(
        "/images/cars/mercedes-s-klasa-venue.jpg",
        "Biały Mercedes-Benz S-Klasa gotowy na przejazd ślubny",
        "center",
        "Przy sali"
      ),
      img(
        "/images/cars/mercedes-s-klasa-interior.jpg",
        "Wnętrze Mercedes-Benz S-Klasa dla pary młodej",
        "54% center",
        "Wnętrze"
      ),
      img(
        "/images/cars/mercedes-s-klasa-detail.jpg",
        "Detale Mercedes-Benz S-Klasa przygotowanego do ślubu",
        "center",
        "Detal"
      ),
    ],
  },
  "maserati-ghibli": {
    cover: img(
      "/images/cars/maserati-ghibli-cover.jpg",
      "Maserati Ghibli do ślubu w Warszawie",
      "60% center"
    ),
    gallery: [
      img(
        "/images/cars/maserati-ghibli-cover.jpg",
        "Maserati Ghibli do ślubu - widok z zewnątrz",
        "60% center",
        "Z przodu"
      ),
      img(
        "/images/cars/maserati-ghibli-rear.jpg",
        "Maserati Ghibli do ślubu - widok z tyłu",
        "center",
        "Z tyłu"
      ),
      img(
        "/images/cars/maserati-ghibli-detail.jpg",
        "Detale Maserati Ghibli przygotowanego na wesele",
        "58% center",
        "Wnętrze"
      ),
    ],
  },
} satisfies Record<string, CarImageSet>;

export function getCarImages(slug: string): CarImageSet {
  return carImageSets[slug as keyof typeof carImageSets] ?? carImageSets["mercedes-s-klasa"];
}

export const pathChoiceImages = {
  configurator: carImageSets["maserati-ghibli"].cover,
  fleet: img(
    "/images/site/fleet-exterior.jpg",
    "Mercedes-Benz S-Klasa z floty aut do ślubu",
    "55% center"
  ),
} satisfies Record<string, SiteImage>;

export const aboutImage: SiteImage = img(
  "/images/site/about-mercedes-venue.jpg",
  "Mercedes-Benz S-Klasa przygotowany do ślubu przed eleganckim obiektem",
  "center"
);

export const contactImage: SiteImage = img(
  "/images/site/contact-mercedes-venue.jpg",
  "Biały Mercedes-Benz S-Klasa do ślubu przed salą weselną",
  "center"
);
