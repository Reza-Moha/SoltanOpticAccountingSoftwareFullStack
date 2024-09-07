import { useSelector } from "react-redux";
import Link from "next/link";

export default function Header() {
  const { user, isLoading } = useSelector((state) => state.auth);
  return (
    <>
      <header
        className={`z-10 shadow-md bg-inherit mb-10 sticky top-0 transition-all duration-200 border-b border-b-secondary-300 ${
          isLoading ? "blur-sm opacity-70" : "opacity-100 blur-0"
        }`}
      >
        <div className="container xl:max-w-screen-xl">
          <div className="flex justify-between items-center py-2 ">
            {user ? (
              <Link
                href="/dashboard"
                className={` px-5 py-2 rounded bg-green-300 text-green-900`}
              >
                داشبورد
              </Link>
            ) : (
              <Link
                href="/login"
                className={` px-5 py-2 rounded bg-secondary-600 text-slate-100`}
              >
                ثبت نام
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
