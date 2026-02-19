import { NextRequest, NextResponse } from "next/server";
import { DeadlinesQuerySchema, getDeadlines } from "src/db/deadlines";
import { z } from "zod";

export async function GET(request: NextRequest) {
  const parsed = DeadlinesQuerySchema.safeParse(Object.fromEntries(request.nextUrl.searchParams));
  if (!parsed.success) {
    const errorMessage = z.prettifyError(parsed.error);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }

  try {
    const deadlines = await getDeadlines(parsed.data);
    return NextResponse.json(deadlines);
  } catch (error) {
    console.error(`[deadlines] Error: ${error}`);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
