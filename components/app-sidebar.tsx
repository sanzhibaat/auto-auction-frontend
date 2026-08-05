"use client";

import { Home, Globe, LogOut, Car, Inbox, Star } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/lib/auth";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { useEffect } from "react";

// Массив с конфигурацией навигации
const navItems = [
  {
    title: "Автомобили",
    url: "/admin/cars",
    icon: Car,
  },
  {
    title: "Заявки",
    url: "/admin/leads",
    icon: Inbox,
  },
  {
    title: "Отзывы",
    url: "/admin/reviews",
    icon: Star,
  },
];

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const { setOpenMobile, isMobile } = useSidebar();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
    router.refresh();
  };

  useEffect(() => {
    if (isMobile) {
      setOpenMobile(false);
    }
  }, [pathname, isMobile, setOpenMobile]);

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="hover:bg-transparent hover:text-sidebar-accent-foreground active:bg-transparent"
              render={
                // <Link href="/admin">
                <div className="flex items-center gap-3">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-accent text-primary-foreground">
                    <Home className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <h1 className="text-base font-semibold leading-tight">
                      Админ-панель
                    </h1>
                    <span className="truncate text-xs text-muted-foreground">
                      АвтоМонголия
                    </span>
                  </div>
                </div>
                // </Link>
              }
            ></SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Меню</SidebarGroupLabel>
          <SidebarMenu>
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.url);
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={isActive}
                    tooltip={item.title}
                    render={
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    }
                  ></SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarSeparator />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Вернуться на сайт"
              render={
                <Link href="/">
                  <Globe />
                  <span>Вернуться на сайт</span>
                </Link>
              }
            ></SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Выйти"
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-all"
              onClick={handleLogout}
            >
              <LogOut />
              <span>Выйти</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
