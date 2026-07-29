import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  FileCheck2,
  Ship,
  Gauge,
  Fuel,
  Calendar,
  MapPin,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cars, stats } from "@/lib/data";
import { cn } from "@/lib/utils";
import Image from "next/image";

const featuredCar = cars.find((car) => car.id === "toyota-mark-x-2014");

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24 lg:px-8">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Аукционы Японии напрямую
          </span>
          <h1 className="mt-6 text-balance font-heading text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Японские авто с аукционов —{" "}
            <span className="text-accent">честно и под ключ</span>
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Подбираем, выкупаем и доставляем автомобили с аукционов Японии.
            Реальные аукционные листы, прозрачный расчёт стоимости и доставка по
            всей России.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/#gallery"
              className={buttonVariants({ size: "default" })}
            >
              Смотреть каталог
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/#calculator"
              className={cn(
                buttonVariants({ size: "default", variant: "outline" }),
                "shadow-none",
              )}
            >
              Рассчитать стоимость
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <FileCheck2 className="h-4 w-4 text-accent" /> Оригинальные
              аукционные листы
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-accent" /> Фиксированная цена
              в договоре
            </span>
            <span className="flex items-center gap-2">
              <Ship className="h-4 w-4 text-accent" /> Доставка до вашего города
            </span>
          </div>
        </div>

        <div className="relative">
          <Link href={`/cars/${featuredCar?.id}`} className="group block">
            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm  transition-all duration-300 hover:shadow-xl">
              <div className="relative overflow-hidden">
                <Image
                  src="/toyota-mark-x-2014.webp"
                  alt="Японский автомобиль с аукциона"
                  className="aspect-4/3 w-full object-cover"
                  loading="eager"
                  width={960}
                  height={720}
                />

                <div className="absolute left-3 top-3 flex gap-2">
                  <span className="rounded-full bg-accent/90 px-3 py-1 text-xs font-medium text-accent-foreground backdrop-blur-sm">
                    ★ {featuredCar?.auctionGrade} / 5
                  </span>
                  <span className="rounded-full bg-green-500/90 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    В наличии
                  </span>
                </div>

                {/*<div className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs text-white backdrop-blur-sm">
                  {featuredCar?.auctionHouse}
                </div>*/}
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold group-hover:text-accent transition-colors">
                      {featuredCar?.make} {featuredCar?.model}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {featuredCar?.year} • {featuredCar?.color}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-muted-foreground line-through">
                      ¥ {featuredCar?.priceJpy.toLocaleString()}
                    </p>
                    <p className="text-xl font-bold text-accent">
                      {featuredCar?.priceRub.toLocaleString()} ₽
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-4">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Gauge className="h-3.5 w-3.5" />
                    <span>{featuredCar?.mileage.toLocaleString()} км</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Fuel className="h-3.5 w-3.5" />
                    <span>{featuredCar?.fuel}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{featuredCar?.year}</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{featuredCar?.location}</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent group-hover:gap-2.5 transition-all">
                    Подробнее
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/*<div className="absolute -bottom-10 -left-4 hidden rounded-xl border border-border bg-card p-4 shadow-md sm:block">
            <p className="text-xs text-muted-foreground">
              Средняя оценка аукциона
            </p>
            <p className="font-heading text-2xl font-bold text-accent">
              4.5 / 5
            </p>
          </div>*/}
        </div>
      </div>

      <div className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((s) => (
            <div key={s.label} className="py-8 text-center">
              <p className="font-heading text-3xl font-bold sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
