// // components/shared/Header.tsx



// // components/shared/Header.tsx

"use client";

import { Bell, ChevronDown, ChevronUp, LogOut, Search, Settings, UserCog } from "lucide-react";
import { Button } from "../ui/button";
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu as MenuIcon } from "lucide-react";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchValue, setSearchValue]= useState("");
  const [name, setName]= useState("Welcome Filmon");
  const pathname = usePathname();
  
  useEffect(() => {
    if (pathname.includes("/blog")) {
      setName("Blog");
    } else if (pathname.includes("/user")) {
      setName("User");
    } else if (pathname.includes("/multimedia")) {
      setName("Multimedia");
    } else if (pathname.includes("/publication")) {
      setName("Publication");
    } else {
      setName("Dashboard");
    }
  }, [pathname]);

  const handleToggle = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);


  return (
    <header className="flex items-center justify-between h-26 px-6 lg:px-8 bg-white border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-800 sticky top-0 z-50">
      <div className="flex gap-8">
        <div className="lg:hidden">
          <MenuIcon/>
        </div>

        <div className="md:text-2xl font-medium tracking-tight text-[#2a3048] dark:text-white">
          {name}
        </div>
      </div>

        {/* <Button size="icon" variant="ghost">
          <Bell className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
        </Button> */}

        <div className="relative hidden md:flex text-blackr dark:text-white justify-center space-x-4">

          <Button size="icon" variant="ghost">
            <Bell className="w-5 h-5 text-black dark:text-zinc-300" />
          </Button>

          <div
            className="flex items-center cursor-pointer"
            onClick={handleToggle}
          >
            <span>My Account</span>
            {isDropdownOpen ? (
              <ChevronUp className="text-sm py-1 flex items-bottom" />
            ) : (
              <ChevronDown className="text-sm py-1 flex items-bottom" />
            )}
          </div>

          {/* Dropdown Card */}
          {isDropdownOpen && (
            <div
              id="account-dropdown"
              className="absolute top-full right-0 mt-3 pt-3 w-72 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-2xl z-50 animate-fadeIn"
            >
              {/* Profile Info */}
              <div className="flex flex-col items-center text-center gap-4 p-4 border-b dark:border-zinc-700 pt-4">
                <div className="w-12 h-12 text-white rounded-full bg-primary flex items-center justify-center text-lg font-semibold shadow-md">
                  A
                </div>
                <div className="space-y-0">
                  <div className="text-base font-semibold">Admin</div>
                  <a href="mailto:filmon@exanple.com" className="text-sm text-zinc-500 dark:text-zinc-400">youname@example.com</a>
                  <div className="text-xs text-zinc-400 dark:text-zinc-500">Product Designer</div>
                </div>
              </div>

              {/* Action Items */}
              <div className="flex flex-col p-2">
                <button className="flex gap-2 w-full text-left px-4 py-2 rounded-lg text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                  <UserCog/> Profile
                </button>
                <button className="flex gap-2 w-full text-left px-4 py-2 rounded-lg text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                  <Settings/> Settings
                </button>
                <button className="flex gap-2 w-full text-left px-4 py-2 rounded-lg text-sm hover:bg-zinc-100 dark:hover:bg-blue-900/30 transition-colors">
                  <LogOut/> Logout
                </button>
              </div>
            </div>
          )}
        </div>
    </header>
  );
}




// "use client";

// import { Bell } from "lucide-react";
// import { Button } from "../ui/button";
// import { useEffect, useState } from "react";
// import { usePathname } from "next/navigation";

// export default function Header() {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [name, setName]= useState("Dashboard");
//   const pathname = usePathname();
  
//   useEffect(() => {
//     if (pathname.includes("/blog")) {
//       setName("Blog");
//     } else if (pathname.includes("/user")) {
//       setName("User");
//     } else if (pathname.includes("/multimedia")) {
//       setName("Multimedia");
//     } else if (pathname.includes("/publication")) {
//       setName("Publication");
//     } else {
//       setName("Dashboard");
//     }
//   }, [pathname]);
//   return (
//     <header className="flex items-center justify-between h-26 px-6 border-b bg-white dark:bg-zinc-900 dark:border-zinc-800 shadow-sm sticky top-0 z-50">
//       <div className="text-lg lg:text-2xl font-semibold text-zinc-800 dark:text-white">{name}</div>
//       <div className="flex items-center gap-4">
//         <Button size="icon" variant="ghost">
//           <Bell className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
//         </Button>
//         <div className="w-8 h-8 rounded-full bg-zinc-300 dark:bg-zinc-600"></div>
//       </div>
//     </header>
//   );
// }




// // components/shared/Header.tsx

// "use client";

// import { Menu } from "lucide-react";
// import { Button } from "@/components/ui/button";

// export default function Header() {
//   return (
//     <header className="w-full h-16 flex items-center justify-between px-4 border-b bg-white dark:bg-zinc-900 shadow-sm">
//       <div className="flex items-center gap-2">
//         <Menu className="h-5 w-5 text-zinc-700 dark:text-zinc-200" />
//         <span className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">Dashboard</span>
//       </div>
//       <div className="flex items-center gap-4">
//         {/* Profile dropdown or settings here */}
//         <Button variant="ghost" className="text-zinc-600 dark:text-zinc-300">Logout</Button>
//       </div>
//     </header>
//   );
// }
