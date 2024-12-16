import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { getLessonById } from "@/lib/api/lessons";
import { saveVideoMetadata } from "@/lib/api/video";

export async function POST(
  req: Request,
  { params }: { params: { lessonId: string } }
) {
  const session = await getServerSession();
  
  if (!session?.user?.id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    // Verify lesson ownership
    const lesson = await getLessonById(params.lessonId);
    if (!lesson || lesson.instructor_id !== session.user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("video") as File;

    if (!file) {
      return new NextResponse("No video file provided", { status: 400 });
    }

    // Here you would implement your video upload logic
    // For example, uploading to a cloud storage service
    const videoUrl = "https://example.com/video-url"; // Replace with actual upload

    // Save video metadata
    const metadata = {
      duration: 0, // You would get this from the video file
      quality: "HD",
      format: file.type,
    };

    const updatedLesson = await saveVideoMetadata(
      params.lessonId,
      videoUrl,
      metadata
    );

    return NextResponse.json(updatedLesson);
  } catch (error) {
    console.error("Error uploading video:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}