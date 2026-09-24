// Auto-generated Supabase Database type stubs.
// Run `npx supabase gen types typescript --project-id YOUR_PROJECT_ID` to
// replace these stubs with fully-typed definitions once your project is set up.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      services: {
        Row: {
          id: string;
          freelancer_id: string;
          title: string;
          description: string;
          price: number;
          category: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          freelancer_id: string;
          title: string;
          description: string;
          price: number;
          category: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          freelancer_id?: string;
          title?: string;
          description?: string;
          price?: number;
          category?: string;
          created_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          client_id: string;
          title: string;
          description: string;
          budget: number;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          title: string;
          description: string;
          budget: number;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          client_id?: string;
          title?: string;
          description?: string;
          budget?: number;
          status?: string;
          created_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          role: string;
          bio: string | null;
          skills: string[] | null;
          avatar_url: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          full_name: string;
          email: string;
          role?: string;
          bio?: string | null;
          skills?: string[] | null;
          avatar_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          email?: string;
          role?: string;
          bio?: string | null;
          skills?: string[] | null;
          avatar_url?: string | null;
          created_at?: string;
        };
      };
      proposals: {
        Row: {
          id: string;
          project_id: string;
          freelancer_id: string;
          cover_letter: string;
          bid_amount: number;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          freelancer_id: string;
          cover_letter: string;
          bid_amount: number;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          freelancer_id?: string;
          cover_letter?: string;
          bid_amount?: number;
          status?: string;
          created_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}