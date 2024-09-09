import AdminHeader from "@/components/admin/AdminHeader";


export default function AdminLayout({children}){
    return(
        <>
        <section className="h-screen min-h-screen overflow-hidden">
            <AdminHeader />
            <main>{children}</main>
        </section>
        </>
    )
}