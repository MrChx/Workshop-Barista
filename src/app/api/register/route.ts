import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function POST(request: NextRequest) {
  const supabase = getSupabase();
  const { name, group } = await request.json();

  if (!name || !group) {
    return NextResponse.json(
      { error: "Nama dan kelompok wajib diisi" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("participants")
    .insert([{ name, group }])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true, data });
}
