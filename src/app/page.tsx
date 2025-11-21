"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Shield,
  Zap,
  TrendingUp,
  Lock,
  Globe,
  CheckCircle2,
  ArrowRight,
  Play,
  Sparkles,
  Layout,
  Smartphone,
  Share2,
} from "lucide-react";

const features = [
  {
    title: "Always-on Reliability",
    metric: "99.99% Uptime",
    description:
      "We monitor your links continuously to ensure your audience always reaches the right destination.",
    icon: Shield,
  },
  {
    title: "Smart Redirects",
    metric: "Instant",
    description:
      "Automatically route traffic to backup links if a destination goes down. No manual intervention needed.",
    icon: Zap,
  },
  {
    title: "Growth Analytics",
    metric: "Real-time",
    description:
      "Understand exactly which links drive engagement and revenue with beautiful, easy-to-read charts.",
    icon: TrendingUp,
  },
  {
    title: "Brand Control",
    metric: "Custom",
    description:
      "Customize your link-in-bio page to match your aesthetic perfectly. Your brand, your rules.",
    icon: Layout,
  },
];

const workflow = [
  {
    step: "1",
    title: "Curate your collection",
    description:
      "Import links from anywhere or paste them directly. We organize them into a beautiful storefront.",
    icon: Sparkles,
  },
  {
    step: "2",
    title: "Share with confidence",
    description:
      "One bio link for everything. Post it across socials knowing it will always load fast and look great.",
    icon: Share2,
  },
  {
    step: "3",
    title: "Watch your growth",
    description:
      "Track clicks, conversions, and engagement in real-time. Optimize what works best.",
    icon: TrendingUp,
  },
];

const faq = [
  {
    question: "Is LinkVault free to use?",
    answer:
      "Yes! You can start with our free plan which includes unlimited links and basic customization. Upgrade anytime for advanced analytics and custom domains.",
  },
  {
    question: "Can I use my own domain?",
    answer:
      "Absolutely. Pro users can connect their own custom domain (e.g., links.yourbrand.com) for a fully branded experience.",
  },
  {
    question: "How does the monitoring work?",
    answer:
      "We periodically check all your links from multiple locations around the world. If one stops working, we can notify you or redirect traffic automatically.",
  },
  {
    question: "Do I need any technical skills?",
    answer:
      "None at all. LinkVault is designed to be intuitive and beautiful right out of the box.",
  },
];

