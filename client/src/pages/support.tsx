import { Layout } from "@/components/layout";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const supportSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type SupportForm = z.infer<typeof supportSchema>;

export default function Support() {
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<SupportForm>({
    resolver: zodResolver(supportSchema)
  });

  const onSubmit = async (data: SupportForm) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast({
      title: "Message sent",
      description: "We'll get back to you within 24 hours.",
    });
    reset();
  };

  return (
    <Layout>
      <div className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionHeader 
            title="How can we help?" 
            description="Check our FAQs or send us a message directly." 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name</label>
                    <Input {...register("name")} placeholder="Your name" />
                    {errors.name && <span className="text-xs text-destructive">{errors.name.message}</span>}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input {...register("email")} type="email" placeholder="you@example.com" />
                    {errors.email && <span className="text-xs text-destructive">{errors.email.message}</span>}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message</label>
                    <textarea 
                      {...register("message")}
                      className="w-full min-h-[150px] rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="How can we help you?"
                    />
                    {errors.message && <span className="text-xs text-destructive">{errors.message.message}</span>}
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* FAQs */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold font-display">Frequently Asked Questions</h3>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I reset my password?</AccordionTrigger>
                  <AccordionContent>
                    Go to the login page and click "Forgot Password". We'll email you a link to reset it.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Can I use my own domain?</AccordionTrigger>
                  <AccordionContent>
                    Yes! All plans include custom domain support. Just add a CNAME record in your DNS settings.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>How do I cancel my subscription?</AccordionTrigger>
                  <AccordionContent>
                    You can cancel anytime from your dashboard settings. You'll retain access until the end of your billing cycle.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <div className="mt-8 p-6 bg-primary/5 rounded-2xl border border-primary/10">
                <h4 className="font-bold mb-2">Direct Support</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Need urgent help? Email our support team directly.
                </p>
                <a href="mailto:support@bloggo.demo" className="text-primary font-medium hover:underline">
                  support@bloggo.demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
