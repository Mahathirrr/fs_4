"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  price: z.string().min(1, "Harga harus diisi"),
  isEnrollmentLimited: z.boolean(),
  maxEnrollments: z.string().optional(),
  hasRefundPolicy: z.boolean(),
  refundDuration: z.string().optional(),
});

export function CoursePricingForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: "",
      isEnrollmentLimited: false,
      maxEnrollments: "",
      hasRefundPolicy: true,
      refundDuration: "30",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      // Submit form data
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-6">
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Harga Kursus (Rp)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Masukkan harga kursus"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isEnrollmentLimited"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Batasi Pendaftaran</FormLabel>
                <FormDescription>
                  Tetapkan batas maksimum siswa yang dapat mendaftar
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hasRefundPolicy"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Kebijakan Pengembalian Dana</FormLabel>
                <FormDescription>
                  Izinkan siswa meminta pengembalian dana dalam periode tertentu
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit">Simpan Pengaturan</Button>
        </div>
      </form>
    </Form>
  );
}