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

const socialProof = [
  "CreatorHub",
  "StackCommerce",
  "Refersion",
  "Impact",
  "LTK Collective",
  "Lemon8",
];

const heroStats = [
  { label: "broken links prevented", value: "182K" },
  { label: "creators protected", value: "12,940" },
  { label: "avg. revenue saved", value: "$4.8K" },
];

const features = [
  {
    title: "Live Link Monitoring",
    metric: "< 60s alerts",
    description:
      "We ping every affiliate URL every few minutes, across regions, before your audience ever clicks.",
  },
  {
    title: "Auto Healing Suggestions",
    metric: "AI powered",
    description:
      "Broken storefront? We scan the product catalog and recommend replacement URLs instantly.",
  },
  {
    title: "Revenue Attribution",
    metric: "+23% clarity",
    description:
      "Sync Stripe + Shopify to see which link, platform, and campaign drove actual dollars.",
  },
  {
    title: "LinkVault Guardrails",
    metric: "Pro exclusive",
    description:
      "Limit teammates, expiry, and territory routing so every launch stays compliant.",
  },
];

const workflow = [
  {
    step: "1",
    title: "Drop in your existing links",
    description:
      "Import from spreadsheets, Shopify, or paste the URL slug. Our parser detects merchants automatically.",
  },
  {
    step: "2",
    title: "LinkVault takes watch",
    description:
      "Health checks, uptime history, and geo-testing run on autopilot. You only hear from us when action matters.",
  },
  {
    step: "3",
    title: "Optimize what converts",
    description:
      "Rank links by revenue, CTR, and latency. Push the winners to your Link in Bio or storefront in one click.",
  },
];

const faq = [
  {
    question: "Can LinkVault watch international storefronts?",
    answer:
      "Yes. We rotate through localized proxies so you know when Amazon UK or EU product pages disappear before customers do.",
  },
  {
    question: "Do you integrate with my affiliate network?",
    answer:
      "We plug into Rakuten, Impact, ShareASale, CJ, and any UTM-parameterized link. Custom webhooks keep ClickBank or bespoke programs in-sync.",
  },
  {
    question: "Will monitoring slow my links down?",
    answer:
      "Never. We run headless checks from our own infrastructure—your audience always hits the original merchant domain directly.",
  },
  {
    question: "What happens if I go over the free quota?",
    answer:
      "We’ll keep your first three links protected. Upgrade to Pro any time for unlimited URLs, faster checks, and Guardrails.",
  },
];

