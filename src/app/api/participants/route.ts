import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// GET - ambil semua peserta
export async function GET(request: NextRequest) {
  const supabase = getSupabase();
  const session = request.cookies.get("admin_session");
  if (!session || session.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("participants")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

// PUT - edit peserta
export async function PUT(request: NextRequest) {
  const supabase = getSupabase();
  const session = request.cookies.get("admin_session");
  if (!session || session.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, name, group, age } = await request.json();

  if (!id || !name || !group || !age) {
    return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
  }

  const parsedAge = Number(age);
  if (isNaN(parsedAge) || parsedAge <= 0 || parsedAge > 120) {
    return NextResponse.json({ error: "Usia tidak valid" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("participants")
    .update({ name, group, age: parsedAge })
    .eq("id", id)
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data || data.length === 0) {
    return NextResponse.json(
      { error: "Gagal update: pastikan kebijakan RLS UPDATE sudah aktif di Supabase." },
      { status: 500 }
    );
  }
  return NextResponse.json({ success: true, data: data[0] });
}

// DELETE - hapus peserta
export async function DELETE(request: NextRequest) {
  const supabase = getSupabase();
  const session = request.cookies.get("admin_session");
  if (!session || session.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await request.json();
  const { error } = await supabase.from("participants").delete().eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
