"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function PostProjectPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    budget: "",
  });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [apiError, setApiError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");
    setApiError("");

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setApiError("You must be logged in to post a project.");
      setStatus("error");
      return;
    }

    const { error } = await supabase.from("projects").insert({
      client_id: user.id,
      title: form.title.trim(),
      description: form.description.trim(),
      budget: Number(form.budget),
      status: "open",
    });

    if (error) {
      setApiError(error.message);
      setStatus("error");
    } else {
      setStatus("success");
      setForm({ title: "", description: "", budget: "" });
      setTimeout(() => router.push("/services"), 1500);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Post a Project</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Project Title</label>
          <input
            type="text"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border rounded px-3 py-2"
            placeholder="e.g. Build a landing page"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            required
            rows={5}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border rounded px-3 py-2"
            placeholder="Describe your project in detail..."
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Budget (USD)</label>
          <input
            type="number"
            required
            min="1"
            value={form.budget}
            onChange={(e) => setForm({ ...form, budget: e.target.value })}
            className="w-full border rounded px-3 py-2"
            placeholder="500"
          />
        </div>

        {apiError && (
          <p className="text-red-600 text-sm">{apiError}</p>
        )}
        {status === "success" && (
          <p className="text-green-600 text-sm">Project posted successfully!</p>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Post Project
        </button>
      </form>
    </div>
  );
}