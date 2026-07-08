const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
const isLocalSiteUrl =
  configuredSiteUrl && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(configuredSiteUrl);

export const SITE_URL =
  configuredSiteUrl && !(process.env.NODE_ENV === "production" && isLocalSiteUrl)
    ? configuredSiteUrl
    : "https://www.weselnafurka.pl";

export const CONTACT_EMAIL = "weselnafurka@gmail.com";
export const OWNER_EMAIL = process.env.OWNER_EMAIL || CONTACT_EMAIL;
export const EMAIL_FROM =
  process.env.EMAIL_FROM || `Weselna Furka <${CONTACT_EMAIL}>`;

export const CONTACT_PHONE = "+48 501 747 490";
export const CONTACT_PHONE_HREF = "tel:+48501747490";
export const SECONDARY_PHONE = "+48 728 561 373";
export const SECONDARY_PHONE_HREF = "tel:+48728561373";

export const SERVICE_AREA = "Warszawa i okolice";
