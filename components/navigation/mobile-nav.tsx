"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col gap-4">
          <Link
            href="/courses"
            onClick={() => setOpen(false)}
            className="block px-2 py-1 text-lg"
          >
            Kursus
          </Link>
          <Link
            href="/instructors"
            onClick={() => setOpen(false)}
            className="block px-2 py-1 text-lg"
          >
            Pengajar
          </Link>
          <Link
            href="/about"
            onClick={() => setOpen(false)}
            className="block px-2 py-1 text-lg"
          >
            Tentang
          </Link>
          <div className="flex flex-col gap-2 mt-4">
            <Button asChild variant="outline" onClick={() => setOpen(false)}>
              <Link href="/auth/login">Masuk</Link>
            </Button>
            <Button asChild onClick={() => setOpen(false)}>
              <Link href="/auth/register">Daftar</Link>
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}