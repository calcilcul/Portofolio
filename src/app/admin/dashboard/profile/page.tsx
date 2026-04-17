import { prisma } from "@/lib/prisma";
import ProfileForm from "./ProfileForm";

export default async function ProfilePage() {
  const profile = await prisma.profile.findFirst();
  return (
    <div className="max-w-2xl space-y-6">
      <div className="border-b border-[#121212]/10 pb-4">
        <h1 className="text-2xl font-black uppercase tracking-tighter">Profile & Hero</h1>
        <p className="text-stone-500 text-sm font-medium mt-1">Controls the Hero section headline, About section, and social links.</p>
      </div>
      <ProfileForm profile={profile} />
    </div>
  );
}
