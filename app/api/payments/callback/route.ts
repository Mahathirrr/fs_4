import { NextResponse } from "next/server";
import { PaymentService } from "@/lib/services/payment.service";

export async function POST(req: Request) {
  try {
    const notification = await req.json();
    const payment = await PaymentService.handleCallback(notification);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error handling payment callback:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}