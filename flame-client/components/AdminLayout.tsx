import AdminNavbar from "./AdminNavbar";

export default function AdminLayout({children}: {children: React.ReactNode;}) {
  return (
    <>
      <AdminNavbar/>
      <main className="flex flex-col pr-8 pl-8">{children}</main>
    </>
  )
}