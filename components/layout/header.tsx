"use client";

import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";
import Link from "next/link";
import { NavigationMenu } from "../navigation/navigation-menu";
import { MobileNav } from "../navigation/mobile-nav";

export function Header() {
  return (
    <header className="border-b bg-white/50 backdrop-blur-sm fixed w-full z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-[#4c7766]" />
          <span className="text-2xl font-bold text-[#4c7766]">Skillopa</span>
        </Link>
        
        <NavigationMenu />
        <MobileNav />

        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/auth/login">Masuk</Link>
          </Button>
          <Button className="bg-[#4c7766] hover:bg-[#3d5f52]" asChild>
            <Link href="/auth/register">Daftar</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}