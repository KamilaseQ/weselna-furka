import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export const HeartIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 20s-7-4.6-9.3-9C1.3 8 2.8 4.8 6 4.8c2 0 3.2 1.3 4 2.6.8-1.3 2-2.6 4-2.6 3.2 0 4.7 3.2 3.3 6.2C19 15.4 12 20 12 20Z" />
  </svg>
);

export const ArrowRight = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ChevronDown = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const CalendarIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="4.5" width="18" height="16" rx="2" />
    <path d="M3 9h18M8 3v3M16 3v3" />
  </svg>
);

export const ClockIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

export const DriverIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 20v-1a7 7 0 0 1 14 0v1" />
    <circle cx="12" cy="8" r="3.2" />
    <path d="M8.5 6.5 12 4l3.5 2.5" />
  </svg>
);

export const TagIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 12.5V5a1 1 0 0 1 1-1h7.5L20 11.5a1.4 1.4 0 0 1 0 2L13.5 20a1.4 1.4 0 0 1-2 0L4 12.5Z" />
    <circle cx="8.5" cy="8.5" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

export const LockIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
);

export const FlowerIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="2.2" />
    <path d="M12 9.8c0-2.5-1-3.8-2.5-3.8S7.3 7.5 9.8 10M12 14.2c0 2.5 1 3.8 2.5 3.8s2.2-1.5-.3-4M14.2 12c2.5 0 3.8-1 3.8-2.5S16.5 7.3 14 9.8M9.8 12c-2.5 0-3.8 1-3.8 2.5S7.5 16.7 10 14.2" />
  </svg>
);

export const SparkleIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 4c.5 3.5 1.5 4.5 5 5-3.5.5-4.5 1.5-5 5-.5-3.5-1.5-4.5-5-5 3.5-.5 4.5-1.5 5-5Z" />
    <path d="M18.5 13.5c.2 1.4.6 1.8 2 2-1.4.2-1.8.6-2 2-.2-1.4-.6-1.8-2-2 1.4-.2 1.8-.6 2-2Z" />
  </svg>
);

export const PhoneIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6 3.5h3l1.3 4-2 1.3a11 11 0 0 0 5 5l1.3-2 4 1.3v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4 5.7 2 2 0 0 1 6 3.5Z" />
  </svg>
);

export const MailIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 6.5 8.5 6 8.5-6" />
  </svg>
);

export const PinIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

export const RouteIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 8h11a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6h11" />
    <path d="M17 5l3 3-3 3" />
  </svg>
);

export const CheckIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </svg>
);

export const CarIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 13.5 4.8 8A2 2 0 0 1 6.7 6.7h10.6A2 2 0 0 1 19.2 8L21 13.5" />
    <path d="M3 13.5h18V17a1 1 0 0 1-1 1h-2v-2H6v2H4a1 1 0 0 1-1-1v-3.5Z" />
    <circle cx="7" cy="15.5" r="0.6" fill="currentColor" stroke="none" />
    <circle cx="17" cy="15.5" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);

export const RotateIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 12a8 8 0 0 1 13.7-5.6L20 8M20 4v4h-4" />
    <path d="M20 12a8 8 0 0 1-13.7 5.6L4 16M4 20v-4h4" />
  </svg>
);

export const ShareIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="6" cy="12" r="2.2" />
    <circle cx="17" cy="6" r="2.2" />
    <circle cx="17" cy="18" r="2.2" />
    <path d="m8 11 7-4M8 13l7 4" />
  </svg>
);

export const StarIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="m12 3.5 2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4 5.7-.8L12 3.5Z" />
  </svg>
);

export const MenuIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const CloseIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const PlusIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const SearchIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4.5 4.5" />
  </svg>
);

export const RingsIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="9" cy="14" r="5" />
    <circle cx="15" cy="14" r="5" />
    <path d="M9 9V5l1.5-1.5M15 9V5l-1.5-1.5" />
  </svg>
);

export const cardIcons: Record<string, (p: IconProps) => JSX.Element> = {
  car: CarIcon,
  cars: CarIcon,
  clock: ClockIcon,
  driver: DriverIcon,
  ribbon: TagIcon,
  flower: FlowerIcon,
  star: SparkleIcon,
};
