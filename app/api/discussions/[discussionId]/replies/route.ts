import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { DiscussionService } from "@/lib/services/discussion.service";
import { discussionReplySchema } from "@/lib/db/schema/discussion";
import { nanoid } from "nanoid";

export async function GET(
  req: Request,
  { params }: { params: { discussionId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const replies = await DiscussionService.getReplies(params.discussionId, {
      page,
      limit,
    });

    return NextResponse.json(replies);
  } catch (error) {
    console.error("Error fetching replies:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { discussionId: string } }
) {
  const session = await getServerSession();
  
  if (!session?.user?.id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await req.json();
    const validatedData = discussionReplySchema.parse({
      ...body,
      id: nanoid(),
      discussionId: params.discussionId,
      userId: session.user.id,
      isInstructorReply: session.user.role === 'instructor',
    });

    const reply = await DiscussionService.createReply(validatedData);
    return NextResponse.json(reply);
  } catch (error) {
    console.error("Error creating reply:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}