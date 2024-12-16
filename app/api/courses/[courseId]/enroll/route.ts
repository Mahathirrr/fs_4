import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { EnrollmentService } from "@/lib/services/enrollment.service";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  const session = await getServerSession();
  
  if (!session?.user?.id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const enrollment = await EnrollmentService.enrollStudent(
      params.courseId,
      session.user.id
    );
    return NextResponse.json(enrollment);
  } catch (error) {
    console.error("Error enrolling in course:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}