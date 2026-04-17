"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

async function assertAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");
}

export async function createCertificate(data: {
  name: string; issuer: string; date: string;
  imageUrl?: string; link?: string; order?: number;
}) {
  await assertAdmin();
  await prisma.certificate.create({ data });
  revalidatePath("/");
  revalidatePath("/admin/dashboard/certificates");
}

export async function updateCertificate(id: string, data: {
  name?: string; issuer?: string; date?: string;
  imageUrl?: string; link?: string; order?: number;
}) {
  await assertAdmin();
  await prisma.certificate.update({ where: { id }, data });
  revalidatePath("/");
  revalidatePath("/admin/dashboard/certificates");
}

export async function deleteCertificate(id: string) {
  await assertAdmin();
  await prisma.certificate.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/dashboard/certificates");
}
