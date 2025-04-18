// components/shared/Sidebar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Newspaper, FileText, Video, BookOpen, Briefcase, UserCog } from "lucide-react";
import { cn } from "@/lib/utils";


const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Users", href: "/dashboard/users", icon: Users },
  { name: "Blogs", href: "/dashboard/blogs", icon: Newspaper },
  { name: "Publications", href: "/dashboard/publications", icon: FileText },
  { name: "Multimedia", href: "/dashboard/multimedia", icon: Video },
  { name: "Trainings", href: "/dashboard/trainings", icon: BookOpen },
  { name: "Services", href: "/dashboard/services", icon: Briefcase },
  { name: "Staffs", href: "/dashboard/staffs", icon: UserCog },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen border-r bg-white dark:bg-zinc-900 p-4 shadow-sm">
      <div className="text-xl font-semibold mb-6 px-2 text-zinc-800 dark:text-zinc-100">
        Admin Panel
      </div>
      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium",
                isActive
                  ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
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