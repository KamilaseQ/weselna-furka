export interface GeneratedImage {
  src: string;
  alt: string;
  objectPosition?: string;
}

export interface CarImageSet {
  cover: GeneratedImage;
  gallery: GeneratedImage[];
}

export const carImageSets = {
  "mercedes-s-klasa": {
    cover: {
      src: "/images/generated/mercedes-s-klasa-exterior.png",
      alt: "Biały Mercedes-Benz S-Klasa do ślubu w Warszawie",
      objectPosition: "center",
    },
    gallery: [
      {
        src: "/images/generated/mercedes-s-klasa-exterior.png",
        alt: "Mercedes-Benz S-Klasa do ślubu - widok z zewnątrz",
        objectPosition: "center",
      },
      {
        src: "/images/generated/mercedes-s-klasa-interior.png",
        alt: "Wnętrze Mercedes-Benz S-Klasa dla pary młodej",
        objectPosition: "center",
      },
      {
        src: "/images/generated/mercedes-s-klasa-detail.png",
        alt: "Detale Mercedes-Benz S-Klasa przygotowanego do ślubu",
        objectPosition: "center",
      },
    ],
  },
  "maserati-ghibli": {
    cover: {
      src: "/images/generated/maserati-ghibli-exterior.png",
      alt: "Maserati Ghibli do ślubu w Warszawie",
      objectPosition: "center",
    },
    gallery: [
      {
        src: "/images/generated/maserati-ghibli-exterior.png",
        alt: "Maserati Ghibli do ślubu - widok z zewnątrz",
        objectPosition: "center",
      },
      {
        src: "/images/generated/maserati-ghibli-interior.png",
        alt: "Wnętrze Maserati Ghibli na przejazd ślubny",
        objectPosition: "center",
      },
      {
        src: "/images/generated/maserati-ghibli-detail.png",
        alt: "Detale Maserati Ghibli przygotowanego na wesele",
        objectPosition: "center",
      },
    ],
  },
  "bmw-seria-4": {
    cover: {
      src: "/images/generated/bmw-seria-4-exterior.png",
      alt: "Białe BMW Seria 4 Coupe do ślubu",
      objectPosition: "center",
    },
    gallery: [
      {
        src: "/images/generated/bmw-seria-4-exterior.png",
        alt: "BMW Seria 4 Coupe do ślubu - widok z zewnątrz",
        objectPosition: "center",
      },
      {
        src: "/images/generated/bmw-seria-4-interior.png",
        alt: "Wnętrze BMW Seria 4 Coupe",
        objectPosition: "center",
      },
      {
        src: "/images/generated/bmw-seria-4-detail.png",
        alt: "Detale BMW Seria 4 Coupe",
        objectPosition: "center",
      },
    ],
  },
} satisfies Record<string, CarImageSet>;

export function getCarImages(slug: string): CarImageSet {
  return carImageSets[slug as keyof typeof carImageSets] ?? carImageSets["mercedes-s-klasa"];
}

export const pathChoiceImages = {
  configurator: carImageSets["maserati-ghibli"].cover,
  fleet: {
    src: "/images/generated/premium-two-cars-wedding.png",
    alt: "Mercedes-Benz S-Klasa i Maserati Ghibli przygotowane do ślubu",
    objectPosition: "center",
  },
} satisfies Record<string, GeneratedImage>;

export const aboutImage: GeneratedImage = {
  src: "/images/generated/about-chauffeur-detailing.png",
  alt: "Kierowca przygotowuje luksusowe auto do ślubu",
  objectPosition: "center",
};

export const contactImage: GeneratedImage = {
  src: "/images/generated/contact-premium-garage.png",
  alt: "Garaż z luksusowymi samochodami do ślubu",
  objectPosition: "center",
};
