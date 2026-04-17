"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

async function assertAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");
}

export async function createSkill(data: { name: string; category?: string; description?: string; link?: string; imageUrl?: string; order?: number }) {
  await assertAdmin();
  await prisma.skill.create({ data });
  revalidatePath("/");
  revalidatePath("/skills");
  revalidatePath("/admin/dashboard/skills");
}

export async function updateSkill(id: string, data: { name?: string; category?: string; description?: string; link?: string; imageUrl?: string; order?: number }) {
  await assertAdmin();
  await prisma.skill.update({ where: { id }, data });
  revalidatePath("/");
  revalidatePath("/skills");
  revalidatePath("/admin/dashboard/skills");
}

export async function deleteSkill(id: string) {
  await assertAdmin();
  await prisma.skill.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/skills");
  revalidatePath("/admin/dashboard/skills");
}
