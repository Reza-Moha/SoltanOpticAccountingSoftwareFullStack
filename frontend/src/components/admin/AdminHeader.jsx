import Link from "next/link";

export default function AdminHeader(){
    return(
        <>
        <header className="sticky h-16 bg-slate-900 text-secondary-50">
            <div className="h-full flex items-center justify-between px-5">
                <div className="flex-1">
                    <button>
                        <Link href="admin/accounting">
                            حسابداری
                        </Link>
                    </button>
                </div>
                <div>
                    خروج
                </div>
            </div>
        </header>
        </>
    )
}