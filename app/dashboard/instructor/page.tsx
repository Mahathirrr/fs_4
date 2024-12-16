"use client";

import { InstructorStats } from "@/components/instructor/stats";
import { CoursesList } from "@/components/instructor/courses-list";
import { RevenueChart } from "@/components/instructor/revenue-chart";
import { StudentEngagement } from "@/components/instructor/student-engagement";

export default function InstructorDashboardPage() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard Instruktur</h1>
      <InstructorStats />
      <div className="grid lg:grid-cols-2 gap-8">
        <RevenueChart />
        <StudentEngagement />
      </div>
      <CoursesList />
    </div>
  );
}