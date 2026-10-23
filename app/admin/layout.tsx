import { redirect } from "next/navigation";
import isAuthorized from "@/app/api/auth/[...nextauth]/auth-helpers";
import NavbarAdmin from "@/app/admin/components/NavbarAdmin";

// Schützt alle Seiten unter /admin. Der Redirect ist relativ und hängt
// damit nicht davon ab, unter welchem Host die Anfrage beim Server ankommt.
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAuthorized())) {
    redirect("/auth/login");
  }

  return (
    <div className="mx-auto max-w-[96rem] lg:flex lg:items-start lg:gap-8 lg:px-6 lg:py-8">
      <NavbarAdmin />
      <main className="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-0 lg:py-0">{children}</main>
    </div>
  );
}
