import { prisma } from "@/lib/prisma";
import CertificatesManager from "./CertificatesManager";

export default async function CertificatesPage() {
  const certificates = await prisma.certificate.findMany({ orderBy: { order: "asc" } });
  return (
    <div className="max-w-4xl space-y-6">
      <div className="border-b border-[#121212]/10 pb-4">
        <h1 className="text-2xl font-black uppercase tracking-tighter">Certificates</h1>
        <p className="text-stone-500 text-sm font-medium mt-1">Upload certificate images to Cloudinary. If no image is set, an aesthetic placeholder will show on the portfolio.</p>
      </div>
      <CertificatesManager certificates={certificates} />
    </div>
  );
}
