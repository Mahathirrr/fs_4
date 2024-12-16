"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CourseBasicForm } from "@/components/instructor/course/basic-form";
import { CourseCurriculumForm } from "@/components/instructor/course/curriculum-form";
import { CoursePricingForm } from "@/components/instructor/course/pricing-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function NewCoursePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("basic");

  const handleSaveDraft = async () => {
    // Implementation for saving draft
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Buat Kursus Baru</h1>
        <div className="flex gap-4">
          <Button variant="outline" onClick={handleSaveDraft}>
            Simpan Draft
          </Button>
          <Button>Terbitkan</Button>
        </div>
      </div>

      <Card>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Informasi Dasar</TabsTrigger>
            <TabsTrigger value="curriculum">Kurikulum</TabsTrigger>
            <TabsTrigger value="pricing">Harga & Pengaturan</TabsTrigger>
          </TabsList>
          <TabsContent value="basic">
            <CourseBasicForm onComplete={() => setActiveTab("curriculum")} />
          </TabsContent>
          <TabsContent value="curriculum">
            <CourseCurriculumForm onComplete={() => setActiveTab("pricing")} />
          </TabsContent>
          <TabsContent value="pricing">
            <CoursePricingForm />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}