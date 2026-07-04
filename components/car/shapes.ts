import type { CarShape } from "@/data/types";

export interface ShapeDef {
  /** outer silhouette path (faces LEFT = front on the left) */
  body: string;
  /** greenhouse / glass polygon */
  glass: string;
  /** B-pillar / divider line inside glass */
  pillar: string;
  /** belt line / door cut */
  door: string;
  wheels: { front: number; rear: number; cy: number; r: number };
  /** front bumper x (left) for lights/grille */
  frontX: number;
  rearX: number;
  /** hood center for floral decoration */
  hood: { x: number; y: number };
  /** roof front point for ribbons */
  roofFront: { x: number; y: number };
}

export const VIEWBOX = { w: 620, h: 240 };

export const shapes: Record<CarShape, ShapeDef> = {
  coupe: {
    body:
      "M24,170 C24,150 36,143 62,141 L150,135 C180,104 214,84 268,80 L344,80 C398,82 426,96 452,124 L560,142 C588,146 598,154 598,170 L598,190 L24,190 Z",
    glass:
      "M176,126 C198,104 224,92 264,90 L334,90 C378,92 404,103 424,124 Z",
    pillar: "M300,90 L300,124",
    door: "M150,135 L452,135",
    wheels: { front: 150, rear: 470, cy: 190, r: 46 },
    frontX: 24,
    rearX: 598,
    hood: { x: 96, y: 136 },
    roofFront: { x: 250, y: 86 },
  },
  sedan: {
    body:
      "M22,172 C22,151 34,144 60,142 L138,136 C166,108 196,90 250,86 L372,86 C420,88 452,98 478,124 L562,140 C590,146 600,154 600,172 L600,192 L22,192 Z",
    glass:
      "M188,128 C210,106 236,94 276,92 L360,92 C402,94 432,104 452,126 Z",
    pillar: "M318,92 L318,126",
    door: "M140,136 L478,136",
    wheels: { front: 150, rear: 482, cy: 192, r: 46 },
    frontX: 22,
    rearX: 600,
    hood: { x: 92, y: 138 },
    roofFront: { x: 262, y: 88 },
  },
  limo: {
    body:
      "M20,174 C20,152 32,145 58,143 L150,138 C176,112 206,96 262,92 L388,92 C438,94 472,104 498,130 L568,142 C592,148 602,156 602,174 L602,194 L20,194 Z",
    glass:
      "M198,130 C218,110 244,100 288,98 L376,98 C418,100 450,108 470,130 Z",
    pillar: "M334,98 L334,130",
    door: "M150,138 L498,138",
    wheels: { front: 156, rear: 496, cy: 194, r: 47 },
    frontX: 20,
    rearX: 602,
    hood: { x: 96, y: 140 },
    roofFront: { x: 274, y: 94 },
  },
};
