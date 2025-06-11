"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
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
import { SectionWrapper } from "./section-wrapper";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";
import { Card } from "@/components/ui/card";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }).max(500, {
    message: "Message must not exceed 500 characters."
  }),
});

export function ContactSection() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Placeholder for actual submission logic
    console.log(values);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. We'll get back to you soon.",
      variant: "default", 
    });
    form.reset();
  }

  return (
    <SectionWrapper id="contact">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-bold mb-6 gradient-text">Ready to Elevate Your Brand?</h2>
          <p className="text-lg text-foreground/80 mb-4">
            Let&apos;s discuss how Astroya can create the perfect landing page for your business. Fill out the form, and we&apos;ll get in touch to start your journey.
          </p>
          <p className="text-lg text-foreground/80">
            Alternatively, request a proposal, and we&apos;ll tailor a solution just for you.
          </p>
           <div className="mt-8 space-y-4 text-foreground/80">
            <p><strong>Email:</strong> <a href="mailto:hello@astroya.pilot" className="hover:text-primary">hello@astroya.pilot</a></p>
            <p><strong>Phone:</strong> <a href="tel:+1234567890" className="hover:text-primary">(123) 456-7890</a></p>
            <p>Mon - Fri, 9 AM - 6 PM</p>
          </div>
        </div>
        <Card className="p-8 bg-card/50 shadow-xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/90">Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Name" {...field} className="bg-input text-foreground placeholder:text-muted-foreground" />
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
                    <FormLabel className="text-foreground/90">Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your.email@example.com" {...field} className="bg-input text-foreground placeholder:text-muted-foreground"/>
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
                    <FormLabel className="text-foreground/90">Your Message or Proposal Request</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about your project or inquiry..."
                        {...field}
                        className="min-h-[120px] bg-input text-foreground placeholder:text-muted-foreground"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" size="lg" className="w-full gradient-bg text-primary-foreground font-semibold hover:opacity-90 transition-opacity duration-300 flex items-center gap-2" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Sending..." : "Send Proposal Request"}
                {!form.formState.isSubmitting && <Send size={18} />}
              </Button>
            </form>
          </Form>
        </Card>
      </div>
    </SectionWrapper>
  );
}
