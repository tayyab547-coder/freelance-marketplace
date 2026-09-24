"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { CheckCircle2, AlertCircle, DollarSign, FileText, AlignLeft, Loader2 } from "lucide-react";

interface FormData {
  title: string;
  description: string;
  budget: string;
}

interface FormErrors {
  title?: string;
  description?: string;
  budget?: string;
}

function validate(form: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!form.title.trim()) errors.title = "Title is required.";
  else if (form.title.trim().length < 5) errors.title = "Title must be at least 5 characters.";

  if (!form.description.trim()) errors.description = "Description is required.";
  else if (form.description.trim().length < 20)
    errors.description = "Description must be at least 20 characters.";

  if (!form.budget) errors.budget = "Budget is required.";
  else if (isNaN(Number(form.budget)) || Number(form.budget) <= 0)
    errors.budget = "Budget must be a positive number.";

  return errors;
}

export default function PostProjectPage() {
  const [form, setForm] = useState<FormData>({ title: "", description: "", budget: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [apiError, setApiError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);
    setStatus("idle");
    setApiError("");

    const { error } = await supabase.from("projects").insert({
      title: form.title.trim(),
      description: form.description.trim(),
      budget: Number(form.budget),
    });

    if (error) {
      setApiError(error.message);
      setStatus("error");
    } else {
      setStatus("success");
      setForm({ title: "", description: "", budget: "" });
      setErrors({});
    }
    setSubmitting(false);
  };

  if (status === "success") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-card p-10 text-center space-y-5">
          <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-emerald-50">
            <CheckCircle2 className="h-9 w-9 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Project Posted!</h2>
          <p className="text-gray-500">
            Your project has been submitted successfully. Freelancers will start sending
            proposals shortly.
          </p>
          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={() => setStatus("idle")}
              className="btn-primary w-full justify-center"
            >
              Post Another Project
            </button>
            <a href="/services" className="btn-secondary w-full justify-center">
              Browse Services
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="mx-auto max-w-2xl">
        {/* Page header */}
        <div className="text-center mb-10">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 mb-4">
            <FileText className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Post a Project</h1>
          <p className="mt-2 text-gray-500">
            Describe your project and let skilled freelancers come to you.
          </p>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl shadow-card p-8 sm:p-10">
          {status === "error" && (
            <div className="mb-6 flex items-start gap-3 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Oops!</strong> {apiError || "Something went wrong. Please try again."}
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="label">
                Project Title <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <AlignLeft className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Build a modern e-commerce website"
                  className={`input-field pl-10 ${errors.title ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" : ""}`}
                />
              </div>
              {errors.title && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> {errors.title}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="label">
                Project Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={6}
                placeholder="Describe your project in detail. Include goals, specific requirements, preferred technologies, and any important deadlines…"
                className={`input-field resize-none ${errors.description ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" : ""}`}
              />
              <div className="flex items-start justify-between mt-1.5">
                {errors.description ? (
                  <p className="text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> {errors.description}
                  </p>
                ) : (
                  <span />
                )}
                <span className={`text-xs ${form.description.length < 20 ? "text-gray-400" : "text-emerald-600"}`}>
                  {form.description.length} chars
                </span>
              </div>
            </div>

            {/* Budget */}
            <div>
              <label htmlFor="budget" className="label">
                Budget (USD) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <DollarSign className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  id="budget"
                  name="budget"
                  type="number"
                  min="1"
                  step="1"
                  value={form.budget}
                  onChange={handleChange}
                  placeholder="e.g. 500"
                  className={`input-field pl-10 ${errors.budget ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" : ""}`}
                />
              </div>
              {errors.budget ? (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> {errors.budget}
                </p>
              ) : (
                <p className="mt-1.5 text-xs text-gray-400">
                  Enter your total budget in US Dollars.
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full justify-center text-base py-3"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Posting…
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-5 w-5" />
                  Post Project
                </>
              )}
            </button>
          </form>
        </div>

        {/* Tips card */}
        <div className="mt-6 rounded-xl border border-brand-100 bg-brand-50 p-5">
          <h3 className="text-sm font-semibold text-brand-800 mb-2">💡 Tips for a great project post</h3>
          <ul className="space-y-1.5 text-xs text-brand-700 list-disc list-inside">
            <li>Be specific about what you need — the more detail, the better the proposals.</li>
            <li>Include any preferred tools, frameworks, or technologies.</li>
            <li>Set a realistic budget to attract quality freelancers.</li>
            <li>Mention any deadlines or time constraints upfront.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
