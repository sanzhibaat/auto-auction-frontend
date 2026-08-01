import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // 1. Достаем токен из httpOnly cookie
    const token = request.cookies.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Не авторизован" }, { status: 401 });
    }

    // 2. Делаем запрос к бэкенду
    // Здесь NEXT_PUBLIC_API_URL можно заменить на SERVER_API_URL,
    // если серверные переменные (без NEXT_PUBLIC_)
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    const backendResponse = await fetch(`${API_URL}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store", // Не кэшируем ответ, чтобы данные пользователя всегда были свежими
    });

    // 3. Если бэкенд вернул ошибку (токен просрочен или невалиден)
    if (!backendResponse.ok) {
      // Опционально: можно очистить куку, если токен протух
      const errorResponse = NextResponse.json(
        { message: "Сессия истекла" },
        { status: 401 },
      );
      errorResponse.cookies.delete("auth_token");
      return errorResponse;
    }

    // 4. Возвращаем данные пользователя клиенту
    const data = await backendResponse.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("API /api/auth/me error:", error);
    return NextResponse.json(
      { message: "Внутренняя ошибка сервера" },
      { status: 500 },
    );
  }
}
