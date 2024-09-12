"use client"
import AdminHeader from "@/app/(admin)/admin/_components/Header";
import { fetchUserProfile } from "@/redux/slices/authSlice";
import { useEffect } from 'react';
import { useDispatch } from "react-redux";

export default function AdminLayout({ children }) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUserProfile());

    const intervalId = setInterval(() => {
      dispatch(fetchUserProfile());
    }, 1800000); 

    return () => clearInterval(intervalId);
  }, [dispatch]);

  return (
    <>
      <section className="h-screen min-h-screen overflow-hidden">
        <AdminHeader />
        <main>{children}</main>
      </section>
    </>
  );
}
