import AccountHeader from "@/components/account/account-header";
import AccountSidebar from "@/components/account/account-sidebar";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto py-8 px-4 md:py-12">
      <div className="flex flex-col gap-8">
        <AccountHeader />
        <div className="grid grid-cols-1 grid-flow-row md:grid-cols-[300px_1fr] gap-8">
          <AccountSidebar />
          {children}
        </div>
      </div>
    </div>
  );
}
