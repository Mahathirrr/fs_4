import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface UseLessonProgressProps {
  lessonId: string;
  onComplete?: () => void;
}

export function useLessonProgress({ lessonId, onComplete }: UseLessonProgressProps) {
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load initial progress
    fetch(`/api/lessons/${lessonId}/progress`)
      .then((res) => res.json())
      .then((data) => {
        setProgress(data.progress);
        setIsCompleted(data.completed_at !== null);
      })
      .catch(console.error);
  }, [lessonId]);

  const updateProgress = async (newProgress: number) => {
    try {
      const response = await fetch(`/api/lessons/${lessonId}/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ progress: newProgress }),
      });

      if (!response.ok) throw new Error('Failed to update progress');

      setProgress(newProgress);

      // If progress is >= 90%, consider the lesson completed
      if (newProgress >= 0.9 && !isCompleted) {
        await completeLesson();
      }
    } catch (error) {
      console.error('Error updating progress:', error);
      toast({
        title: 'Error',
        description: 'Gagal menyimpan progres',
        variant: 'destructive',
      });
    }
  };

  const completeLesson = async () => {
    try {
      const response = await fetch(`/api/lessons/${lessonId}/complete`, {
        method: 'POST',
      });

      if (!response.ok) throw new Error('Failed to complete lesson');

      setIsCompleted(true);
      onComplete?.();

      toast({
        title: 'Pelajaran Selesai',
        description: 'Anda telah menyelesaikan pelajaran ini',
      });
    } catch (error) {
      console.error('Error completing lesson:', error);
      toast({
        title: 'Error',
        description: 'Gagal menyelesaikan pelajaran',
        variant: 'destructive',
      });
    }
  };

  return {
    progress,
    isCompleted,
    updateProgress,
    completeLesson,
  };
}