import { AdminSidebar } from "@/components/admin/main/admin-sidebar";
import { AdminHeader } from "@/components/admin/main/admin-header";
import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />
      <div className="grid flex-1 md:grid-cols-[240px_1fr]">
        <AdminSidebar />
        <main className="flex flex-col">
          <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
