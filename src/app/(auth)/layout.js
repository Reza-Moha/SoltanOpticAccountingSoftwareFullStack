export const metadata = {
  title: "صفحه ورود|ثبت نام",
  description: "صفحه ورود | ثبت نام مجموعه سلطان اپتیک",
};

export default function AuthLayout({ children }) {
  return (
    <section className="min-h-screen overflow-hidden bg-gradient-to-bl from-gray-700 via-gray-900 to-black items-center justify-center">
      {children}
    </section>
  );
}
