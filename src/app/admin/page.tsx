// Root /admin just redirects to dashboard (middleware protects it)
import { redirect } from "next/navigation";
export default function AdminRoot() {
  redirect("/admin/dashboard");
}
