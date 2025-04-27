// // components/shared/DataTable.tsx
// "use client";

// import {
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
//   ColumnDef,
// } from "@tanstack/react-table";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { useMemo } from "react";

// type DataTableProps<TData, TValue> = {
//   columns: ColumnDef<TData, TValue>[];
//   data: TData[];
// };

// export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   });

//   return (
//     <div className="rounded-md border bg-white dark:bg-zinc-900">
//       <Table>
//         <TableHeader>
//           {table.getHeaderGroups().map((headerGroup) => (
//             <TableRow key={headerGroup.id}>
//               {headerGroup.headers.map((header) => (
//                 <TableHead key={header.id}>
//                   {header.isPlaceholder
//                     ? null
//                     : flexRender(header.column.columnDef.header, header.getContext())}
//                 </TableHead>
//               ))}
//             </TableRow>
//           ))}
//         </TableHeader>
//         <TableBody>
//           {table.getRowModel().rows.map((row) => (
//             <TableRow key={row.id}>
//               {row.getVisibleCells().map((cell) => (
//                 <TableCell key={cell.id}>
//                   {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                 </TableCell>
//               ))}
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }




// // /components/shared/DataTable.tsx
// import { FC } from 'react'

// interface DataTableProps {
//   columns: string[]
//   data: any[]
// }

// const DataTable: FC<DataTableProps> = ({ columns, data }) => {
//   return (
//     <table className="min-w-full table-auto">
//       <thead>
//         <tr>
//           {columns.map((col) => (
//             <th key={col} className="px-4 py-2 text-left">{col}</th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((row, index) => (
//           <tr key={index}>
//             {columns.map((col) => (
//               <td key={col} className="px-4 py-2">{row[col]}</td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   )
// }

// export default DataTable

