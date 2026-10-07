"use client";

import HalideTopo from "@/components/ui/halide-topo-hero";

interface HeroProps {
  name: string;
  professionalTitle: string;
}

// HalideTopo is a full-page hero — it renders its own layout internally.
// Props are kept for API compatibility but the design is opinionated.
export default function Hero({ name, professionalTitle }: HeroProps) {
  return <HalideTopo />;
}
