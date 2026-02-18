import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, Shield, Globe, PenTool, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 md:pt-24 pb-32 mesh-gradient">
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="bg-white/50 backdrop-blur border-primary/20 text-primary mb-6 py-1.5 px-4 text-sm font-medium rounded-full">
              New: AI-Powered Writing Assistant ✨
            </Badge>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display tracking-tight text-foreground mb-6 text-balance">
              Publishing for the <br/>
              <span className="text-gradient">Modern Web</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed text-balance">
              The fastest way to build, write, and grow your blog. No complex setup, just pure creativity.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/editor/new">
                <Button size="lg" variant="premium" className="w-full sm:w-auto text-lg h-14 px-8 rounded-2xl">
                  Start Writing Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/features">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 rounded-2xl bg-white/50 backdrop-blur">
                  View Features
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Hero Image/Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 mx-auto max-w-5xl rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 border border-border/50 bg-background"
          >
            <div className="bg-muted/50 border-b border-border p-4 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <div className="ml-4 flex-1 bg-white rounded-md h-6 w-full max-w-sm opacity-50" />
            </div>
            <div className="relative aspect-[16/9] bg-white">
              {/* Abstract UI Representation */}
              <div className="absolute inset-0 bg-gradient-to-br from-white to-secondary/50 p-12">
                <div className="h-full w-full max-w-3xl mx-auto flex flex-col gap-6">
                  <div className="w-24 h-24 rounded-2xl bg-primary/10 mb-4 animate-pulse" />
                  <div className="h-12 w-3/4 bg-foreground/5 rounded-lg" />
                  <div className="space-y-3">
                    <div className="h-4 w-full bg-foreground/5 rounded" />
                    <div className="h-4 w-full bg-foreground/5 rounded" />
                    <div className="h-4 w-2/3 bg-foreground/5 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader 
            title="Everything you need to grow" 
            description="Powerful features designed to help you focus on what matters most: your content."
          />
          
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <Zap className="w-8 h-8 text-yellow-500" />,
                title: "Lightning Fast",
                desc: "Built on the edge for sub-millisecond load times anywhere in the world."
              },
              {
                icon: <PenTool className="w-8 h-8 text-primary" />,
                title: "Rich Editor",
                desc: "A notion-style editor that makes writing feel like magic, not a chore."
              },
              {
                icon: <Globe className="w-8 h-8 text-blue-500" />,
                title: "Custom Domain",
                desc: "Connect your own domain in seconds with automatic SSL provisioning."
              }
            ].map((feature, i) => (
              <motion.div key={i} variants={item}>
                <Card className="h-full border-none shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all bg-secondary/30">
                  <CardContent className="pt-8">
                    <div className="mb-6 p-4 bg-white rounded-2xl w-fit shadow-sm inline-flex">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold font-display mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="bg-primary rounded-3xl p-8 md:p-16 text-center text-primary-foreground relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 0 L50 100 L100 0 Z" fill="white" />
              </svg>
            </div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">Ready to start your journey?</h2>
              <p className="text-primary-foreground/80 text-lg md:text-xl mb-10">
                Join thousands of writers who have found their home on BlogGo.
              </p>
              <Link href="/editor/new">
                <Button size="lg" variant="secondary" className="h-14 px-8 text-lg rounded-xl text-primary font-bold shadow-xl">
                  Get Started for Free
                </Button>
              </Link>
              <p className="mt-6 text-sm opacity-60">No credit card required • 14-day free trial</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
