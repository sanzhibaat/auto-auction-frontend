import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Send request to backend
    const response = await fetch(`${API_URL}/api/auth/login-json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    // ВАЖНО: Проверяем ответ и парсим JSON безопасно!
    // Если бэкенд вернул ошибку (например 401 или 422), response.ok будет false
    if (!response.ok) {
      // Пытаемся распарсить ошибку, если не получается — отдаем дефолтный текст
      const errorData = await response.json().catch(() => null);
      return NextResponse.json(
        { detail: errorData?.detail || "Неверный email или пароль" },
        { status: response.status },
      );
    }

    const data = await response.json();

    // Set httpOnly cookie with token
    const cookieStore = await cookies();
    cookieStore.set({
      name: "auth_token",
      value: data.access_token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: data.expires_in, // seconds
    });
    // Return successful response whitout token
    return NextResponse.json({ message: " Login Successful" }, { status: 200 });
  } catch (error) {
    console.error("Login proxy error: ", error);
    return NextResponse.json({ detail: "Internal Server Error" }, { status: 500 });
  }
}
