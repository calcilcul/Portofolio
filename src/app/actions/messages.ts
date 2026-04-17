"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

async function assertAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");
}

export async function markMessageRead(id: string) {
  await assertAdmin();
  await prisma.message.update({ where: { id }, data: { isRead: true } });
  revalidatePath("/admin/dashboard/inbox");
}

export async function deleteMessage(id: string) {
  await assertAdmin();
  await prisma.message.delete({ where: { id } });
  revalidatePath("/admin/dashboard/inbox");
}

export async function bulkMarkRead(ids: string[]) {
  await assertAdmin();
  await prisma.message.updateMany({ where: { id: { in: ids } }, data: { isRead: true } });
  revalidatePath("/admin/dashboard/inbox");
}

export async function bulkDelete(ids: string[]) {
  await assertAdmin();
  await prisma.message.deleteMany({ where: { id: { in: ids } } });
  revalidatePath("/admin/dashboard/inbox");
}
