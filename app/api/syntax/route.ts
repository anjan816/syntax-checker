// import { db } from "@/lib/db";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   const { code, language } = await req.json();

//   await db.execute(
//     "INSERT INTO syntax_requests (code, language) VALUES (?, ?)",
//     [code, language]
//   );

//   return NextResponse.json({ message: "Syntax stored" });
// }




import { db } from "@/lib/db";

export async function POST(req: Request) {
  console.log("API HIT: /api/syntax"); // ✅ API reached

  const start = Date.now(); // ⏱ start timing

  const { code, language } = await req.json();
  console.log("DATA:", code, language); // ✅ log input

  // Insert syntax request
  await db.execute(
    "INSERT INTO syntax_requests (code, language) VALUES (?, ?)",
    [code, language]
  );
  console.log("INSERT INTO syntax_requests DONE");

  const duration = Date.now() - start; // ⏱ calculate duration

  // Insert usage time (matches table: id, opened_at, duration_ms)
  await db.execute(
    "INSERT INTO usage_time (duration_ms) VALUES (?)",
    [duration]
  );
  console.log("INSERT INTO usage_time DONE:", duration, "ms");

  return new Response(
    JSON.stringify({ success: true, duration_ms: duration }),
    { status: 200 }
  );
}