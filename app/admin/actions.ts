"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";
import {
  addCalendarBlock,
  deleteCalendarBlock,
  updateReservationAdminFields,
} from "@/lib/reservation-store";
import { isReservationStatus } from "@/lib/reservation-schema";

export async function updateReservationAction(formData: FormData) {
  requireAdmin();

  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "");
  const adminNotes = String(formData.get("adminNotes") || "").trim();

  if (!id || !isReservationStatus(status)) return;

  await updateReservationAdminFields({ id, status, adminNotes });
  revalidatePath("/admin");
}

export async function addCalendarBlockAction(formData: FormData) {
  requireAdmin();

  const eventDate = String(formData.get("eventDate") || "");
  const carSlugRaw = String(formData.get("carSlug") || "");
  const reason = String(formData.get("reason") || "").trim();

  if (!/^\d{4}-\d{2}-\d{2}$/.test(eventDate) || reason.length < 2) return;

  await addCalendarBlock({
    eventDate,
    carSlug: carSlugRaw === "all" ? undefined : carSlugRaw,
    reason,
  });
  revalidatePath("/admin");
}

export async function deleteCalendarBlockAction(formData: FormData) {
  requireAdmin();

  const id = String(formData.get("id") || "");
  if (!id) return;

  await deleteCalendarBlock(id);
  revalidatePath("/admin");
}
