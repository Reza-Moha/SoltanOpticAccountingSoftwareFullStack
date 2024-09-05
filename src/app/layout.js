import "@/Styles/globals.css";
import { fontIranSans, fontKalame } from "@/Constants/LocalFonts";

export const metadata = {
  title: "سلطان اپتیک",
  description: "بزرگ ترین مجموعه اپتیک شمال غرب ایران",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${fontKalame.variable} ${fontIranSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
