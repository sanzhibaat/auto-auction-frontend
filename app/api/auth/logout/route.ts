import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
  return NextResponse.json({ message: "Log out successful" }, { status: 200 });
}
