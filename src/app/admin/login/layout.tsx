// The login page has NO auth protection — it IS the entry point.
// It uses its own minimal layout so the admin layout's session redirect
// does not apply here.
export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
