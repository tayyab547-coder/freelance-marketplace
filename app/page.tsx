import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import ServiceCard from "@/components/ServiceCard";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import type { Service } from "@/types";
import {
  Search,
  Briefcase,
  ShieldCheck,
  Star,
  Users,
  FolderOpen,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

// ── Feature cards data ────────────────────────────────────────────────────────
const features = [
  {
    icon: Search,
    title: "Browse Services",
    description:
      "Explore thousands of professional services across design, development, writing, marketing, and more.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Briefcase,
    title: "Post Projects",
    description:
      "Describe your project, set your budget, and receive competitive proposals from top freelancers.",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description:
      "Our escrow payment system keeps your money safe until you are completely satisfied with the work.",
    color: "bg-violet-50 text-violet-600",
  },
];

// ── How it works steps ────────────────────────────────────────────────────────
const steps = [
  {
    step: "01",
    title: "Post Your Project",
    description:
      "Tell us what you need done. Add details about your project scope, budget, and timeline.",
  },
  {
    step: "02",
    title: "Review Proposals",
    description:
      "Receive bids from skilled freelancers. Review their portfolios, ratings, and experience.",
  },
  {
    step: "03",
    title: "Hire & Get It Done",
    description:
      "Choose the best fit, collaborate seamlessly, and release payment when you're 100% happy.",
  },
];

// ── Stats ─────────────────────────────────────────────────────────────────────
const stats = [
  { icon: Users, value: "10,000+", label: "Freelancers" },
  { icon: FolderOpen, value: "50,000+", label: "Projects Completed" },
  { icon: Star, value: "4.9/5", label: "Average Rating" },
  { icon: ShieldCheck, value: "100%", label: "Secure Payments" },
];

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function HomePage() {
  const supabase = createSupabaseServerClient();
  const { data: services } = await supabase
    .from("services")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(6);

  const featuredServices: Service[] = services ?? [];

  return (
    <>
      {/* ── Hero ── */}
      <HeroSection />

      {/* ── Stats Banner ── */}
      <section className="border-y border-gray-100 bg-white py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center text-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50">
                  <Icon className="h-5 w-5 text-brand-600" />
                </div>
                <dt className="text-2xl font-bold text-gray-900">{value}</dt>
                <dd className="text-sm text-gray-500">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-heading">Everything You Need to Succeed</h2>
            <p className="section-sub">
              FreelanceHub gives you the tools to hire top talent or land great
              projects — all in one powerful platform.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {features.map(({ icon: Icon, title, description, color }) => (
              <div key={title} className="card text-center">
                <div className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${color}`}>
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-heading">How FreelanceHub Works</h2>
            <p className="section-sub">
              Get started in minutes. Our simple three-step process makes
              hiring freelancers fast and stress-free.
            </p>
          </div>
          <div className="relative grid grid-cols-1 gap-10 sm:grid-cols-3">
            {/* Connector lines (desktop only) */}
            <div
              aria-hidden
              className="hidden sm:block absolute top-8 left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] h-0.5 bg-brand-100"
            />
            {steps.map(({ step, title, description }) => (
              <div key={step} className="relative flex flex-col items-center text-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-600 text-xl font-black text-white shadow-lg ring-4 ring-brand-100 z-10">
                  {step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-xs">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Services ── */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <h2 className="section-heading text-left">Featured Services</h2>
              <p className="mt-3 text-gray-500 text-base">
                Hand-picked services from our top-rated freelancers.
              </p>
            </div>
            <Link href="/services" className="btn-primary shrink-0">
              View All Services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {featuredServices.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-50">
                <Briefcase className="h-8 w-8 text-brand-400" />
              </div>
              <p className="text-lg font-medium text-gray-700">No services yet</p>
              <p className="text-sm text-gray-400">
                Services will appear here once freelancers start posting.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-hero-gradient py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-lg text-blue-100 max-w-xl mx-auto">
            Join thousands of clients and freelancers already using FreelanceHub
            to get great work done.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link href="/post-project" className="btn-white text-base px-8 py-3">
              <CheckCircle className="h-5 w-5" />
              Post a Project — It's Free
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white/60 px-8 py-3 text-base font-semibold text-white hover:bg-white/10 hover:border-white transition-all duration-200"
            >
              <Search className="h-5 w-5" />
              Browse Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
