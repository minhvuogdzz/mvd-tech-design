import { NextResponse } from "next/server";
import { getLatestRelease } from "@/lib/github";

export const dynamic = "force-dynamic";

export async function GET() {
  const release = await getLatestRelease();
  return NextResponse.json(release);
}
