import { NextResponse } from "next/server";
import { cars } from "@/lib/data";

export async function GET() {
  return NextResponse.json({ success: true, cars, count: cars.length });
}
