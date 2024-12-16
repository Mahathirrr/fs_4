import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { DiscussionService } from "@/lib/services/discussion.service";
import { discussionSchema } from "@/lib/db/schema/discussion";
import { nanoid } from "nanoid";

export async function GET(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const lessonId = searchParams.get('lessonId') || undefined;
    const searchQuery = searchParams.get('q') || undefined;

    const discussions = await DiscussionService.getDiscussions(params.courseId, {
      page,
      limit,
      lessonId,
      searchQuery,
    });

    return NextResponse.json(discussions);
  } catch (error) {
    console.error("Error fetching discussions:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  const session = await getServerSession();
  
  if (!session?.user?.id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await req.json();
    const validatedData = discussionSchema.parse({
      ...body,
      id: nanoid(),
      courseId: params.courseId,
      userId: session.user.id,
    });

    const discussion = await DiscussionService.createDiscussion(validatedData);
    return NextResponse.json(discussion);
  } catch (error) {
    console.error("Error creating discussion:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}