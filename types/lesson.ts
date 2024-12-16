export interface Lesson {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  isLocked: boolean;
  isCompleted: boolean;
  resources: {
    title: string;
    url: string;
    type: 'pdf' | 'code' | 'link';
  }[];
}

export interface Section {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface CourseProgress {
  courseId: string;
  completedLessons: string[];
  currentLessonId: string | null;
  overallProgress: number;
  lastAccessedAt: string;
}