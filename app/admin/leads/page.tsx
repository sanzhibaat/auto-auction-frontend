import { Inbox } from "lucide-react";
import { AdminLeads } from "@/components/admin/admin-leads";

export default function LeadsPage() {
  return (
    <main className="flex-1 p-6">
      <div className="flex items-center gap-3 mb-8">
        <Inbox className="h-6 w-6 text-muted-foreground" />
        <h1 className="text-2xl font-semibold tracking-tight">Заявки</h1>
      </div>
      <AdminLeads />
    </main>
  );
}
