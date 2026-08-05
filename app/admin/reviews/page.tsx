import { Star } from "lucide-react";
import { AdminReviews } from "@/components/admin/admin-reviews";

export default function ReviewsPage() {
  return (
    <main className="flex-1 p-6">
      <div className="flex items-center gap-3 mb-8">
        <Star className="h-6 w-6 text-muted-foreground" />
        <h1 className="text-2xl font-semibold tracking-tight">Отзывы</h1>
      </div>
      <AdminReviews />
    </main>
  );
}
