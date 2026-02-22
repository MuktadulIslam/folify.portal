import { NextRequest, NextResponse } from "next/server";

const SUPER_KEY = process.env.SUPER_KEY || "ilovefolify";
const ADMIN_COOKIE = "admin_session";

export async function POST(req: NextRequest) {
  try {
    const { superKey } = await req.json();

    if (!superKey) {
      return NextResponse.json({ error: "Super key is required" }, { status: 400 });
    }

    if (superKey !== SUPER_KEY) {
      return NextResponse.json({ error: "Invalid super key" }, { status: 403 });
    }

    const response = NextResponse.json({ success: true });
    response.headers.set(
      "Set-Cookie",
      `${ADMIN_COOKIE}=1; HttpOnly; Path=/; SameSite=Lax`
    );
    return response;
  } catch (error) {
    console.error("Admin auth error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.headers.set(
    "Set-Cookie",
    `${ADMIN_COOKIE}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax`
  );
  return response;
}
