export interface InstructorStats {
  totalStudents: number;
  totalCourses: number;
  monthlyRevenue: number;
  averageRating: number;
}

export interface CourseStats {
  id: string;
  title: string;
  students: number;
  rating: number;
  revenue: number;
  status: 'draft' | 'published' | 'archived';
}

export interface RevenueData {
  month: string;
  revenue: number;
}

export interface EngagementData {
  courseId: string;
  courseName: string;
  completion: number;
  activeStudents: number;
  totalStudents: number;
}