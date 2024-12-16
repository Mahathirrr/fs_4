"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const engagementData = [
  {
    course: "Full Stack Web Development dengan Next.js 14",
    completion: 78,
    activeStudents: 189,
    totalStudents: 234,
  },
  {
    course: "Machine Learning untuk Pemula",
    completion: 65,
    activeStudents: 123,
    totalStudents: 156,
  },
];

export function StudentEngagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Keterlibatan Siswa</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {engagementData.map((data) => (
          <div key={data.course} className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="font-medium">{data.course}</p>
              <span className="text-sm text-muted-foreground">
                {data.completion}%
              </span>
            </div>
            <Progress value={data.completion} />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>
                {data.activeStudents} siswa aktif dari {data.totalStudents}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}