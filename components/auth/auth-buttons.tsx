"use client";

import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";

export function AuthButtons() {
  return (
    <div className="flex flex-col gap-3">
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      >
        <Image
          src="/google.svg"
          alt="Google"
          width={20}
          height={20}
          className="w-5 h-5"
        />
        Lanjutkan dengan Google
      </Button>
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
      >
        <Github className="w-5 h-5" />
        Lanjutkan dengan GitHub
      </Button>
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Atau lanjutkan dengan
          </span>
        </div>
      </div>
    </div>
  );
}