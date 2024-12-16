"use client";

import { Card } from "@/components/ui/card";
import { Users, BookOpen, DollarSign, Star } from "lucide-react";
import { useInstructorStats } from "@/hooks/use-instructor-data";
import { Skeleton } from "@/components/ui/skeleton";

export function InstructorStats() {
  const { stats, isLoading, isError } = useInstructorStats();

  if (isLoading) {
    return <StatsSkeletonLoader />;
  }

  if (isError) {
    return <div>Error loading stats</div>;
  }

  const statItems = [
    {
      label: "Total Siswa",
      value: stats?.totalStudents.toLocaleString(),
      icon: Users,
    },
    {
      label: "Total Kursus",
      value: stats?.totalCourses.toLocaleString(),
      icon: BookOpen,
    },
    {
      label: "Pendapatan Bulan Ini",
      value: `Rp ${stats?.monthlyRevenue.toLocaleString()}`,
      icon: DollarSign,
    },
    {
      label: "Rating Rata-rata",
      value: stats?.averageRating.toFixed(1),
      icon: Star,
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((stat) => (
        <Card key={stat.label} className="p-6">
          <div className="flex items-center justify-between mb-4">
            <stat.icon className="h-5 w-5 text-muted-foreground" />
          </div>
          <p className="text-2xl font-bold mb-1">{stat.value}</p>
          <p className="text-sm text-muted-foreground">{stat.label}</p>
        </Card>
      ))}
    </div>
  );
}

function StatsSkeletonLoader() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <Card key={i} className="p-6">
          <Skeleton className="h-5 w-5 mb-4" />
          <Skeleton className="h-8 w-24 mb-1" />
          <Skeleton className="h-4 w-32" />
        </Card>
      ))}
    </div>
  );
}