import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Course, Section, Lesson } from '@/lib/db/schema';

interface UseCourseManagementProps {
  courseId: string;
}

export function useCourseManagement({ courseId }: UseCourseManagementProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const addSection = async (data: Partial<Section>) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/courses/${courseId}/sections`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to add section');

      const section = await response.json();
      toast({
        title: 'Bagian berhasil ditambahkan',
        description: 'Bagian baru telah ditambahkan ke kursus',
      });

      return section;
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Gagal menambahkan bagian',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const addLesson = async (sectionId: string, data: Partial<Lesson>) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/courses/${courseId}/sections/${sectionId}/lessons`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) throw new Error('Failed to add lesson');

      const lesson = await response.json();
      toast({
        title: 'Pelajaran berhasil ditambahkan',
        description: 'Pelajaran baru telah ditambahkan ke bagian',
      });

      return lesson;
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Gagal menambahkan pelajaran',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const uploadVideo = async (
    sectionId: string,
    lessonId: string,
    file: File
  ) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('video', file);

      const response = await fetch(
        `/api/courses/${courseId}/sections/${sectionId}/lessons/${lessonId}/video`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) throw new Error('Failed to upload video');

      const lesson = await response.json();
      toast({
        title: 'Video berhasil diunggah',
        description: 'Video telah ditambahkan ke pelajaran',
      });

      return lesson;
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Gagal mengunggah video',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    addSection,
    addLesson,
    uploadVideo,
  };
}