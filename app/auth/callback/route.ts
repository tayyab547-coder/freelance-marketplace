import { createSupabaseServerClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * OAuth / magic-link callback handler.
 * Supabase redirects here after the user confirms their email or
 * completes an OAuth flow. The `code` param is exchanged for a session.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // next param lets us redirect to the page the user was on before auth
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Redirect to an error page if something goes wrong
  return NextResponse.redirect(`${origin}/auth?error=auth_callback_failed`);
}
