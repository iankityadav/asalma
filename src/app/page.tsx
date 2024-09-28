import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center gap-8">
      <div className="flex justify-center h-full mt-8">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-[720px]">
          <div className="sm:text-3xl text-xl text-center tracking-wide font-light text-blue-400 pb-4">
            Asset Allocation Manager
          </div>
          <p className="text-gray-400">
            The Asset Allocation Manager is a web application designed to
            streamline asset management processes for employers. Built with a
            Next.js and React frontend and a Java Spring Boot backend, it allows
            employers to allocate, track, and manage assets assigned to
            employees. The app includes features for asset reassignment, return,
            and a detailed history log, ensuring efficient asset utilization and
            monitoring.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 text-center gap-6 text-white">
        <Link className="bg-blue-400 rounded-md py-1" href={"/assets"}>
          Assets
        </Link>
        <Link className="bg-blue-400 rounded-md px-4 py-1" href={"/employees"}>
          Employees
        </Link>
      </div>
    </div>
  );
}
