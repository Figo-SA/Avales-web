export const metadata = {
  title: "Dashboard - Mosaic",
  description: "Page description",
};

export default function Dashboard() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      {/* Dashboard actions */}
      <div className="mb-8 sm:flex sm:justify-between sm:items-center">
        <div className="grid justify-start grid-flow-col gap-2 sm:auto-cols-max sm:justify-end"></div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-12 gap-6"></div>
    </div>
  );
}
