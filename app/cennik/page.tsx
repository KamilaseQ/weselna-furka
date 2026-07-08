import { permanentRedirect } from "next/navigation";

export default function LegacyPricingRedirectPage() {
  permanentRedirect("/konfigurator");
}
