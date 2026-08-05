import { Car } from "lucide-react";
import { AdminCars } from "@/components/admin/admin-cars";

export default function CarsPage() {
  return (
    <main className="flex-1 p-6">
      <div className="flex items-center gap-3 mb-8">
        <Car className="h-8 w-8 text-muted-foreground" />
        <h1 className="text-2xl font-semibold tracking-tight">Автомобили</h1>
      </div>
      <AdminCars />
    </main>
  );
}
