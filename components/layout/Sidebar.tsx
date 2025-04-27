// components/shared/Sidebar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Newspaper, FileText, Video, BookOpen, Briefcase, UserCog } from "lucide-react";
import { cn } from "@/lib/utils";


type NavItem = {
  name: string;
  href: string;
  icon: string | React.ElementType;
  // subItems?: {
  //   program_id: string;
  //   program_name: string;
  //   href: string;
  // }[];
};

const navItems: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Users", href: "/dashboard/user", icon: Users },
  { name: "Blogs", href: "/dashboard/blog", icon: Newspaper },
  { name: "Publications", href: "/dashboard/publication", icon: FileText },
  { name: "Multimedia", href: "/dashboard/multimedia", icon: Video },
  { name: "Trainings", href: "/dashboard/training", icon: BookOpen },
  { name: "Services", href: "/dashboard/service", icon: Briefcase },
  { name: "Staffs", href: "/dashboard/staff", icon: UserCog },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen border-r bg-gray-900 text-white dark:bg-zinc-900 p-4 shadow-sm">
      <div className="text-xl font-semibold mb-6 px-2 text-zinc-400 dark:text-zinc-100">
        ImpactAcross
      </div>
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
            >
              <Icon className="w-4 h-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}