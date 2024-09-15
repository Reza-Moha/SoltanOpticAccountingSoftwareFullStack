import AsideBasicDefinition from "./_components/asideBasicDefinition";

export default function BasicDefinitionLayout({ children }) {
  return (
    <>
      <div className="h-full grid grid-cols-1 grid-rows-12 md:grid-cols-12 md:grid-rows-1 p-10 sm:pl-0">
        <aside className="bg-secondary-100 rounded-lg shadow-md hidden md:block md:col-span-2 ml-7">
          <AsideBasicDefinition />
        </aside>
        <div className="col-span-1 row-span-9 md:col-span-10 md:overflow-auto">
          {children}
        </div>
      </div>
    </>
  );
}
