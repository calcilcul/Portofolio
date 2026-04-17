"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

async function assertAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");
}

export async function createEducation(data: {
  degree: string; institution: string; duration: string; description?: string; order?: number;
}) {
  await assertAdmin();
  await prisma.education.create({ data });
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/admin/dashboard/education");
}

export async function updateEducation(id: string, data: {
  degree?: string; institution?: string; duration?: string; description?: string; order?: number;
}) {
  await assertAdmin();
  await prisma.education.update({ where: { id }, data });
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/admin/dashboard/education");
}

export async function deleteEducation(id: string) {
  await assertAdmin();
  await prisma.education.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/admin/dashboard/education");
}
