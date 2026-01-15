import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { code, language } = await req.json();

  await db.execute(
    "INSERT INTO syntax_requests (code, language) VALUES (?, ?)",
    [code, language]
  );

  return NextResponse.json({ message: "Syntax stored" });
}
