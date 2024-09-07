"use client";
import Header from "@/components/main/Header";
import { useEffect } from "react";
import { fetchUserProfile } from "@/utils/authActions";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, []);
  return (
    <>
      <main>
        <Header />
        <h1>ساطلا اپتیک</h1>
      </main>
    </>
  );
}
