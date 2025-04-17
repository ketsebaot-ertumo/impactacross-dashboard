// 'use client';
// import useSWR from 'swr';
// import { Button } from "@/components/ui/button";
// import { Skeleton } from "@/components/ui/skeleton";

// export const UsersTable = () => {
//   const { data, error, isLoading } = useSWR('/api/users');

//   if (isLoading) return <Skeleton className="h-10 w-full" />;

//   return (
//     <div className="border rounded-lg overflow-hidden shadow">
//       <table className="min-w-full">
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="text-left p-3">Name</th>
//             <th className="text-left p-3">Email</th>
//             <th className="text-left p-3">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data?.map((user: any) => (
//             <tr key={user.id} className="border-t">
//               <td className="p-3">{user.name}</td>
//               <td className="p-3">{user.email}</td>
//               <td className="p-3 space-x-2">
//                 <Button size="sm" variant="outline">Edit</Button>
//                 <Button size="sm" variant="destructive">Delete</Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };
