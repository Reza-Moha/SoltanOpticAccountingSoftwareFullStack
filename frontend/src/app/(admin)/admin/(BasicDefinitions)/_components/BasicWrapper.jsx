export default function BasicWrapper({ title, children }) {
  return (
    <section className="h-screen mt-5 md:mt-0 py-1 md:px-10 font-iranSans">
      <div className="container max-w-screen-lg rounded-lg border border-secondary-50">
        <div className="font-bold text-center bg-secondary-100 rounded-lg py-2">
          {title}
        </div>
        {children}
      </div>
    </section>
  );
}
