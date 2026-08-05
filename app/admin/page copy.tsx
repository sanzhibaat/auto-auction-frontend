"use client";

import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminCars } from "@/components/admin/admin-cars";
import { AdminLeads } from "@/components/admin/admin-leads";
import { AdminReviews } from "@/components/admin/admin-reviews";
import { Car, Inbox, Star, LogOut, Globe, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/auth";

export default function AdminPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await logout(); // Вызываем API роут для удаления куки
    router.push("/admin/login");
    router.refresh(); // Обновляем кэш маршрутов, чтобы прокси снова проверил токен
  };
  return (
    <main className="min-h-screen bg-secondary">
      <header className="border-b border-border bg-background shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          {/* Левая часть */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Home className="h-4.5 w-4.5" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-base font-semibold leading-tight">
                Админ-панель
              </h1>
              <span className="text-xs text-muted-foreground">
                АвтоМонголия
              </span>
            </div>
          </div>

          {/* Правая часть */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="group flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
            >
              <Globe className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
              <span className="hidden sm:inline">Вернуться на сайт</span>
            </Link>

            <div className="h-5 w-px bg-border mx-1" />

            <button
              onClick={handleLogout}
              className="group flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-muted-foreground shadow-sm hover:border-destructive hover:text-destructive hover:bg-destructive/5 transition-all active:scale-95"
            >
              <LogOut className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              <span className="hidden sm:inline">Выйти</span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6">
        <Tabs defaultValue="cars">
          <TabsList className="mb-6">
            <TabsTrigger value="cars" className="gap-1.5">
              <Car className="h-4 w-4" /> Автомобили
            </TabsTrigger>
            <TabsTrigger value="leads" className="gap-1.5">
              <Inbox className="h-4 w-4" /> Заявки
            </TabsTrigger>
            <TabsTrigger value="reviews" className="gap-1.5">
              <Star className="h-4 w-4" /> Отзывы
            </TabsTrigger>
          </TabsList>
          <TabsContent value="cars">
            <AdminCars />
          </TabsContent>
          <TabsContent value="leads">
            <AdminLeads />
          </TabsContent>
          <TabsContent value="reviews">
            <AdminReviews />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