export default function Home() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [activeLink, setActiveLink] = useState<number | null>(null);

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
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-background">
      <div className="orb orb-animate -top-32 left-10 h-64 w-64 bg-purple-500/40" />
      <div className="orb orb-animate animation-delay-2000 -bottom-20 right-0 h-72 w-72 bg-cyan-500/30" />
      <div className="orb orb-animate animation-delay-4000 top-1/2 left-1/2 h-96 w-96 bg-emerald-500/20" />

      <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl transition-all duration-300">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link 
            href="/" 
            className="group text-2xl font-semibold tracking-tight text-white transition-all hover:scale-105"
          >
              <span className="bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              LinkVault
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Button 
              asChild 
              variant="ghost" 
              className="text-sm font-medium transition-all hover:scale-105 hover:bg-white/10"
            >
              <Link href="/login">Sign In</Link>
            </Button>
            <Button 
              asChild 
              size="sm" 
              className="group relative overflow-hidden px-6 text-sm font-semibold shadow-lg shadow-primary/50 transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/60"
            >
              <Link href="/register">
                <span className="relative z-10">Start free</span>
                <div className="absolute inset-0 z-0 bg-linear-to-r from-primary to-secondary opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-x-0 top-0 h-[600px] opacity-60 blur-3xl animate-gradient"
            style={{ backgroundImage: "var(--hero-gradient)" }}
          />
          <div className="container relative z-10 mx-auto grid gap-12 px-4 py-24 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
            <div className={`space-y-8 text-center lg:text-left transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-primary shadow-lg shadow-primary/20 animate-pulse-subtle">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                AI Guarded Links
              </span>
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                Monitor every affiliate link.{" "}
                <span className="animate-gradient-text bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent bg-300%">
                  Never miss a broken URL again.
                </span>
              </h1>
              <p className="text-lg text-muted-foreground lg:text-xl leading-relaxed">
                LinkVault watches your global storefronts, pings merchants every few minutes, and sends actionable fixes
                before your audience hits dead ends.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <Button 
                  asChild 
                  size="lg" 
                  className="group h-14 px-8 text-base font-semibold shadow-2xl shadow-primary/50 transition-all hover:scale-105 hover:shadow-primary/70"
                >
                  <Link href="/register">
                    <span className="flex items-center gap-2">
                      Protect my links
                      <svg 
                        className="h-5 w-5 transition-transform group-hover:translate-x-1" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="group h-14 border-white/30 px-8 text-base text-white backdrop-blur-sm transition-all hover:scale-105 hover:border-white/50 hover:bg-white/10"
                >
                  <Link href="/login">
                    <span className="flex items-center gap-2">
                      View live demo
                      <svg 
                        className="h-5 w-5 transition-transform group-hover:scale-110" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                  </Link>
                </Button>
              </div>
              <div className="grid gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur-sm sm:grid-cols-3 shadow-xl hover:shadow-2xl transition-shadow">
                {heroStats.map((stat, i) => (
                  <div 
                    key={stat.label}
                    className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    style={{ transitionDelay: `${i * 100 + 600}ms` }}
                  >
                    <p className="text-3xl font-semibold text-white">{stat.value}</p>
                    <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className={`relative transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              <div className="glass-panel glow-border relative rounded-3xl p-6 transition-all hover:scale-[1.02]">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Link health</p>
                    <p className="text-3xl font-semibold text-white">99.98%</p>
                  </div>
                  <span className="relative rounded-full bg-emerald-500/20 px-4 py-1 text-sm font-semibold text-emerald-300">
                    <span className="absolute -left-1 -top-1 flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                    </span>
                    Stable
                  </span>
                </div>
                <div className="space-y-4">
                  {[
                    { name: "Amazon Prime Day", status: "Healthy", latency: "284ms", icon: "✓" },
                    { name: "Target Cyber Set", status: "Warning", latency: "812ms", icon: "⚠" },
                    { name: "BestBuy Creator Kit", status: "Broken", latency: "-", icon: "✕" },
                  ].map((link, i) => (
                    <div
                      key={link.name}
                      onMouseEnter={() => setActiveLink(i)}
                      onMouseLeave={() => setActiveLink(null)}
                      className={`rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition-all cursor-pointer ${
                        activeLink === i ? 'scale-105 border-white/30 bg-white/10 shadow-lg' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-medium flex items-center gap-2">
                          <span className={`text-lg ${
                            link.status === "Healthy"
                              ? "text-emerald-300"
                              : link.status === "Warning"
                                ? "text-amber-300"
                                : "text-rose-300"
                          }`}>
                            {link.icon}
                          </span>
                          {link.name}
                        </p>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            link.status === "Healthy"
                              ? "bg-emerald-500/20 text-emerald-300"
                              : link.status === "Warning"
                                ? "bg-amber-500/20 text-amber-300"
                                : "bg-rose-500/20 text-rose-300"
                          }`}
                        >
                          {link.status}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">Latency {link.latency}</p>
                    </div>
                  ))}
                </div>
                 <div className="mt-6 rounded-2xl border border-primary/30 bg-linear-to-r from-primary/20 to-secondary/20 px-4 py-3 text-sm text-white shadow-lg shadow-primary/10 animate-pulse-subtle">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60 flex items-center gap-2">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Next action
                  </p>
                  <p className="font-medium mt-1">
                    Replace BestBuy Creator Kit with new SKU recommended by LinkVault AI.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social proof */}
        <section className="border-y border-border/40 bg-card/30">
          <div className="container mx-auto px-4 py-10">
            <p className="mb-6 text-center text-xs uppercase tracking-[0.4em] text-muted-foreground">
              Trusted by commerce teams at
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              {socialProof.map((logo) => (
                <span key={logo} className="rounded-full border border-white/10 px-5 py-2">
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="container mx-auto px-4 py-20">
          <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
               <p className="text-xs uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                 <span className="h-px w-8 bg-linear-to-r from-transparent to-primary" />
                Feature stack
              </p>
              <h2 className="mt-3 text-4xl font-semibold">The link in bio control room you actually needed.</h2>
            </div>
            <p className="text-muted-foreground lg:w-1/3 leading-relaxed">
              Automations, AI resolution, and revenue analytics so you can ship campaigns with confidence.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {features.map((feature, i) => (
                <Card
                key={feature.title}
                className="group relative overflow-hidden border-white/10 bg-linear-to-br from-card/80 to-card/40 transition-all hover:scale-[1.02] hover:border-white/20 hover:shadow-2xl hover:shadow-primary/10"
              >
                 <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-secondary/5 opacity-0 transition-opacity group-hover:opacity-100" />
                <CardHeader className="relative">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-primary transition-all group-hover:scale-110 group-hover:bg-primary/30">
                        {i + 1}
                      </span>
                      {feature.title}
                    </CardTitle>
                    <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-primary shadow-lg shadow-primary/20 transition-all group-hover:border-primary/50 group-hover:bg-primary/20">
                      {feature.metric}
                    </span>
                  </div>
                  <CardDescription className="leading-relaxed text-base text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Workflow */}
          <section className="relative border-y border-border/40 bg-muted/20 py-20 overflow-hidden">
           <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-secondary/5" />
          <div className="container relative z-10 mx-auto px-4">
            <div className="mb-12 text-center">
              <p className="text-xs uppercase tracking-[0.4em] text-primary">Workflow</p>
              <h2 className="mt-3 text-3xl font-semibold">Proof that setup only takes one coffee.</h2>
            </div>
            <div className="grid gap-8 lg:grid-cols-3">
              {workflow.map((step, index) => (
                <div key={step.title} className="group relative rounded-3xl border border-white/10 bg-card/40 p-6 backdrop-blur-sm transition-all hover:scale-105 hover:border-white/20 hover:bg-card/60 hover:shadow-2xl hover:shadow-primary/10">
                   <div className="absolute -top-3 -right-3 h-20 w-20 rounded-full bg-linear-to-br from-primary/20 to-secondary/20 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
                   <div className="relative mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-primary/20 to-secondary/20 text-lg font-bold text-white shadow-lg transition-all group-hover:scale-110 group-hover:shadow-primary/30">
                    {step.step}
                  </div>
                  <h3 className="mb-2 text-xl font-medium">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  {index < workflow.length - 1 && (
                    <div className="mt-6 flex items-center justify-center">
                      <svg className="h-5 w-5 text-primary/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Live Preview */}
        <section className="container mx-auto px-4 py-20">
          <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.4em] text-primary">Live Ops</p>
              <h2 className="text-4xl font-semibold">Run experiments without touching your bio again.</h2>
              <p className="text-muted-foreground">
                Swap top performers into your bio, schedule seasonal offers, and preview the experience across devices.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">CTR Lift</p>
                  <p className="text-2xl font-semibold text-white">+37%</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Avg. latency</p>
                  <p className="text-2xl font-semibold text-white">312ms</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">A/B tests</p>
                  <p className="text-2xl font-semibold text-white">6 running</p>
                </div>
              </div>
            </div>
            <div className="glass-panel glow-border rounded-[32px] p-6">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-medium text-white">LinkVault /linkinbio</p>
                <span className="text-xs text-muted-foreground">Preview · Mobile</span>
              </div>
              <div className="space-y-3">
                {["Creator Studio", "Holiday Stack", "Must-Have Gear", "LinkVault Academy"].map((title, index) => (
                  <div
                    key={title}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <div>
                      <p className="font-medium text-white">{title}</p>
                      <p className="text-xs text-muted-foreground">Tap-through rate {18 + index * 6}%</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs text-primary">
                      Spotlight
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-2xl border border-white/10 bg-primary/20 px-4 py-3">
                <p className="text-sm font-medium text-white">Next scheduled rotation</p>
                <p className="text-xs text-muted-foreground">Friday · 9:00am EST · Holiday Stack → Creator Studio</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
          <section className="relative overflow-hidden border-y border-border/40 py-20">
           <div className="absolute inset-0 animate-gradient bg-linear-to-br from-primary/20 via-secondary/10 to-background opacity-70" />
          <div className="orb orb-animate top-0 right-1/4 h-96 w-96 bg-primary/20" />
          <div className="container relative z-10 mx-auto px-4">
            <div className="mb-10 text-center">
              <p className="text-xs uppercase tracking-[0.4em] text-primary">Pricing</p>
              <h2 className="mt-3 text-4xl font-semibold">Choose the safety net that fits your orbit.</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:max-w-4xl lg:mx-auto">
              <Card className="group border-white/15 bg-background/80 backdrop-blur-sm transition-all hover:scale-105 hover:border-white/30 hover:shadow-2xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">Starter</CardTitle>
                      <CardDescription>For creators testing the waters.</CardDescription>
                    </div>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-muted-foreground">Free forever</span>
                  </div>
                  <div className="mt-4">
                    <span className="text-4xl font-semibold text-white">$0</span>
                    <span className="text-muted-foreground">/mo</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    {[
                      "3 protected links",
                      "24h health scans",
                      "Email + Slack alerts",
                      "Basic revenue snapshots",
                    ].map((perk) => (
                      <li key={perk} className="flex items-center gap-2">
                        <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {perk}
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="outline" className="mt-6 w-full border-white/30 text-white transition-all hover:scale-105 hover:border-white/50">
                    <Link href="/register">Start free</Link>
                  </Button>
                </CardContent>
              </Card>
               <Card className="group relative overflow-hidden border-primary bg-card/90 shadow-[0_25px_60px_rgba(8,145,178,0.35)] transition-all hover:scale-105 hover:shadow-[0_30px_80px_rgba(8,145,178,0.5)]">
                 <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-secondary/10 opacity-0 transition-opacity group-hover:opacity-100" />
                <CardHeader className="relative">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">Pro</CardTitle>
                      <CardDescription>Unlimited safety + optimization tools.</CardDescription>
                    </div>
                    <span className="animate-pulse-subtle rounded-full bg-primary/20 px-4 py-1 text-xs font-semibold text-primary shadow-lg shadow-primary/30">
                      Most popular
                    </span>
                  </div>
                  <div className="mt-4">
                    <span className="text-4xl font-semibold text-white">$19</span>
                    <span className="text-muted-foreground">/mo</span>
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <ul className="space-y-3 text-sm">
                    {[
                      "Unlimited links & destinations",
                      "5-minute health scans + geo checks",
                      "AI auto-healing & Guardrails",
                      "Revenue attribution & A/B testing",
                      "Priority support + audit log",
                    ].map((perk) => (
                      <li key={perk} className="flex items-center gap-2 text-white">
                        <svg className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {perk}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="group/button mt-6 w-full h-12 text-base font-semibold shadow-lg shadow-primary/50 transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/70">
                    <Link href="/register">
                      <span className="flex items-center justify-center gap-2">
                        Upgrade to Pro
                        <svg className="h-4 w-4 transition-transform group-hover/button:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="container mx-auto px-4 py-20">
          <div className="mb-12 text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-primary">Support</p>
            <h2 className="mt-3 text-3xl font-semibold">Questions, answered before you ping us.</h2>
          </div>
          <div className="mx-auto grid max-w-4xl gap-4">
            {faq.map((item, i) => (
              <Card 
                key={item.question} 
                className="group border-white/10 bg-card/70 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-card/80 hover:shadow-xl hover:shadow-primary/5"
              >
                <CardHeader>
                  <CardTitle className="text-xl flex items-start gap-3">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary transition-all group-hover:scale-110 group-hover:bg-primary/30">
                      {i + 1}
                    </span>
                    {item.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed pl-9">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden rounded-[48px] border border-white/20 bg-linear-to-br from-primary/40 via-secondary/30 to-background mx-4 mb-20 shadow-2xl shadow-primary/20">
          <div className="absolute inset-0 animate-gradient opacity-30" style={{ backgroundImage: "var(--hero-gradient)" }} />
          <div className="orb orb-animate -top-20 left-1/4 h-64 w-64 bg-primary/30" />
          <div className="orb orb-animate animation-delay-2000 -bottom-20 right-1/4 h-64 w-64 bg-secondary/30" />
          <div className="relative z-10 px-6 py-16 text-center sm:px-12">
             <p className="text-xs uppercase tracking-[0.4em] text-white/80 flex items-center justify-center gap-2">
               <span className="h-px w-8 bg-linear-to-r from-transparent to-white/50" />
              Deploy
               <span className="h-px w-8 bg-linear-to-l from-transparent to-white/50" />
            </p>
            <h2 className="mt-4 text-4xl font-semibold text-white lg:text-5xl">
              Patch every broken link before your audience ever sees it.
            </h2>
            <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Join the teams who caught 182K broken URLs before launch week.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button 
                asChild 
                size="lg" 
                className="group h-14 px-8 text-base font-semibold shadow-2xl shadow-primary/50 transition-all hover:scale-105 hover:shadow-primary/70"
              >
                <Link href="/register">
                  <span className="flex items-center gap-2">
                    Start free protection
                    <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.586-3.586a2 2 0 012.828 0l2 2a2 2 0 010 2.828l-8.414 8.414a2 2 0 01-1.414.586H5a2 2 0 01-2-2v-4.172a2 2 0 01.586-1.414l8.414-8.414z" />
                    </svg>
                  </span>
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="group h-14 border-white/40 bg-white/10 px-8 text-base text-white backdrop-blur-sm transition-all hover:scale-105 hover:border-white/60 hover:bg-white/20"
              >
                <Link href="/login">
                  <span className="flex items-center gap-2">
                    Book a teardown
                    <svg className="h-5 w-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 bg-background/80 py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-xl font-semibold text-white">LinkVault</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                The ops layer protecting every affiliate, creator, and commerce team from broken links.
              </p>
            </div>
            {[
              { title: "Product", links: ["Features", "Pricing", "Status"] },
              { title: "Company", links: ["About", "Blog", "Careers"] },
              { title: "Legal", links: ["Privacy", "Terms", "Security"] },
            ].map((column) => (
              <div key={column.title}>
                <h4 className="text-sm uppercase tracking-[0.3em] text-muted-foreground">{column.title}</h4>
                <ul className="mt-4 space-y-2 text-sm text-white/70">
                  {column.links.map((link) => (
                    <li key={link}>
                      <Link href="/" className="transition hover:text-white">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} LinkVault. Built for the affiliate internet.
          </div>
        </div>
      </footer>
    </div>
  );
}
