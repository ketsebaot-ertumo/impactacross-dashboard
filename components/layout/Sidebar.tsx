// // components/shared/Sidebar.tsx

// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { LayoutDashboard, Users, Newspaper, FileText, Video, BookOpen, Briefcase, UserCog, MenuIcon } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { useState } from "react";


// type NavItem = {
//   name: string;
//   href: string;
//   icon: string | React.ElementType;
//   // subItems?: {
//   //   program_id: string;
//   //   program_name: string;
//   //   href: string;
//   // }[];
// };

// const navItems: NavItem[] = [
//   { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
//   { name: "Users", href: "/dashboard/user", icon: Users },
//   { name: "Blogs", href: "/dashboard/blog", icon: Newspaper },
//   { name: "Publications", href: "/dashboard/publication", icon: FileText },
//   { name: "Multimedia", href: "/dashboard/multimedia", icon: Video },
//   { name: "Trainings", href: "/dashboard/training", icon: BookOpen },
//   { name: "Services", href: "/dashboard/service", icon: Briefcase },
//   { name: "Staffs", href: "/dashboard/staff", icon: UserCog },
// ];

// export default function Sidebar() {
//   const pathname = usePathname();
//   const [open, setOpen] = useState<string | null>(null);
//   const [mobileOpen, setMobileOpen] = useState(false);

//   return (
//     <aside className="h-screen border-r bg-gray-900 text-white dark:bg-zinc-900 p-4 shadow-sm pt-9 pr-12 md:pr-16 lg:pr-26">
//       <div>
//         <div className="lg:hidden">
//           <MenuIcon/>
//         </div>
//         <div className="text-xl font-semibold mb-6 px-2 text-zinc-400 dark:text-zinc-100">
//         ImpactAcross
//       </div>
//       </div>
      
//       <nav className="space-y-1">
//         {navItems.map((item) => {
//           const Icon = item.icon;
//           const isActive = pathname === item.href;

//           return (
//             <Link
//               key={item.name}
//               href={item.href}
//               className={cn(
//                 "flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium",
//                 isActive
//                   ? "bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-white"
//                   : "text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
//               )}
//             >
//               <Icon className="w-4 h-4" />
//               {item.name}
//             </Link>
//           );
//         })}
//       </nav>
//     </aside>
//   );
// }





// // components/shared/Sidebar.tsx

// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { LayoutDashboard, Users, Newspaper, FileText, Video, BookOpen, Briefcase, UserCog, Menu as MenuIcon, X as CloseIcon } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { useState } from "react";

// type NavItem = {
//   name: string;
//   href: string;
//   icon: string | React.ElementType;
// };

// const navItems: NavItem[] = [
//   { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
//   { name: "Users", href: "/dashboard/user", icon: Users },
//   { name: "Blogs", href: "/dashboard/blog", icon: Newspaper },
//   { name: "Publications", href: "/dashboard/publication", icon: FileText },
//   { name: "Multimedia", href: "/dashboard/multimedia", icon: Video },
//   { name: "Trainings", href: "/dashboard/training", icon: BookOpen },
//   { name: "Services", href: "/dashboard/service", icon: Briefcase },
//   { name: "Staffs", href: "/dashboard/staff", icon: UserCog },
// ];

// export default function Sidebar() {
//   const pathname = usePathname();
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const renderNavItems = () => (
//     <nav className="space-y-1">
//       {navItems.map((item) => {
//         const Icon = item.icon;
//         const isActive = pathname === item.href;

//         return (
//           <Link
//             key={item.name}
//             href={item.href}
//             className={cn(
//               "flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium",
//               isActive
//                 ? "bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-white"
//                 : "text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
//             )}
//           >
//             <Icon className="w-4 h-4" />
//             {item.name}
//           </Link>
//         );
//       })}
//     </nav>
//   );

//   return (
//     <>
//       {/* Mobile toggle button */}
//       <button
//         className="md:hidden fixed top-4 left-4 z-50 bg-white dark:bg-zinc-800 p-2 rounded shadow"
//         onClick={() => setMobileOpen(true)}
//       >
//         <MenuIcon className="w-6 h-6 text-black dark:text-white" />
//       </button>

//       {/* Desktop sidebar */}
//       <aside className="hidden md:block h-screen w-64 border-r bg-gray-900 text-white dark:bg-zinc-900 p-6 shadow-sm">
//         <div className="text-xl font-semibold mb-6 px-2 text-zinc-400 dark:text-zinc-100">
//           ImpactAcross
//         </div>
//         {renderNavItems()}
//       </aside>

//       {/* Mobile sidebar */}
//       {mobileOpen && (
//         <aside className="fixed inset-0 z-40 bg-white dark:bg-zinc-900 w-72 p-6 overflow-y-auto md:hidden">
//           <button
//             className="absolute top-0 right-4 z-50"
//             onClick={() => setMobileOpen(false)}
//           >
//             <CloseIcon className="w-6 h-6 text-black dark:text-white" />
//           </button>

//           <div className="text-xl font-semibold mb-6 px-2 text-zinc-700 dark:text-zinc-100 mt-10">
//             ImpactAcross
//           </div>
//           {renderNavItems()}
//         </aside>
//       )}
//     </>
//   );
// }




"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Newspaper, FileText, Video, BookOpen, Briefcase, UserCog, Menu as MenuIcon, X as CloseIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

type NavItem = {
  name: string;
  href: string;
  icon: string | React.ElementType;
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
        className="p-2 rounded dark:bg-zinc-800 md:hidden fixed top-8 left-6 z-60" // Fixed at top-left for mobile
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <MenuIcon className="w-6 h-6 text-gray-600 dark:text-white" />
      </button>


      {/* Desktop sidebar */}
      <aside className="hidden md:block h-screen w-64 border-r bg-gray-900 text-white dark:bg-zinc-900 p-6 shadow-sm">
        <div className="text-xl font-semibold mb-6 px-2 text-zinc-400 dark:text-zinc-100">
          ImpactAcross
        </div>
        {renderNavItems()}
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
