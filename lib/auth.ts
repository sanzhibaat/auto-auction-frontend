export async function login(email: string, password: string) {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    // Проверяем, вернул ли сервер JSON.
    // Если сервер вернул статус 204 (No Content) или пустое тело, парсить JSON нельзя.
    const contentType = response.headers.get("content-type");
    const isJson = contentType?.includes("application/json");

    let data = null;
    if (isJson) {
      data = await response.json();
    }

    if (!response.ok) {
      // Если есть JSON и в нем есть detail — показываем его.
      // Иначе выдаем универсальную ошибку.
      throw new Error(
        data?.detail || `Ошибка авторизации (Статус: ${response.status})`,
      );
    }

    return { success: true, message: data.message };
  } catch (error) {
    console.error("Login error: ", error);
    throw error;
  }
}

export async function logout() {
  try {
    await fetch("/api/auth/logout", {
      method: "POST",
    });
    window.location.href = "/admin/login";
  } catch (error) {
    console.error("Logout error:", error);
  }
}

export async function getCurrentUser() {
  try {
    const response = await fetch("/api/auth/me", {
      method: "GET",
      // Важно: 'no-store', чтобы профиль всегда был свежим
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Get user error:", error);
    return null;
  }
}
