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
  const { name, group, age } = await request.json();

  if (!name || !group || !age) {
    return NextResponse.json(
      { error: "Nama, kelompok, dan usia wajib diisi" },
      { status: 400 }
    );
  }

  const parsedAge = Number(age);
  if (isNaN(parsedAge) || parsedAge <= 0 || parsedAge > 120) {
    return NextResponse.json(
      { error: "Usia tidak valid" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("participants")
    .insert([{ name, group, age: parsedAge }])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true, data });
}
