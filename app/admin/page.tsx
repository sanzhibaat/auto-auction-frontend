// auto-auction-frontend/app/admin/page.tsx
import { redirect } from "next/navigation";

export default function AdminPage() {
  // Мгновенно перенаправляем на страницу автомобилей
  redirect("/admin/cars");
}
