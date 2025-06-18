// components/shared/Header.tsx

"use client";

import { Bell, ChevronDown, ChevronUp, LogOut, Settings, UserCog } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu as MenuIcon } from "lucide-react";
import { UserResponse } from "@/types/user";
import { getUser } from "../entity/auth";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchValue, setSearchValue]= useState("");
  const [name, setName]= useState("Dashboard");
  const pathname = usePathname();
  const [user, setUser] = useState<UserResponse | null>(null);
  const router = useRouter();
  const { logout, success, error, err } = useAuth();

  const handleLogout = async () => {
    const isLogOut = await logout();
    if (isLogOut) {
      success("Logged out successfully");
      router.push("/");
    } else {
      error("Logout failed");
    } 
  };

  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, []);
   
  
  useEffect(() => {
    if (pathname.includes("/users")) {
      setName("User");
    } else if (pathname.includes("/courses")) {
      setName("Course");
    } else if (pathname.includes("/programs")) {
      setName("Program");
    } else if (pathname.includes("/lessons")) {
        setName("Lesson");
    } else {
      setName("Dashboard");
    }
  }, [pathname]);

  const handleToggle = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
    // setIsDropdownOpen(!isDropdownOpen);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const dropdown = document.getElementById("account-dropdown");
      const toggleButton = document.getElementById("account-toggle");
  
      // If dropdown is open and click is outside both dropdown and toggle
      if (
        isDropdownOpen &&
        dropdown &&
        !dropdown.contains(event.target as Node) &&
        toggleButton &&
        !toggleButton.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);
  


  return (
    <header className="flex items-center justify-between h-26 px-6 lg:px-8 bg-white dark:bg-zinc-800 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button
            className="p-2 rounded bg-white dark:bg-zinc-800 shadow md:hidden" // Fixed at top-left for mobile
          >
            <MenuIcon className="w-6 h-6 text-black dark:text-white" />
          </button>
          <div className="text-xl md:text-2xl font-medium tracking-tight text-[#2a3048] dark:text-white">
            {name}
          </div>
        </div>
       

        <div className="relative flex items-center text-blackr dark:text-white justify-center space-x-4">
          <button
            id="account-toggle"
            onClick={handleToggle}
            className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black focus:outline-none"
          >
            <Avatar className="w-12 h-12 bg-gray-900 text-white">
              {/* <AvatarImage src={user?.avatar || "/default-avatar.png"} alt="User Avatar" /> */}
              <AvatarFallback className="bg-gray-800">{user?.firstName?.[0].toUpperCase() || "K"}</AvatarFallback>
            </Avatar>
          </button>

          {/* Dropdown Card */}
          {isDropdownOpen && (
            <div
              id="account-dropdown"
              className="absolute top-0 right-0 pt-3 w-72 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-2xl z-50 animate-fadeIn"
            >
             {/* Profile Info */}
             <div className="flex flex-col items-center text-center gap-4 p-4 border-b dark:border-zinc-700 pt-4">
                <div className="w-12 h-12 text-white rounded-full bg-primary flex items-center justify-center text-lg font-semibold shadow-md">
                  {user?.firstName?.charAt(0).toUpperCase()}
                </div>
                <div className="space-y-0">
                  <div className="text-lg font-semibold">
                    {user?.firstName?.charAt(0).toUpperCase()}{user?.firstName?.slice(1)}{' '}
                    {user?.lastName?.charAt(0).toUpperCase()}{user?.lastName?.slice(1)}
                  </div>
                  <a
                    href={`mailto:${user?.email}`}
                    className="text-sm text-zinc-500 dark:text-zinc-400"
                  >
                    {user?.email}
                  </a>
                  <div className="text-sm text-zinc-500 dark:text-zinc-400">
                    {user?.role?.charAt(0).toUpperCase()}{user?.role?.slice(1)}
                  </div>
                </div>
              </div>

              {/* Action Items */}
              <div className="flex flex-col p-2">
                <Link href="/dashboard/users">
                  <button className="flex gap-2 w-full text-left px-4 py-2 rounded-lg text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                    <UserCog/> Profile Setting
                  </button>
                </Link>

                <Link href="/dashboard/owners">
                  <button className="flex gap-2 w-full text-left px-4 py-2 rounded-lg text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                    <Settings/> System Settings
                  </button>
                </Link>

                <button
                  onClick={handleLogout}
                  className={cn(
                    "flex gap-2 w-full text-left px-4 py-2 rounded-lg text-sm hover:bg-zinc-100 dark:hover:bg-blue-900/30 transition-colors"
                  )}
                >
                  <LogOut className="" />
                   Logout
                </button>
              </div>
            </div>
          )}
        </div>
    </header>
  );
}




