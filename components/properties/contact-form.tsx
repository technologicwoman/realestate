"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, "El nombre es requerido"),
  email: z.string().email("Email inválido").optional(),
  phone: z.string().min(8, "El teléfono es requerido"),
  message: z.string().optional(),
  // Add any other fields you need
  // For example, you might want to add the property ID
  propertyId: z.string().optional(),
  propertyName: z.string().optional()
});

interface ContactFormProps {
  propertyId?: string;
  propertyName?: string;
}

export function ContactForm({ propertyId, propertyName }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      propertyId: propertyId || "",
      propertyName: propertyName || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      toast.success('Mensaje enviado exitosamente');
      form.reset();
      
    } catch (error) {
      toast.error('Error al enviar el mensaje. Por favor intente nuevamente.');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Hidden fields for property information */}
        <FormField
          control={form.control}
          name="propertyId"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormControl>
                <Input type="hidden" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="propertyName"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormControl>
                <Input type="hidden" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Nombre *" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Teléfono *" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea 
                  placeholder="Mensaje"
                  rows={4}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="loading loading-spinner"></span>
              Enviando...
            </>
          ) : (
            <>
              <Mail className="h-5 w-5 mr-2" />
              Enviar
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}