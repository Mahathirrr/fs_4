import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { CourseService } from "@/lib/services/course.service";
import { courseSchema } from "@/lib/db/schema";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category') || undefined;
    const level = searchParams.get('level') || undefined;
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');

    const priceRange = minPrice && maxPrice 
      ? [parseInt(minPrice), parseInt(maxPrice)]
      : undefined;

    const courses = await CourseService.getPublishedCourses({
      page,
      limit,
      category,
      level,
      priceRange,
    });

    return NextResponse.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession();
  
  if (!session?.user?.id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await req.json();
    const validatedData = courseSchema.parse({
      ...body,
      instructorId: session.user.id,
    });

    const course = await CourseService.createCourse(validatedData, session.user.id);
    return NextResponse.json(course);
  } catch (error) {
    console.error("Error creating course:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}