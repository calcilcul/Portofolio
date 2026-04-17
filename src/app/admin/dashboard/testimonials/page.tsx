import { prisma } from "@/lib/prisma";
import TestimonialsManager from "./TestimonialsManager";

export const revalidate = 0;

export default async function TestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tighter text-[#121212]">Testimonials</h1>
        <p className="text-stone-500 font-medium mt-2">Manage the kind words from people you've worked with.</p>
      </div>
      <TestimonialsManager testimonials={testimonials} />
    </div>
  );
}
