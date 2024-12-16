import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, Users, Star, CheckCircle } from "lucide-react";
import Image from "next/image";

// This would normally come from an API
const courseDetails = {
  id: "1",
  title: "Full Stack Web Development dengan Next.js 14",
  description: "Pelajari pengembangan web modern dari dasar hingga mahir dengan Next.js 14, React, dan Node.js. Kursus ini akan membimbing Anda melalui proses pembuatan aplikasi web yang kompleks dan scalable.",
  thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
  instructor: {
    id: "1",
    name: "Budi Prakoso",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    bio: "Senior Web Developer dengan pengalaman lebih dari 8 tahun",
  },
  price: 799000,
  rating: 4.8,
  totalStudents: 1234,
  totalDuration: "20 jam",
  level: "Menengah",
  category: "Web Development",
  learningPoints: [
    "Memahami arsitektur Next.js 14",
    "Menggunakan React Hooks dan Custom Hooks",
    "Implementasi autentikasi dan otorisasi",
    "Penggunaan database dan API",
    "Deploy aplikasi ke production",
  ],
};

export default function CourseDetailsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-24">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-4">{courseDetails.title}</h1>
            <p className="text-muted-foreground mb-6">
              {courseDetails.description}
            </p>

            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span>{courseDetails.rating}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>{courseDetails.totalStudents} siswa</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{courseDetails.totalDuration}</span>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Yang Akan Anda Pelajari</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {courseDetails.learningPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-1" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Instruktur</h2>
              <div className="flex items-center gap-4">
                <Image
                  src={courseDetails.instructor.avatar}
                  alt={courseDetails.instructor.name}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{courseDetails.instructor.name}</h3>
                  <p className="text-muted-foreground">
                    {courseDetails.instructor.bio}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <div className="relative aspect-video mb-4">
                <Image
                  src={courseDetails.thumbnail}
                  alt={courseDetails.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="mb-6">
                <div className="text-3xl font-bold mb-2">
                  {courseDetails.price.toLocaleString('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                  })}
                </div>
              </div>
              <Button className="w-full mb-4">Beli Kursus</Button>
              <p className="text-sm text-center text-muted-foreground">
                30 hari garansi uang kembali
              </p>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}