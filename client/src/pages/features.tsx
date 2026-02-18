import { Layout } from "@/components/layout";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Check, Wand2, BarChart3, Users, Layout as LayoutIcon, Lock } from "lucide-react";
import { motion } from "framer-motion";

export default function Features() {
  const features = [
    {
      icon: <Wand2 className="w-10 h-10 text-primary" />,
      title: "AI Writing Assistant",
      description: "Generate outlines, refine copy, and fix grammar instantly with our integrated AI tools.",
      items: ["Topic generation", "Tone adjustment", "Grammar check", "SEO optimization"]
    },
    {
      icon: <LayoutIcon className="w-10 h-10 text-blue-500" />,
      title: "Beautiful Themes",
      description: "Choose from dozens of handcrafted themes or build your own with our visual editor.",
      items: ["Mobile responsive", "Dark mode support", "Custom fonts", "CSS injection"]
    },
    {
      icon: <BarChart3 className="w-10 h-10 text-green-500" />,
      title: "Advanced Analytics",
      description: "Understand your audience with privacy-focused analytics built right into your dashboard.",
      items: ["Page views", "Reading time", "Traffic sources", "Geographic data"]
    },
    {
      icon: <Users className="w-10 h-10 text-orange-500" />,
      title: "Newsletter Integration",
      description: "Turn your readers into subscribers. Send new posts directly to their inbox.",
      items: ["Email capture forms", "Automated sending", "Subscriber management", "Export data"]
    },
    {
      icon: <Lock className="w-10 h-10 text-red-500" />,
      title: "Membership Gates",
      description: "Monetize your content by creating premium posts for paying members only.",
      items: ["Stripe integration", "Tiered access", "Paywalls", "Member dashboard"]
    }
  ];

  return (
    <Layout>
      <div className="bg-secondary/30 py-24">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title="Powerful Features" 
            description="Everything you need to create a world-class publication." 
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {features.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="mb-4 p-3 bg-secondary rounded-xl w-fit">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-2xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6 text-lg">
                      {feature.description}
                    </p>
                    <ul className="space-y-3">
                      {feature.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-3 text-sm font-medium">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
