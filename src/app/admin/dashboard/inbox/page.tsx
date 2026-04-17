import { prisma } from "@/lib/prisma";
import InboxManager from "./InboxManager";

export const revalidate = 0;

export default async function InboxPage() {
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tighter text-[#121212]">Inbox</h1>
        <p className="text-stone-500 font-medium mt-2">Manage contact form messages.</p>
      </div>
      <InboxManager initialMessages={messages} />
    </div>
  );
}
