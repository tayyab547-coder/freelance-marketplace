import Link from "next/link";
import { Search, Zap, ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient py-24 sm:py-32">
      {/* Decorative blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-white/5 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-white/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white ring-1 ring-white/20 mb-6">
          <Zap className="h-3.5 w-3.5 text-yellow-300" />
          Trusted by 10,000+ freelancers worldwide
        </span>

        {/* Headline */}
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Find the Perfect{" "}
          <span className="relative">
            <span className="text-yellow-300">Freelancer</span>
            <svg
              aria-hidden
              className="absolute -bottom-1 left-0 w-full"
              viewBox="0 0 200 8"
              fill="none"
            >
              <path
                d="M0 6 Q50 1 100 6 Q150 11 200 6"
                stroke="#FCD34D"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </span>{" "}
          for Your Project
        </h1>

        {/* Subheadline */}
        <p className="mt-6 text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
          Browse thousands of professional services, post your project, and get
          matched with skilled freelancers — all in one place.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <Link href="/services" className="btn-white text-base px-8 py-3">
            <Search className="h-5 w-5" />
            Browse Services
          </Link>
          <Link
            href="/post-project"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-white/60 px-8 py-3 text-base font-semibold text-white transition-all duration-200 hover:bg-white/10 hover:border-white"
          >
            Post a Project
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-8">
          {[
            { label: "Active Freelancers", value: "10K+" },
            { label: "Projects Completed", value: "50K+" },
            { label: "Client Satisfaction", value: "98%" },
            { label: "Categories", value: "100+" },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <div className="text-2xl font-extrabold text-white">{value}</div>
              <div className="text-sm text-blue-200">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
