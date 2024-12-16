import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Course } from "@/types/course";
import { Star, Clock, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/courses/${course.id}`}>
        <div className="relative aspect-video">
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            className="object-cover"
          />
        </div>
        <CardHeader>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="bg-primary/10 text-primary px-2 py-1 rounded">
              {course.level}
            </span>
            <span>{course.category}</span>
          </div>
          <h3 className="font-semibold text-lg line-clamp-2">{course.title}</h3>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{course.rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{course.totalStudents} siswa</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{course.totalDuration}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src={course.instructor.avatar}
              alt={course.instructor.name}
              width={24}
              height={24}
              className="rounded-full"
            />
            <span className="text-sm text-muted-foreground">
              {course.instructor.name}
            </span>
          </div>
          <span className="font-semibold">
            {course.price.toLocaleString('id-ID', {
              style: 'currency',
              currency: 'IDR',
            })}
          </span>
        </CardFooter>
      </Link>
    </Card>
  );
}