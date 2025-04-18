// /components/shared

// import { Button } from "../ui/button";
import { Button } from "@/components/ui/button";
import { DataTable } from "./DataTable";

interface EntityTableProps<T> {
  data: T[];
  columns: any[];
  onEdit: (row: T) => void;
  onDelete: (row: T) => void;
}

export function EntityTable<T>({ data, columns, onEdit, onDelete }: EntityTableProps<T>) {
  const extendedColumns = [
    ...columns,
    {
      key: "actions",
      label: "Actions",
      render: (row: T) => (
        <div className="flex gap-2">
          <Button size="sm" onClick={() => onEdit(row)}>Edit</Button>
          <Button size="sm" variant="destructive" onClick={() => onDelete(row)}>Delete</Button>
        </div>
      ),
    },
  ];

  return <DataTable<T, any> data={data} columns={extendedColumns} />;
  // return <DataTable<T> data={data} columns={extendedColumns} />;
}





// // components/shared/EntityTable.tsx

// "use client";

// import { DataTable } from "./DataTable";
// import { EntityFormDialog } from "./EntityFormDialog";
// // import EntityFormDialog from "./EntityFormDialog";
// // import { Button } from "@/components/ui/button";

// interface EntityTableProps {
//   columns: any[];
//   data: any[];
//   entity: string;
// }

// export default function EntityTable({ columns, data, entity }: EntityTableProps) {
//   return (
//     <div className="space-y-4">
//       <div className="flex justify-end">
//         <EntityFormDialog entity={entity} />
//       </div>
//       <DataTable columns={columns} data={data} />
//     </div>
//   );
// }





// // components/shared/EntityTable.tsx
// "use client";
// import { useState } from "react";
// import { EntityFormDialog } from "./EntityFormDialog";
// import { Button } from "../ui/button";

// interface EntityTableProps<T> {
//   data: T[];
//   columns: { key: keyof T; label: string }[];
//   onCreate: (values: T) => void;
//   onUpdate: (id: string, values: T) => void;
//   fields: { name: keyof T; label: string; type: string }[];
// }

// export function EntityTable<T extends { id: string }>({ data, columns, onCreate, onUpdate, fields }: EntityTableProps<T>) {
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [editingEntity, setEditingEntity] = useState<T | undefined>(undefined);

//   return (
//     <div>
//       <div className="flex justify-end mb-4">
//         <Button onClick={() => { setEditingEntity(undefined); setDialogOpen(true); }}>Add New</Button>
//       </div>
//       <table className="min-w-full border">
//         <thead>
//           <tr>
//             {columns.map((col) => (
//               <th key={String(col.key)} className="border p-2 text-left">{col.label}</th>
//             ))}
//             <th className="border p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item) => (
//             <tr key={item.id}>
//               {columns.map((col) => (
//                 <td key={String(col.key)} className="border p-2">{String(item[col.key])}</td>
//               ))}
//               <td className="border p-2">
//                 <Button onClick={() => { setEditingEntity(item); setDialogOpen(true); }}>Edit</Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <EntityFormDialog
//         open={dialogOpen}
//         onClose={() => setDialogOpen(false)}
//         entity={editingEntity}
//         onSubmit={(values) => {
//           if (editingEntity) {
//             onUpdate(editingEntity.id, values);
//           } else {
//             onCreate(values);
//           }
//           setDialogOpen(false);
//         }}
//         fields={fields}
//       />
//     </div>
//   );
// }




// // // components/shared/EntityTable.tsx
// // 'use client';

// // import { useEffect, useState } from 'react';
// // import DataTable from './DataTable';
// // import { fetchEntityData } from '@/lib/api';

// // interface EntityTableProps {
// //   entity: string;
// // }

// // export default function EntityTable({ entity }: EntityTableProps) {
// //   const [data, setData] = useState([]);

// //   useEffect(() => {
// //     fetchEntityData(entity).then(setData);
// //   }, [entity]);

// //   return <DataTable data={data} />;
// // }
