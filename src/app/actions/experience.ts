"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

async function assertAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");
}

export async function createExperience(data: {
  jobTitle: string; company: string; duration: string; description: string; order?: number;
}) {
  await assertAdmin();
  await prisma.experience.create({ data });
  revalidatePath("/");
  revalidatePath("/admin/dashboard/experience");
}

export async function updateExperience(id: string, data: {
  jobTitle?: string; company?: string; duration?: string; description?: string; order?: number;
}) {
  await assertAdmin();
  await prisma.experience.update({ where: { id }, data });
  revalidatePath("/");
  revalidatePath("/admin/dashboard/experience");
}

export async function deleteExperience(id: string) {
  await assertAdmin();
  await prisma.experience.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/dashboard/experience");
}