// "use client";

// import { Bell, ChevronDown, ChevronUp, LogOut, Search, Settings, UserCog } from "lucide-react";
// import { Button } from "../ui/button";
// import { useCallback, useEffect, useState } from "react";
// import { usePathname } from "next/navigation";
// import { Menu as MenuIcon } from "lucide-react";

// export default function Header() {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [searchValue, setSearchValue]= useState("");
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

//   const handleToggle = useCallback(() => {
//     setIsDropdownOpen((prev) => !prev);
//     // setIsDropdownOpen(!isDropdownOpen);
//   }, []);


//   return (
//     <header className="flex items-center justify-between h-20 px-6 lg:px-8 bg-white border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-800 sticky top-0 z-50">
//         <div className="flex items-center gap-4">
//           <button
//             className="p-2 rounded bg-white dark:bg-zinc-800 shadow md:hidden" // Fixed at top-left for mobile
//           >
//             <MenuIcon className="w-6 h-6 text-black dark:text-white" />
//           </button>
//           <div className="text-xl md:text-2xl font-medium tracking-tight text-[#2a3048] dark:text-white">
//             {name}
//           </div>
//         </div>
       

//         <div className="relative flex items-center text-blackr dark:text-white justify-center space-x-4">

//           {/* <Button size="icon" variant="ghost">
//             <Bell className="w-5 h-5 text-black dark:text-zinc-300" />
//           </Button> */}

//           <div
//             className="flex items-center cursor-pointer text-black text-lg"
//             onClick={handleToggle}
//           >
//             <span>My Account</span>
//             {isDropdownOpen ? (
//               <ChevronUp className="py-1 flex items-bottom" />
//             ) : (
//               <ChevronDown className="py-1 flex items-bottom" />
//             )}
//           </div>

//           {/* Dropdown Card */}
//           {isDropdownOpen && (
//             <div
//               id="account-dropdown"
//               className="absolute top-full right-0 mt-3 pt-3 w-72 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-2xl z-50 animate-fadeIn"
//             >
//               {/* Profile Info */}
//               <div className="flex flex-col items-center text-center gap-4 p-4 border-b dark:border-zinc-700 pt-4">
//                 <div className="w-12 h-12 text-white rounded-full bg-primary flex items-center justify-center text-lg font-semibold shadow-md">
//                   A
//                 </div>
//                 <div className="space-y-0">
//                   <div className="text-base font-semibold">Admin</div>
//                   <a href="mailto:filmon@exanple.com" className="text-sm text-zinc-500 dark:text-zinc-400">youname@example.com</a>
//                   <div className="text-xs text-zinc-400 dark:text-zinc-500">Product Designer</div>
//                 </div>
//               </div>

//               {/* Action Items */}
//               <div className="flex flex-col p-2">
//                 <button className="flex gap-2 w-full text-left px-4 py-2 rounded-lg text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
//                   <UserCog/> Profile
//                 </button>
//                 <button className="flex gap-2 w-full text-left px-4 py-2 rounded-lg text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
//                   <Settings/> Settings
//                 </button>
//                 <button className="flex gap-2 w-full text-left px-4 py-2 rounded-lg text-sm hover:bg-zinc-100 dark:hover:bg-blue-900/30 transition-colors">
//                   <LogOut/> Logout
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//     </header>
//   );
// }
