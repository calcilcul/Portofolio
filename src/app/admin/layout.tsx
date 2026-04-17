// This layout wraps ALL /admin/* routes including /admin/login.
// It must NOT do auth checks — the middleware protects /admin/dashboard only.
// Each sub-route (login, dashboard) has its own layout for UI structure.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
