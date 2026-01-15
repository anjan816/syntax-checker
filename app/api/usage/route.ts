import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { duration } = await req.json();

  await db.execute(
    "INSERT INTO usage_time (duration_ms) VALUES (?)",
    [duration]
  );

  return NextResponse.json({ message: "Usage stored" });
}
