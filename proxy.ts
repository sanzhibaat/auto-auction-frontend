import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// Пути, которые требуют аутентификации
const protectedPaths = ["/admin/:path*"];

// Исключения (публичные пути внутри /admin)
const publicPaths = ["/login", "/login/"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Проверяем, является ли путь защищенным
  const isProtected = protectedPaths.some((path) => {
    if (path === "/admin/:path*") {
      return pathname.startsWith("/admin");
    }
    return pathname == path;
  });

  // Проверяем, является ли путь публичным внутри /admin
  const isPublic = publicPaths.some((path) => pathname === path);

  // Если путь не защищен или публичный, пропускаем
  if (!isProtected || isPublic) {
    return NextResponse.next();
  }

  // Проверяем наличие токена в cookie
  const token = request.cookies.get("auth_token")?.value;
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Опционально: проверяем валидность токена через бэкенд
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const response = await fetch(`${API_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // Рекомендуется добавить кэширование no-store,
      // чтобы запросы авторизации не кэшировались случайно
      cache: "no-store",
    });

    if (!response.ok) {
      // Токен невалиден - удаляем cookie и редиректим
      const redirectResponse = NextResponse.redirect(
        new URL("/login", request.url),
      );
      redirectResponse.cookies.delete("auth_token");

      // Сохраняем параметр `from` при редиректе из-за невалидного токена
      redirectResponse.cookies.set("redirect_from", pathname);
      return redirectResponse;
    }
  } catch (error) {
    // При ошибке сети пропускаем - бэкенд сам проверит при запросах
    console.error("Auth check error:", error);
  }

  return NextResponse.next();
}

// Конфигурация proxy (ранее middleware config)
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
