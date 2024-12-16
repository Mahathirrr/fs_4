import { getServerSession } from "next-auth/next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Clock, GraduationCap, Trophy } from "lucide-react";

export default async function DashboardPage() {
  const session = await getServerSession();

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">
            Selamat datang, {session?.user?.name}!
          </h1>
          <p className="text-muted-foreground">
            Pantau perkembangan pembelajaran Anda
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatsCard
          title="Kursus Aktif"
          value="3"
          description="Sedang dipelajari"
          icon={BookOpen}
        />
        <StatsCard
          title="Total Jam Belajar"
          value="24"
          description="Jam"
          icon={Clock}
        />
        <StatsCard
          title="Kursus Selesai"
          value="5"
          description="Kursus"
          icon={GraduationCap}
        />
        <StatsCard
          title="Sertifikat"
          value="4"
          description="Diperoleh"
          icon={Trophy}
        />
      </div>

      {/* Add more dashboard content here */}
    </div>
  );
}

function StatsCard({
  title,
  value,
  description,
  icon: Icon,
}: {
  title: string;
  value: string;
  description: string;
  icon: any;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}