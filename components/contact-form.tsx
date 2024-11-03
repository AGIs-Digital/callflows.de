"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

const formSchema = z.object({
  name: z.string().min(2, "Name muss mindestens 2 Zeichen lang sein"),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
  phone: z.string().optional(),
  message: z.string().min(10, "Nachricht muss mindestens 10 Zeichen lang sein"),
});

type FormData = z.infer<typeof formSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Here you would typically send the data to your API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      toast({
        title: "Nachricht gesendet",
        description: "Wir werden uns in Kürze bei Ihnen melden.",
      });
      reset();
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Beim Senden Ihrer Nachricht ist ein Fehler aufgetreten.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name *
        </label>
        <Input
          id="name"
          {...register("name")}
          className="w-full"
          error={errors.name?.message}
        />
        {errors.name && (
          <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          E-Mail *
        </label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          className="w-full"
          error={errors.email?.message}
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-2">
          Telefon (optional)
        </label>
        <Input
          id="phone"
          type="tel"
          {...register("phone")}
          className="w-full"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Nachricht *
        </label>
        <Textarea
          id="message"
          {...register("message")}
          className="w-full min-h-[150px]"
          error={errors.message?.message}
        />
        {errors.message && (
          <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-accent hover:bg-accent/90 text-gray-900"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Wird gesendet..." : "Nachricht senden"}
      </Button>
    </form>
  );
}