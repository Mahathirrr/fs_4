"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, Play, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface Lesson {
  id: string;
  title: string;
  duration: string;
  isLocked: boolean;
  isCompleted: boolean;
  videoUrl?: string;
}

interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

// Mock data - replace with API call
const courseCurriculum: Section[] = [
  {
    id: "1",
    title: "Pendahuluan",
    lessons: [
      {
        id: "1-1",
        title: "Pengenalan Kursus",
        duration: "5:30",
        isLocked: false,
        isCompleted: true,
        videoUrl: "https://example.com/video-1",
      },
      {
        id: "1-2",
        title: "Persiapan Lingkungan Pengembangan",
        duration: "10:15",
        isLocked: false,
        isCompleted: false,
        videoUrl: "https://example.com/video-2",
      },
    ],
  },
  {
    id: "2",
    title: "Dasar-Dasar",
    lessons: [
      {
        id: "2-1",
        title: "Konsep Fundamental",
        duration: "15:45",
        isLocked: true,
        isCompleted: false,
      },
      {
        id: "2-2",
        title: "Praktik Pertama",
        duration: "20:00",
        isLocked: true,
        isCompleted: false,
      },
    ],
  },
];

export default function CourseCurriculumPage() {
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const router = useRouter();

  const totalLessons = courseCurriculum.reduce(
    (acc, section) => acc + section.lessons.length,
    0
  );
  const completedLessons = courseCurriculum.reduce(
    (acc, section) =>
      acc + section.lessons.filter((lesson) => lesson.isCompleted).length,
    0
  );
  const progress = (completedLessons / totalLessons) * 100;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {activeLesson ? (
            <div className="space-y-4">
              <div className="aspect-video bg-black rounded-lg relative">
                {/* Replace with actual video player component */}
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  Video Player
                </div>
              </div>
              <h2 className="text-2xl font-bold">{activeLesson.title}</h2>
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Ikhtisar</TabsTrigger>
                  <TabsTrigger value="resources">Sumber Daya</TabsTrigger>
                  <TabsTrigger value="discussion">Diskusi</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="p-4">
                  <h3 className="font-semibold mb-2">Tentang Pelajaran Ini</h3>
                  <p className="text-muted-foreground">
                    Deskripsi detail tentang pelajaran ini akan ditampilkan di sini.
                  </p>
                </TabsContent>
                <TabsContent value="resources" className="p-4">
                  <h3 className="font-semibold mb-2">Materi Tambahan</h3>
                  <ul className="list-disc list-inside text-muted-foreground">
                    <li>Slide presentasi</li>
                    <li>Kode sumber</li>
                    <li>Referensi tambahan</li>
                  </ul>
                </TabsContent>
                <TabsContent value="discussion" className="p-4">
                  <h3 className="font-semibold mb-2">Forum Diskusi</h3>
                  <p className="text-muted-foreground">
                    Fitur diskusi akan segera hadir.
                  </p>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="flex items-center justify-center h-[400px] bg-muted rounded-lg">
              <p className="text-muted-foreground">
                Pilih pelajaran untuk memulai
              </p>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-4 space-y-4">
            <div className="bg-card rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold mb-2">Progress Kursus</h3>
              <Progress value={progress} className="mb-2" />
              <p className="text-sm text-muted-foreground">
                {completedLessons} dari {totalLessons} pelajaran selesai
              </p>
            </div>

            <div className="bg-card rounded-lg shadow-sm">
              {courseCurriculum.map((section) => (
                <div key={section.id} className="border-b last:border-b-0">
                  <div className="p-4">
                    <h3 className="font-semibold">{section.title}</h3>
                  </div>
                  <div className="divide-y">
                    {section.lessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        className={`w-full text-left p-4 hover:bg-muted/50 transition-colors flex items-center justify-between ${
                          activeLesson?.id === lesson.id ? "bg-muted" : ""
                        }`}
                        onClick={() => !lesson.isLocked && setActiveLesson(lesson)}
                        disabled={lesson.isLocked}
                      >
                        <div className="flex items-center gap-3">
                          {lesson.isLocked ? (
                            <Lock className="h-4 w-4 text-muted-foreground" />
                          ) : lesson.isCompleted ? (
                            <CheckCircle className="h-4 w-4 text-primary" />
                          ) : (
                            <Play className="h-4 w-4 text-primary" />
                          )}
                          <span
                            className={
                              lesson.isLocked ? "text-muted-foreground" : ""
                            }
                          >
                            {lesson.title}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {lesson.duration}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}