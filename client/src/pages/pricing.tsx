import { Layout } from "@/components/layout";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "$0",
      description: "Perfect for hobbyists and personal blogs.",
      features: ["1 Blog", "Custom Domain", "Basic Analytics", "1k Monthly Views"],
      button: "Start for Free",
      variant: "outline" as const
    },
    {
      name: "Pro",
      price: "$12",
      description: "For serious writers and creators.",
      features: ["Unlimited Blogs", "Newsletter Integration", "Advanced Analytics", "50k Monthly Views", "Remove Branding", "Priority Support"],
      button: "Start Free Trial",
      variant: "premium" as const,
      popular: true
    },
    {
      name: "Business",
      price: "$49",
      description: "Scale your publication or media company.",
      features: ["Unlimited Team Members", "API Access", "Custom Themes", "Unlimited Views", "SSO & Security", "Dedicated Success Manager"],
      button: "Contact Sales",
      variant: "outline" as const
    }
  ];

  return (
    <Layout>
      <div className="py-24">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title="Simple, transparent pricing" 
            description="Start for free, upgrade when you grow. No hidden fees." 
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, i) => (
              <Card 
                key={i} 
                className={`relative flex flex-col h-full ${plan.popular ? 'border-primary shadow-2xl shadow-primary/10 scale-105 z-10' : 'shadow-lg border-border/50'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full shadow-lg">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-bold font-display text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-4">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm">
                        <Check className="w-5 h-5 text-primary shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant={plan.variant} className="w-full h-12 text-base">
                    {plan.button}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
