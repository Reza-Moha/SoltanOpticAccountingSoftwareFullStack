import AsideBasicDefinition from "./_components/asideBasicDefinition";

export default function BasicDefinitionLayout({ children }) {
  return (
    <>
      <div className="h-screen grid grid-cols-1 grid-rows-12 md:grid-cols-12 md:grid-rows-1 p-10">
        <aside className="bg-secondary-100 rounded-lg shadow-md col-span-1 row-span-3 md:col-span-2">
          <AsideBasicDefinition />
        </aside>
        <div className=" col-span-1 row-span-9 md:col-span-10">{children}</div>
      </div>
    </>
  );
}
