"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, GripVertical, Trash2 } from "lucide-react";
import { Section } from "@/types/lesson";

interface CourseCurriculumFormProps {
  onComplete: () => void;
}

export function CourseCurriculumForm({ onComplete }: CourseCurriculumFormProps) {
  const [sections, setSections] = useState<Section[]>([]);
  const [isAddingSectionOpen, setIsAddingSectionOpen] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState("");

  const handleAddSection = () => {
    if (newSectionTitle.trim()) {
      setSections([
        ...sections,
        {
          id: Date.now().toString(),
          title: newSectionTitle,
          description: "",
          lessons: [],
        },
      ]);
      setNewSectionTitle("");
      setIsAddingSectionOpen(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-4">
        {sections.map((section, index) => (
          <div
            key={section.id}
            className="border rounded-lg p-4 space-y-4 bg-card"
          >
            <div className="flex items-center gap-2">
              <GripVertical className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <h3 className="font-semibold">{section.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {section.lessons.length} pelajaran
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive"
                onClick={() =>
                  setSections(sections.filter((s) => s.id !== section.id))
                }
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isAddingSectionOpen} onOpenChange={setIsAddingSectionOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Bagian Baru
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Bagian Baru</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Input
                placeholder="Judul bagian"
                value={newSectionTitle}
                onChange={(e) => setNewSectionTitle(e.target.value)}
              />
            </div>
            <Button onClick={handleAddSection} className="w-full">
              Tambah Bagian
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => onComplete()}>
          Lanjutkan ke Pengaturan
        </Button>
      </div>
    </div>
  );
}