"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EBE6E0] px-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-6">
            <Link href="/" className="flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-[#4c7766]" />
              <span className="text-2xl font-bold text-[#4c7766]">Skillopa</span>
            </Link>
          </div>
          <CardTitle className="text-2xl text-center">Selamat Datang Kembali</CardTitle>
          <CardDescription className="text-center">
            Masuk ke akun Anda untuk melanjutkan pembelajaran
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="nama@email.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Kata Sandi</Label>
            <Input id="password" type="password" />
          </div>
          <div className="flex items-center justify-between">
            <Link
              href="/auth/forgot-password"
              className="text-sm text-[#4c7766] hover:underline"
            >
              Lupa kata sandi?
            </Link>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full bg-[#4c7766] hover:bg-[#3d5f52]">
            Masuk
          </Button>
          <p className="text-center text-sm text-gray-600">
            Belum punya akun?{" "}
            <Link href="/auth/register" className="text-[#4c7766] hover:underline">
              Daftar sekarang
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}