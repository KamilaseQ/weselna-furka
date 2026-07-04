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
      alt: "White Mercedes-Benz S-Class in a bright premium showroom",
      objectPosition: "center",
    },
    gallery: [
      {
        src: "/images/generated/mercedes-s-klasa-exterior.png",
        alt: "White Mercedes-Benz S-Class exterior, front three-quarter view",
        objectPosition: "center",
      },
      {
        src: "/images/generated/mercedes-s-klasa-interior.png",
        alt: "Mercedes-Benz S-Class rear passenger cabin with cream leather",
        objectPosition: "center",
      },
      {
        src: "/images/generated/mercedes-s-klasa-detail.png",
        alt: "Mercedes-Benz S-Class grille, headlight and front wheel detail",
        objectPosition: "center",
      },
    ],
  },
  "maserati-ghibli": {
    cover: {
      src: "/images/generated/maserati-ghibli-exterior.png",
      alt: "Black Maserati Ghibli in a bright premium showroom",
      objectPosition: "center",
    },
    gallery: [
      {
        src: "/images/generated/maserati-ghibli-exterior.png",
        alt: "Black Maserati Ghibli exterior, front three-quarter view",
        objectPosition: "center",
      },
      {
        src: "/images/generated/maserati-ghibli-interior.png",
        alt: "Maserati Ghibli cabin with tan leather interior",
        objectPosition: "center",
      },
      {
        src: "/images/generated/maserati-ghibli-detail.png",
        alt: "Maserati Ghibli grille, headlight, wheel and side vent detail",
        objectPosition: "center",
      },
    ],
  },
  "bmw-seria-4": {
    cover: {
      src: "/images/generated/bmw-seria-4-exterior.png",
      alt: "White BMW 4 Series Coupe in a bright premium showroom",
      objectPosition: "center",
    },
    gallery: [
      {
        src: "/images/generated/bmw-seria-4-exterior.png",
        alt: "White BMW 4 Series Coupe exterior, front three-quarter view",
        objectPosition: "center",
      },
      {
        src: "/images/generated/bmw-seria-4-interior.png",
        alt: "BMW 4 Series Coupe black leather cockpit",
        objectPosition: "center",
      },
      {
        src: "/images/generated/bmw-seria-4-detail.png",
        alt: "BMW 4 Series Coupe grille, headlight and front wheel detail",
        objectPosition: "center",
      },
    ],
  },
} satisfies Record<string, CarImageSet>;

export function getCarImages(slug: string): CarImageSet {
  return carImageSets[slug as keyof typeof carImageSets] ?? carImageSets["mercedes-s-klasa"];
}

export const packageImages = {
  basic: carImageSets["mercedes-s-klasa"].gallery[2],
  standard: carImageSets["maserati-ghibli"].cover,
  premium: {
    src: "/images/generated/premium-two-cars-wedding.png",
    alt: "White Mercedes-Benz S-Class and black Maserati Ghibli prepared for a wedding entrance",
    objectPosition: "center",
  },
} satisfies Record<string, GeneratedImage>;

export const pathChoiceImages = {
  packages: packageImages.premium,
  configurator: carImageSets["maserati-ghibli"].cover,
} satisfies Record<string, GeneratedImage>;

export const aboutImage: GeneratedImage = {
  src: "/images/generated/about-chauffeur-detailing.png",
  alt: "Chauffeur in a black suit detailing a white luxury wedding car",
  objectPosition: "center",
};

export const contactImage: GeneratedImage = {
  src: "/images/generated/contact-premium-garage.png",
  alt: "Premium car rental garage with white and black luxury cars",
  objectPosition: "center",
};
