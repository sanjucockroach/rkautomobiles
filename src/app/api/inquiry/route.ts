import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, name, phone, email, carId, carName, message, budget } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: "Name and phone are required" },
        { status: 400 }
      );
    }

    const validTypes = ["buy", "sell", "contact", "finance", "test-drive"];
    const inquiryType = validTypes.includes(type) ? type : "contact";

    const inquiry = await db.inquiry.create({
      data: {
        type: inquiryType,
        name: String(name).slice(0, 120),
        phone: String(phone).slice(0, 20),
        email: email ? String(email).slice(0, 160) : null,
        carId: carId ? String(carId).slice(0, 60) : null,
        carName: carName ? String(carName).slice(0, 200) : null,
        message: message ? String(message).slice(0, 1000) : null,
        budget: budget ? Number(budget) : null,
      },
    });

    return NextResponse.json({ success: true, id: inquiry.id });
  } catch (e) {
    console.error("Inquiry POST error:", e);
    return NextResponse.json(
      { success: false, error: "Failed to submit inquiry" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const inquiries = await db.inquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return NextResponse.json({ success: true, inquiries });
  } catch (e) {
    console.error("Inquiry GET error:", e);
    return NextResponse.json(
      { success: false, error: "Failed to fetch inquiries" },
      { status: 500 }
    );
  }
}
