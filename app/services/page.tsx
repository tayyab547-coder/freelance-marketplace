"use client";

import { useState, useEffect, useCallback } from "react";
import ServiceCard from "@/components/ServiceCard";
import { supabase } from "@/lib/supabase";
import type { Service } from "@/types";
import { Search, SlidersHorizontal, Briefcase, X } from "lucide-react";

// Loading skeleton
function ServiceSkeleton() {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-card animate-pulse">
      <div className="h-4 w-24 rounded bg-gray-200 mb-4" />
      <div className="h-5 w-3/4 rounded bg-gray-200 mb-3" />
      <div className="space-y-2 mb-4">
        <div className="h-3 w-full rounded bg-gray-100" />
        <div className="h-3 w-5/6 rounded bg-gray-100" />
        <div className="h-3 w-4/6 rounded bg-gray-100" />
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gray-200" />
          <div className="h-3 w-20 rounded bg-gray-200" />
        </div>
        <div className="h-3 w-16 rounded bg-gray-200" />
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const fetchServices = useCallback(async () => {
    setLoading(true);
    let query = supabase
      .from("services")
      .select("*")
      .order("created_at", { ascending: false });

    if (search.trim()) {
      query = query.ilike("title", `%${search.trim()}%`);
    }
    if (minPrice !== "") {
      query = query.gte("price", Number(minPrice));
    }
    if (maxPrice !== "") {
      query = query.lte("price", Number(maxPrice));
    }

    const { data, error } = await query;
    if (!error && data) {
      setServices(data as Service[]);
    }
    setLoading(false);
  }, [search, minPrice, maxPrice]);

  useEffect(() => {
    const timer = setTimeout(() => fetchServices(), 300);
    return () => clearTimeout(timer);
  }, [fetchServices]);

  const clearFilters = () => {
    setSearch("");
    setMinPrice("");
    setMaxPrice("");
  };

  const hasFilters = search || minPrice || maxPrice;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl font-bold text-gray-900">Browse Services</h1>
          <p className="mt-2 text-gray-500">
            Discover professional services from top freelancers
          </p>

          {/* Search + Filter bar */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search services…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <button
              onClick={() => setShowFilters((v) => !v)}
              className={`inline-flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                showFilters
                  ? "border-brand-500 bg-brand-50 text-brand-700"
                  : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {hasFilters && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white">
                  !
                </span>
              )}
            </button>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
              >
                <X className="h-4 w-4" />
                Clear
              </button>
            )}
          </div>

          {/* Expanded filters */}
          {showFilters && (
            <div className="mt-4 flex flex-wrap gap-4 p-4 rounded-lg bg-gray-50 border border-gray-200">
              <div className="flex flex-col gap-1">
                <label className="label">Min Price (\$)</label>
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="input-field w-36"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="label">Max Price (\$)</label>
                <input
                  type="number"
                  min="0"
                  placeholder="Any"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="input-field w-36"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <ServiceSkeleton key={i} />
            ))}
          </div>
        ) : services.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-50">
              <Briefcase className="h-10 w-10 text-brand-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">No services found</h3>
            <p className="text-gray-400 max-w-sm">
              {hasFilters
                ? "Try adjusting your search or filters to find what you're looking for."
                : "No services have been posted yet. Check back soon!"}
            </p>
            {hasFilters && (
              <button onClick={clearFilters} className="btn-primary mt-2">
                <X className="h-4 w-4" /> Clear Filters
              </button>
            )}
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-6">
              Showing <span className="font-semibold text-gray-800">{services.length}</span> service
              {services.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