export default function Home() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!loading) {
    if (isAuthenticated) {
        router.push("/dashboard");
      }
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
           <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
           <p className="text-muted-foreground animate-pulse">Loading LinkVault...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-background selection:bg-primary/20 selection:text-primary">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[100px]" />
        <div className="absolute top-[40%] left-[40%] h-[300px] w-[300px] rounded-full bg-emerald-500/5 blur-[80px]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      <nav className="sticky top-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl transition-all duration-300">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link 
            href="/" 
            className="group flex items-center gap-2 text-lg font-bold tracking-tight transition-all hover:opacity-80"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              LinkVault
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-white sm:block"
            >
              Sign In
            </Link>
            <Button 
              asChild 
              size="sm" 
              className="rounded-full bg-white text-black hover:bg-white/90"
            >
              <Link href="/register">
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-24 pb-32 lg:pt-36 lg:pb-40">
          <div className="container relative z-10 mx-auto px-4 text-center">
             <div className={`mx-auto max-w-4xl transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="mb-8 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm backdrop-blur-md">
                <span className="mr-2 flex h-2 w-2">
                  <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-medium">
                  New: Early Access is live
                </span>
              </div>
              
              <h1 className="mb-8 text-5xl font-bold tracking-tight leading-[1.1] sm:text-7xl">
                Connect with <br />
                <span className="bg-gradient-to-r from-primary via-purple-400 to-secondary bg-clip-text text-transparent">
                  confidence.
                </span>
              </h1>
              
              <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl leading-relaxed">
                The most beautiful way to manage, protect, and grow your links. LinkVault ensures your audience always finds what they're looking for.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button 
                  asChild 
                  size="lg" 
                  className="h-12 min-w-[160px] rounded-full bg-white text-black hover:bg-white/90 text-base"
                >
                  <Link href="/register">
                    Start for free
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 min-w-[160px] rounded-full border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-base"
                >
                  <Link href="/login">
                    <Play className="mr-2 h-4 w-4 fill-current" />
                    Watch Demo
                  </Link>
                </Button>
              </div>
            </div>

            {/* Hero Visual / Dashboard Preview */}
            <div className={`relative mt-24 mx-auto max-w-5xl transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <div className="relative rounded-xl border border-white/10 bg-white/5 p-2 backdrop-blur-xl shadow-2xl shadow-primary/10 lg:rounded-2xl">
                <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                
                <div className="rounded-lg border border-white/5 bg-[#0A0A0A] overflow-hidden lg:rounded-xl aspect-[16/9] relative">
                  {/* Mockup Content */}
                   <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-background to-background" />
                   
                   <div className="relative h-full p-8 flex items-center justify-center">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
                        {/* Profile Card */}
                        <div className="bg-card/50 backdrop-blur-md border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center transform hover:scale-[1.02] transition-transform duration-500">
                          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-secondary mb-4 ring-4 ring-white/5" />
                          <h3 className="text-lg font-semibold text-white">Sarah Creator</h3>
                          <p className="text-sm text-muted-foreground mb-6">@sarahcreates</p>
                          <div className="w-full space-y-3">
                            {[1, 2, 3].map((i) => (
                              <div key={i} className="h-12 w-full rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors flex items-center px-4">
                                <div className="h-8 w-8 rounded-full bg-white/5" />
                                <div className="ml-3 h-2 w-20 rounded-full bg-white/10" />
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Stats Card */}
                        <div className="md:col-span-2 space-y-6">
                           <div className="grid grid-cols-2 gap-4">
                              <div className="bg-card/50 backdrop-blur-md border border-white/5 rounded-2xl p-6">
                                <p className="text-sm text-muted-foreground mb-2">Total Views</p>
                                <p className="text-3xl font-bold text-white">124.5K</p>
                                <div className="mt-2 flex items-center text-xs text-emerald-400">
                                  <TrendingUp className="h-3 w-3 mr-1" /> +12% this week
                                </div>
                              </div>
                              <div className="bg-card/50 backdrop-blur-md border border-white/5 rounded-2xl p-6">
                                <p className="text-sm text-muted-foreground mb-2">Active Links</p>
                                <p className="text-3xl font-bold text-white">15</p>
                                <div className="mt-2 flex items-center text-xs text-primary">
                                  <Shield className="h-3 w-3 mr-1" /> 100% Protected
                                </div>
                              </div>
                           </div>
                           <div className="bg-card/50 backdrop-blur-md border border-white/5 rounded-2xl p-6 h-[200px] flex items-center justify-center relative overflow-hidden">
                              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                              <div className="text-center">
                                <Globe className="h-12 w-12 text-muted-foreground/20 mx-auto mb-4" />
                                <p className="text-muted-foreground">Real-time global traffic map</p>
                              </div>
                           </div>
                        </div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-4 py-24">
          <div className="text-center mb-16">
             <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
               Everything you need to grow
             </h2>
             <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
               Powerful tools wrapped in a beautiful interface.
             </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={feature.title} 
                  className="group border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 overflow-hidden"
                >
                  <CardHeader>
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="mt-2 text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/50 group-hover:text-primary transition-colors">
                      {feature.metric}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Workflow / Steps */}
        <section className="relative border-y border-white/5 bg-white/[0.02] py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-3">
              {workflow.map((item, i) => (
                <div key={item.title} className="relative flex flex-col items-center text-center">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-lg shadow-primary/5">
                     <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed max-w-sm">
                    {item.description}
                  </p>
                  {i < workflow.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-[calc(50%+4rem)] w-[calc(100%-8rem)] h-px bg-gradient-to-r from-white/20 to-transparent border-t border-dashed border-white/20" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-24">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent px-6 py-24 text-center sm:px-16">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
            
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">
              Ready to upgrade your connection?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              Join the waitlist today and get early access to the most beautiful link management platform.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button 
                asChild 
                size="lg" 
                className="h-12 px-8 rounded-full bg-white text-black hover:bg-white/90"
              >
                <Link href="/register">
                  Claim your username
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="container mx-auto px-4 py-24 max-w-3xl">
          <h2 className="mb-12 text-center text-3xl font-bold">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <div key={i} className="rounded-xl border border-white/5 bg-white/[0.02] p-6 transition-colors hover:bg-white/[0.05]">
                <h3 className="font-semibold text-lg mb-2">{item.question}</h3>
                <p className="text-muted-foreground">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-12 bg-background">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-bold">LinkVault</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} LinkVault. All rights reserved.
          </div>
          <div className="flex gap-6">
             <Link href="#" className="text-muted-foreground hover:text-white transition-colors">Privacy</Link>
             <Link href="#" className="text-muted-foreground hover:text-white transition-colors">Terms</Link>
             <Link href="#" className="text-muted-foreground hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
