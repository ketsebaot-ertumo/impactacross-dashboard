// app/dashboard/page.tsx

"use client";

import EntityTable from "@/components/shared/EntityTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, Users, Newspaper, FileText } from "lucide-react";
  
  const dashboardCards = [
    { title: "Total Users", icon: Users, value: 245+"+", change: "+12%",bg: "bg-blue-100",},
    { title: "Blog Posts", icon: Newspaper, value: 86, change: "+5%", bg: "bg-green-100",},
    { title: "Publications", icon: FileText, value: 34, change: "+8%", bg: "bg-yellow-100", },
    { title: "Multimedia", icon: FileText, value: 34, change: "+8%", bg: "bg-yellow-100",},
    // {title: "Training", icon: FileText,  value: 34, change: "+8%", bg: "bg-yellow-100" },
  ];
  
  const DashboardPage = () => {
    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

        <EntityTable entity="user"/>
      </>
    );
}

// export default withAuth(DashboardPage);
export default DashboardPage;






// "use client";

// import EntityTable from "@/components/shared/EntityTable";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { ArrowUpRight, Users, Newspaper, FileText } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { getAllEntities } from "../api/routes";

// const dashboardCards = [
//   { title: "Total Users", icon: Users, value: 245 + "+", change: "+12%", bg: "bg-blue-100" },
//   { title: "Blog Posts", icon: Newspaper, value: 86, change: "+5%", bg: "bg-green-100" },
//   { title: "Publications", icon: FileText, value: 34, change: "+8%", bg: "bg-yellow-100" },
//   { title: "Multimedia", icon: FileText, value: 34, change: "+8%", bg: "bg-yellow-100" },
// ];

// type GenericEntity = {
//   id: string | number;
//   [key: string]: any;
// };

// type Column<T> = {
//   key: string;
//   label: string;
//   render?: (row: T) => React.ReactNode;
// };

// const DashboardPage = () => {
//   const [data, setData] = useState<GenericEntity[]>([]);
//   const [columns, setColumns] = useState<Column<GenericEntity>[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [err, setErr] = useState<string | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const {data, error, loading} = await getAllEntities("user"); // Adjust entity as needed
//         console.log("res user data: ", data)
//         setData(data);
//         setErr(error);
//         setLoading(loading);

//         // Dynamically set columns based on keys of first row
//         if (data.length > 0) {
//           const keys = Object.keys(data[0]).filter((key) => key !== "id");
//           const generatedColumns: Column<GenericEntity>[] = keys.map((key) => ({
//             key,
//             label: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize label
//           }));
//           setColumns(generatedColumns);
//         }
//       } catch (e) {
//         console.error(e);
//         setErr("Failed to load users.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleEdit = (user: GenericEntity) => {
//     console.log("Edit user:", user);
//   };

//   const handleDelete = (user: GenericEntity) => {
//     console.log("Delete user:", user);
//   };

//   return (
//     <>
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//         {dashboardCards.map((card, index) => {
//           const Icon = card.icon;
//           return (
//             <Card key={index} className="shadow-md">
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
//                   {card.title}
//                 </CardTitle>
//                 <Icon className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold text-zinc-900 dark:text-white">
//                   {card.value}
//                 </div>
//                 <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
//                   <ArrowUpRight className="w-3 h-3" /> {card.change} from last month
//                 </p>
//               </CardContent>
//             </Card>
//           );
//         })}
//       </div>

//       <div className="mt-8">
//         {err ? (
//           <p className="text-red-600 text-sm text-center">{err}</p>
//         ) : (
//           <EntityTable
//             entity="user"
//             columns={columns}
//             onEdit={handleEdit}
//             onDelete={handleDelete}
//           />
//         )}
//       </div>
//     </>
//   );
// };

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
