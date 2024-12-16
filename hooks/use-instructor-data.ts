import useSWR from 'swr';
import { InstructorStats, CourseStats, RevenueData, EngagementData } from '@/types/instructor';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useInstructorStats() {
  const { data, error, isLoading } = useSWR<InstructorStats>(
    '/api/instructor/stats',
    fetcher
  );

  return {
    stats: data,
    isLoading,
    isError: error,
  };
}

export function useInstructorCourses() {
  const { data, error, isLoading } = useSWR<CourseStats[]>(
    '/api/instructor/courses',
    fetcher
  );

  return {
    courses: data,
    isLoading,
    isError: error,
  };
}

export function useRevenueData() {
  const { data, error, isLoading } = useSWR<RevenueData[]>(
    '/api/instructor/revenue',
    fetcher
  );

  return {
    revenueData: data,
    isLoading,
    isError: error,
  };
}

export function useStudentEngagement() {
  const { data, error, isLoading } = useSWR<EngagementData[]>(
    '/api/instructor/engagement',
    fetcher
  );

  return {
    engagementData: data,
    isLoading,
    isError: error,
  };
}