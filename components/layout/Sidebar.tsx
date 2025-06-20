// components/layout/Sidebar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Newspaper, FileText, Video, BookOpen, Briefcase, UserCog, Menu as MenuIcon, X as CloseIcon, PersonStanding, Building2, Phone, MapPin, Link2, UsersRound, FolderKanban, Handshake, Info, Layers, LayoutGrid, Image } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

type NavItem = {
  name: string;
  href: string;
  icon: string | React.ElementType;
};
const navItems: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Users", href: "/dashboard/users", icon: Users },
  { name: "Blogs", href: "/dashboard/blogs", icon: Newspaper },
  { name: "Publications", href: "/dashboard/publications", icon: FileText },
  { name: "Multimedias", href: "/dashboard/multimedias", icon: Video },
  { name: "Trainings", href: "/dashboard/trainings", icon: BookOpen },
  { name: "Owner", href: "/dashboard/owners", icon: Building2 },
  { name: "Phones", href: "/dashboard/phones", icon: Phone },
  { name: "Locations", href: "/dashboard/locations", icon: MapPin },
  { name: "Company Links", href: "/dashboard/links", icon: Link2 },
  { name: "Section Descriptions", href: "/dashboard/sections", icon: LayoutGrid },
  { name: "Team", href: "/dashboard/teams", icon: UsersRound },
  { name: "Services", href: "/dashboard/service", icon: Briefcase },
  { name: "Projects", href: "/dashboard/projects", icon: FolderKanban },
  { name: "Parners", href: "/dashboard/partners", icon: Handshake },
  { name: "About Us", href: "/dashboard/about_us", icon: Info },
  { name: "Expertise", href: "/dashboard/expertise", icon: Layers },
  { name: "Gallery", href: "/dashboard/gallery", icon: Image },
  // { name: "What we do", href: "/dashboard/what-we-do-images", icon: Layers },
];


export default function Sidebar() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderNavItems = () => (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium",
              isActive
                ? "bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-white"
                : "text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
            )}
            onClick={() => setSidebarOpen(!sidebarOpen)} // Close sidebar after clicking link
          >
            <Icon className="w-4 h-4" />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="p-2 rounded dark:bg-zinc-800 md:hidden fixed top-8 left-6 z-60"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <MenuIcon className="w-6 h-6 text-gray-600 dark:text-white" />
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden md:block h-screen w-64 bg-gray-900 opacity text-white dark:bg-zinc-900 p-6 shadow-md space-y-6 overflow-y-auto">
        <div className="text-xl md:text-2xl font-medium tracking-tight text-white dark:text-zinc-100">
          ImpactAcross
        </div>
        <div className="text-sm text-zinc-400 dark:text-zinc-500 mt-10">
          {renderNavItems()}
        </div>
      </aside>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <aside className="fixed top-0 left-0 z-60 h-screen bg-gray-900 dark:bg-zinc-900 p-6 overflow-y-auto md:hidden">
          <div className="flex items-center gap-2">
            <div className="text-xl font-semibold mb-6 px-2 text-white dark:text-zinc-100 mt-4">
              ImpactAcross
            </div>
            <button
              className=""
              onClick={() => setSidebarOpen(!sidebarOpen)} // Close sidebar
            >
              <CloseIcon className="w-6 h-6 text-white dark:text-black" />
            </button>
          </div>
          {renderNavItems()}
        </aside>
      )}
    </>
  );
}
