import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { getInstructorStats } from "@/lib/api/instructor";

export async function GET() {
  const session = await getServerSession();
  
  if (!session?.user?.id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const stats = await getInstructorStats(session.user.id);
    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching instructor stats:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}