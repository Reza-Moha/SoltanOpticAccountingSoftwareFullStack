"use client";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { EditeUserSection } from "@/app/(admin)/admin/_components/Loadings";
import { useSelector } from "react-redux";

export default function AdminHeader() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <header className="sticky h-16 bg-slate-900 text-secondary-50">
        <div className="h-full flex items-center justify-between px-5">
          <div className="flex-1">
            <button>
              <Link href={"admin/accounting"}>حسابداری</Link>
            </button>
          </div>
          <Link
            href={"admin/me"}
            className="flex items-center gap-3 rounded-lg"
          >
            <div className="inline-flex items-center">
              {user?.profileImage ? (
                <div className="rounded-full border-2 border-secondary-500 overflow-hidden select-none w-12 h-12">
                  <Image
                    width="44"
                    height="44"
                    className="object-cover rounded-full"
                    src={`${process.env.NEXT_PUBLIC_API_URL}/${user.profileImage}`}
                    alt={`${user?.fullName}`}
                  />
                </div>
              ) : (
                <div className="bg-secondary-800 rounded-full p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                </div>
              )}
              <Suspense fallback={<EditeUserSection />}>
                <div className="flex flex-col items-center px-2">
                  <span>{user?.fullName}</span>
                  <span>{user?.phoneNumber}</span>
                </div>
              </Suspense>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </Link>
        </div>
      </header>
    </>
  );
}
