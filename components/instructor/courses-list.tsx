"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Edit, MoreVertical, Plus } from "lucide-react";
import Link from "next/link";

const courses = [
  {
    id: "1",
    title: "Full Stack Web Development dengan Next.js 14",
    students: 234,
    rating: 4.8,
    revenue: "Rp 8.500.000",
    status: "published",
  },
  {
    id: "2",
    title: "Machine Learning untuk Pemula",
    students: 156,
    rating: 4.6,
    revenue: "Rp 5.200.000",
    status: "draft",
  },
];

export function CoursesList() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Kursus Saya</h2>
        <Button asChild>
          <Link href="/dashboard/instructor/courses/new">
            <Plus className="h-4 w-4 mr-2" />
            Buat Kursus Baru
          </Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Judul Kursus</TableHead>
            <TableHead>Siswa</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Pendapatan</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[100px]">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id}>
              <TableCell className="font-medium">{course.title}</TableCell>
              <TableCell>{course.students}</TableCell>
              <TableCell>{course.rating}</TableCell>
              <TableCell>{course.revenue}</TableCell>
              <TableCell>
                <Badge
                  variant={course.status === "published" ? "default" : "secondary"}
                >
                  {course.status === "published" ? "Terbit" : "Draft"}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/dashboard/instructor/courses/${course.id}/edit`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}