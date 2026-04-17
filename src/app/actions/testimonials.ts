"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

async function assertAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");
}

export async function createTestimonial(data: {
  text: string; author: string; role: string; order?: number;
}) {
  await assertAdmin();
  await prisma.testimonial.create({ data });
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/admin/dashboard/testimonials");
}

export async function updateTestimonial(id: string, data: {
  text?: string; author?: string; role?: string; order?: number;
}) {
  await assertAdmin();
  await prisma.testimonial.update({ where: { id }, data });
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/admin/dashboard/testimonials");
}

export async function deleteTestimonial(id: string) {
  await assertAdmin();
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/admin/dashboard/testimonials");
}
