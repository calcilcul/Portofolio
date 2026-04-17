"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

async function assertAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");
}

export async function createProject(data: {
  title: string; description: string; imageUrl?: string;
  demoLink?: string; githubLink?: string; sourceLink?: string; category?: string; order?: number;
}) {
  await assertAdmin();
  await prisma.project.create({ data });
  revalidatePath("/");
  revalidatePath("/admin/dashboard/projects");
}

export async function updateProject(id: string, data: {
  title?: string; description?: string; imageUrl?: string;
  demoLink?: string; githubLink?: string; sourceLink?: string; category?: string; order?: number;
}) {
  await assertAdmin();
  await prisma.project.update({ where: { id }, data });
  revalidatePath("/");
  revalidatePath("/admin/dashboard/projects");
}

export async function deleteProject(id: string) {
  await assertAdmin();
  await prisma.project.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/dashboard/projects");
}
