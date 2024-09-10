import AdminHeader from "@/app/(admin)/admin/_components/Header";

export default function AdminLayout({ children }) {
  return (
    <>
      <section className="h-screen min-h-screen overflow-hidden">
        <AdminHeader />
        <main>{children}</main>
      </section>
    </>
  );
}
