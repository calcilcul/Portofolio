"use client";

import TeamMemberCard from "@/components/ui/team-member-card";

interface AboutProps { 
  aboutText: string; 
  cvLink?: string | null; 
  aboutPhoto?: string | null; 
  name?: string;
  title?: string;
}

export default function About({ aboutText, cvLink, aboutPhoto, name = "Faisal Ramdhani", title = "Digital Craftsman" }: AboutProps) {
  // Use a default image if none provided
  const fallbackImage = "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?q=80&w=2574&auto=format&fit=crop";

  const nameParts = name.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ") || " ";

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 relative z-10">
        <TeamMemberCard
          position="left"
          jobPosition={title}
          firstName={firstName}
          lastName={lastName}
          imageUrl={aboutPhoto || fallbackImage}
          description={
            aboutText || 
            "I'm deeply passionate about bridging the gap between design and engineering. My focus is on writing clean, elegant code that powers beautiful, highly-performant user interfaces."
          }
          cvLink={cvLink}
        />
      </div>
    </section>
  );
}

