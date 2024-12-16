"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navigationItems = [
  { label: "Kursus", href: "/courses" },
  { label: "Pengajar", href: "/instructors" },
  { label: "Tentang", href: "/about" },
];

export function NavigationMenu() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center gap-8">
      {navigationItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-gray-700 hover:text-[#4c7766] transition-colors",
            pathname === item.href && "text-[#4c7766] font-medium"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}