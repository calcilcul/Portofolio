"use client";

import { FooterSection } from "@/components/ui/footer-section";

interface FooterProps {
  instagramLink?: string | null;
  githubLink?: string | null;
  linkedinLink?: string | null;
  skills?: { id: string; name: string; category?: string | null }[];
}

export default function Footer({ instagramLink, githubLink, linkedinLink }: FooterProps) {
  return (
    <div className="bg-[#1b1e16] pt-10">
      <FooterSection 
        instagramLink={instagramLink} 
        githubLink={githubLink} 
        linkedinLink={linkedinLink} 
      />
    </div>
  );
}
