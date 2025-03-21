"use client";

import { usePathname } from "next/navigation";

export default function PageTitle() {
  const pathname = usePathname() || "";
  
  const getPageTitle = () => {
    if (pathname === "/dashboard") return "Tableau de bord";
    if (pathname.startsWith("/dashboard/exposants/") && !pathname.includes("waiting")) return "Détails Exposant";
    if (pathname === "/dashboard/exposants") return "Exposants";
    if (pathname.startsWith("/dashboard/exposants-waiting/")) return "Détails Exposant en attente";
    if (pathname === "/dashboard/exposants-waiting") return "Exposants en attente";
    if (pathname === "/dashboard/visitors") return "Visiteurs";
    if (pathname === "/dashboard/parameters") return "Paramètres";
    return "Tableau de bord";
  };

  return (
    <h1 className="text-xl font-semibold text-neutral-900">
      {getPageTitle()}
    </h1>
  );
} 