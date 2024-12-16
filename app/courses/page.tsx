import { CourseFilters } from "@/components/courses/course-filters";
import { CourseGrid } from "@/components/courses/course-grid";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

// Temporary mock data
const courses = [
  {
    id: "1",
    title: "Full Stack Web Development dengan Next.js 14",
    description: "Pelajari pengembangan web modern dari dasar hingga mahir",
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
    instructor: {
      id: "1",
      name: "Budi Prakoso",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    },
    price: 799000,
    rating: 4.8,
    totalStudents: 1234,
    totalDuration: "20 jam",
    level: "Menengah",
    category: "Web Development",
  },
  // Add more mock courses here
];

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Jelajahi Kursus</h1>
          <p className="text-muted-foreground mb-6">
            Temukan kursus yang sesuai dengan minat dan kebutuhan Anda
          </p>
          <CourseFilters />
        </div>
        <CourseGrid courses={courses} />
      </main>
      <Footer />
    </div>
  );
}