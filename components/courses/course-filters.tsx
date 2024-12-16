"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { COURSE_CATEGORIES } from "@/lib/constants/categories";
import { ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const LEVELS = ['Pemula', 'Menengah', 'Lanjutan'];

export function CourseFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`/courses?${params.toString()}`);
  };

  return (
    <div className="flex gap-4 flex-wrap">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            Kategori
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {COURSE_CATEGORIES.map((category) => (
            <DropdownMenuItem
              key={category.id}
              onClick={() => updateFilter('category', category.id)}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            Level
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {LEVELS.map((level) => (
            <DropdownMenuItem
              key={level}
              onClick={() => updateFilter('level', level.toLowerCase())}
            >
              {level}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}