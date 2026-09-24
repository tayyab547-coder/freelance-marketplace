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
          title: string;
          description: string;
          price: number;
          freelancer_name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          price: number;
          freelancer_name: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          price?: number;
          freelancer_name?: string;
          created_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          title: string;
          description: string;
          budget: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          budget: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          budget?: number;
          created_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
