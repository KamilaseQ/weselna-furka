import { permanentRedirect } from "next/navigation";

export default function LegacyOfferRedirectPage() {
  permanentRedirect("/konfigurator");
}
