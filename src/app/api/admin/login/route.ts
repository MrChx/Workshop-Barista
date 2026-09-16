import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { password } = await request.json();

  const adminPassword = process.env.ADMIN_PASSWORD;

  if (password === adminPassword) {
    const response = NextResponse.json({ success: true });
    // Set cookie session selama 8 jam
    response.cookies.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 8,
      path: "/",
    });
    return response;
  }

  return NextResponse.json(
    { success: false, message: "Password salah" },
    { status: 401 }
  );
}
