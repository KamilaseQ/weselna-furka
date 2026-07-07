import { redirect } from "next/navigation";

// The intermediate "package vs configuration" choice is temporarily removed —
// every booking entry point now goes straight to the configurator.
export default function StartPage() {
  redirect("/konfigurator");
}
