import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });
  const type = formData.get("type") as string || "image";

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const cloudinaryOptions: any = { folder: "portfolio" };
  
  if (type === "raw") {
    cloudinaryOptions.resource_type = "raw";
  } else {
    cloudinaryOptions.resource_type = "image";
    cloudinaryOptions.transformation = [{ quality: "auto", fetch_format: "auto" }];
  }

  const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      cloudinaryOptions,
      (error, result) => {
        if (error || !result) return reject(error);
        resolve(result);
      }
    ).end(buffer);
  });

  return NextResponse.json({ url: result.secure_url });
}
