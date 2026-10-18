import { redirect } from "next/navigation";
import isAuthorized from "@/app/api/auth/[...nextauth]/auth-helpers";

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

  return <>{children}</>;
}
