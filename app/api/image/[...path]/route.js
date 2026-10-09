import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

export const runtime = "nodejs";
const ROOT = path.resolve(process.cwd(), "private-assets");
const allowedRoots = ["assets/images/", "assets/frames/", "assets/files/", "assets/3d/"];
const mime = { ".png":"image/png", ".jpg":"image/jpeg", ".jpeg":"image/jpeg", ".webp":"image/webp", ".gif":"image/gif", ".svg":"image/svg+xml", ".avif":"image/avif", ".pdf":"application/pdf", ".glb":"model/gltf-binary", ".mp4":"video/mp4", ".webm":"video/webm" };
let client;
function getS3() {
  if (!process.env.R2_ACCOUNT_ID || !process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY || !process.env.R2_BUCKET_NAME) return null;
  if (!client) client = new S3Client({ region: "auto", endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`, credentials: { accessKeyId: process.env.R2_ACCESS_KEY_ID, secretAccessKey: process.env.R2_SECRET_ACCESS_KEY } });
  return client;
}
export async function GET(_request, { params }) {
  const { path: parts = [] } = await params;
  const key = parts.join("/").replace(/\\/g, "/");
  if (!allowedRoots.some((prefix) => key.startsWith(prefix)) || key.includes("..") || key.includes("\0")) return new NextResponse("Not found", { status: 404 });
  const contentType = mime[path.extname(key).toLowerCase()];
  if (!contentType) return new NextResponse("Unsupported file type", { status: 415 });
  try {
    const s3 = getS3();
    let body;
    if (s3) {
      const result = await s3.send(new GetObjectCommand({ Bucket: process.env.R2_BUCKET_NAME, Key: key }));
      body = result.Body;
      return new Response(body.transformToWebStream(), { headers: { "Content-Type": result.ContentType || contentType, "Cache-Control": "public, max-age=300, stale-while-revalidate=60", "X-Content-Type-Options": "nosniff" } });
    }
    if (process.env.VERCEL === "1") return new NextResponse("Private image storage is not configured. Configure Cloudflare R2 environment variables.", { status: 503 });
    const file = path.resolve(ROOT, key);
    if (!file.startsWith(ROOT + path.sep)) return new NextResponse("Not found", { status: 404 });
    body = await readFile(file);
    return new Response(body, { headers: { "Content-Type": contentType, "Cache-Control": "private, max-age=60", "X-Content-Type-Options": "nosniff" } });
  } catch (error) {
    if (error?.name === "NoSuchKey" || error?.code === "ENOENT") return new NextResponse("Not found", { status: 404 });
    console.error("Image route error:", error?.message || error);
    return new NextResponse("Unable to load asset", { status: 500 });
  }
}
