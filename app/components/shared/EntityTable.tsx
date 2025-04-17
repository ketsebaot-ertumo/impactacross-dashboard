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






// // components/shared/EntityTable.tsx

// "use client";

// import { DataTable } from "./DataTable";
// import EntityFormDialog from "./EntityFormDialog";
// import { Button } from "@/components/ui/button";

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
