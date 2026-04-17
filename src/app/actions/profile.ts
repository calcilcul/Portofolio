"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

async function assertAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");
}

export async function updateProfile(data: {
  name: string;
  professionalTitle: string;
  aboutText: string;
  cvLink?: string;
  aboutPhoto?: string;
  instagramLink?: string;
  githubLink?: string;
  linkedinLink?: string;
}) {
  await assertAdmin();
  const existing = await prisma.profile.findFirst();
  if (existing) {
    await prisma.profile.update({ where: { id: existing.id }, data });
  } else {
    await prisma.profile.create({ data });
  }
  revalidatePath("/");
  revalidatePath("/admin/dashboard/profile");
}
