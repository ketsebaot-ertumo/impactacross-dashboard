// app/dashboard/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { withAuth } from "@/lib/auth/withAuth";
import { ArrowUpRight, Users, Newspaper, FileText } from "lucide-react";
  
  const dashboardCards = [
    {
      title: "Total Users",
      icon: Users,
      value: 245,
      change: "+12%",
      bg: "bg-blue-100",
    },
    {
      title: "Blog Posts",
      icon: Newspaper,
      value: 86,
      change: "+5%",
      bg: "bg-green-100",
    },
    {
      title: "Publications",
      icon: FileText,
      value: 34,
      change: "+8%",
      bg: "bg-yellow-100",
    },
    // {
    //   title: "Multimedia",
    //   icon: FileText,
    //   value: 34,
    //   change: "+8%",
    //   bg: "bg-yellow-100",
    // },
    // {
    //   title: "Training",
    //   icon: FileText,
    //   value: 34,
    //   change: "+8%",
    //   bg: "bg-yellow-100",
    // },
  ];

  
  const DashboardPage = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {dashboardCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card key={index} className="shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {card.title}
                </CardTitle>
                <Icon className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-zinc-900 dark:text-white">
                  {card.value}
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" /> {card.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
}

export default withAuth(DashboardPage);
// export default DashboardPage;



// // /app/dashboard/page.tsx

// "use client";

// import { Card, CardContent } from "@/components/ui/card";
// import { Calendar, Users, FileText, Video } from "lucide-react";

// const stats = [
//   { label: "Users", value: 128, icon: Users },
//   { label: "Publications", value: 42, icon: FileText },
//   { label: "Trainings", value: 15, icon: Calendar },
//   { label: "Multimedia", value: 23, icon: Video },
// ];

// export default function DashboardPage() {
//   return (
//     <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//       {stats.map(({ label, value, icon: Icon }) => (
//         <Card key={label} className="hover:shadow-xl transition-shadow duration-300">
//           <CardContent className="flex items-center gap-4 p-6">
//             <Icon className="w-10 h-10 text-primary" />
//             <div>
//               <p className="text-muted-foreground text-sm">{label}</p>
//               <p className="text-2xl font-semibold text-foreground">{value}</p>
//             </div>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// }
