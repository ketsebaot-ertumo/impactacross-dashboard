// components/shared/Header.tsx

"use client";

import { Bell } from "lucide-react";
import { Button } from "@/app/components/ui/button";

export default function Header() {
  return (
    <header className="flex items-center justify-between h-16 px-6 border-b bg-white dark:bg-zinc-900 dark:border-zinc-800 shadow-sm">
      <div className="text-lg font-semibold text-zinc-800 dark:text-white">Dashboard</div>
      <div className="flex items-center gap-4">
        <Button size="icon" variant="ghost">
          <Bell className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
        </Button>
        <div className="w-8 h-8 rounded-full bg-zinc-300 dark:bg-zinc-600"></div>
      </div>
    </header>
  );
}




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
