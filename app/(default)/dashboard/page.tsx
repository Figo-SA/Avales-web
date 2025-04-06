"use client";  // Ahora es un componente de cliente válido

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/signin"); 
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Verificando acceso...</p>
      </div>
    );
  }

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
