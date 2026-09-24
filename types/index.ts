// ─── Domain Models ────────────────────────────────────────────────────────────

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  freelancer_name: string;
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  budget: number;
  created_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
}

// ─── Form Payloads ────────────────────────────────────────────────────────────

export interface PostProjectPayload {
  title: string;
  description: string;
  budget: number;
}

export interface PostServicePayload {
  title: string;
  description: string;
  price: number;
  freelancer_name: string;
}

// ─── API Responses ────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}
