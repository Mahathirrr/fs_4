import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Award } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#EBE6E0]">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 text-gray-900">
              Tingkatkan Keahlianmu Bersama Para Ahli
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Pelajari keterampilan baru dari instruktur berpengalaman dengan kursus berkualitas tinggi
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="bg-[#4c7766] hover:bg-[#3d5f52]" asChild>
                <Link href="/courses">Mulai Belajar</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/about">Pelajari Lebih Lanjut</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Mengapa Memilih Skillopa?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={BookOpen}
                title="Materi Berkualitas"
                description="Kurikulum terstruktur yang dirancang oleh para ahli di bidangnya"
              />
              <FeatureCard
                icon={Users}
                title="Komunitas Aktif"
                description="Bergabung dengan komunitas pembelajar yang saling mendukung"
              />
              <FeatureCard
                icon={Award}
                title="Sertifikat Resmi"
                description="Dapatkan sertifikat yang diakui setelah menyelesaikan kursus"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center p-6">
      <Icon className="w-12 h-12 text-[#4c7766] mx-auto mb-4" />
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}