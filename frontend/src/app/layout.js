import "@/styles/globals.css";
import { fontIranSans, fontKalame } from "@/constants/LocalFonts";
import ClientProvider from "@/components/tools/ClientProvider";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "سلطان اپتیک",
  description: "بزرگ ترین مجموعه اپتیک شمال غرب ایران",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" className="light-mode">
      <body
        className={`${fontKalame.variable} ${fontIranSans.variable} antialiased  min-h-screen `}
      >
        <ClientProvider>
          <Toaster containerClassName="!font-iranSans text-sm" />
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
