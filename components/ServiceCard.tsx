import Link from "next/link";
import type { Service } from "@/types";
import { DollarSign, ArrowRight } from "lucide-react";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const initials = service.freelancer_name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const avatarColors = [
    "bg-violet-500",
    "bg-emerald-500",
    "bg-rose-500",
    "bg-amber-500",
    "bg-cyan-500",
    "bg-brand-600",
  ];
  // Deterministic color based on name
  const colorIndex =
    service.freelancer_name.charCodeAt(0) % avatarColors.length;
  const avatarColor = avatarColors[colorIndex];

  return (
    <article className="card flex flex-col gap-4 group">
      {/* Price badge */}
      <div className="flex items-start justify-between">
        <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-inset ring-brand-200">
          <DollarSign className="h-3 w-3" />
          Starting at ${Number(service.price).toFixed(2)}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-gray-900 leading-snug group-hover:text-brand-600 transition-colors line-clamp-2">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 flex-1">
        {service.description}
      </p>

      {/* Freelancer row */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div
            className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${avatarColor}`}
          >
            {initials}
          </div>
          <span className="text-sm font-medium text-gray-700 truncate max-w-[120px]">
            {service.freelancer_name}
          </span>
        </div>

        <Link
          href={`/services/${service.id}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors group/btn"
        >
          View Details
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}
