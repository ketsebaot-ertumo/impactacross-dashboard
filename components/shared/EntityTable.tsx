// // /components/shared/EntityTable.tsx

"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { Loader } from '../layout/Loader';
import { Pencil, Trash2 } from 'lucide-react';
import EntityFormDialog from './EntityFormDialog';
import { useAllEntities } from '@/hooks/use-query';

type GenericEntity = {
  id: string | number;
  [key: string]: any;
  pagination: any;
};

type Column<T> = {
  key: string;
  label: string;
  render?: (row: T) => React.ReactNode;
};

interface EntityTableProps {
  entity: string;
}

const EntityTable: React.FC<EntityTableProps> = ({ entity }) => {
  const [data, setData] = useState<GenericEntity[]>([]);
  const [columns, setColumns] = useState<Column<GenericEntity>[]>([]);
  const [loading, setLoading] = useState<boolean | undefined | null>(true);
  const [err, setErr] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState<GenericEntity | null>(null);
  const [mode, setMode] = useState<'edit' | 'remove' | 'create' | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(2);
  const [pageSize, setPageSize] = useState<number>(2);
  const [total, setTotal] = useState<number>(10);
  const response = useAllEntities(entity, { page: currentPage, limit: pageSize });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData(response?.data?.data || []);
        setTotalPages(response?.data?.pagination.totalPages);
        setLoading(response?.loading);

        if (response?.data?.data?.length > 0) {
          const keys = Object.keys(response.data.data[0]).filter((key) => key !== 'userId');
          const generatedColumns = keys.map((key) => ({
            key,
            label: key.charAt(0).toUpperCase() + key.slice(1),
          }));
          setColumns(generatedColumns);
        }
      } catch (e) {
        console.error(e);
        setErr('Failed to load data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [response?.data?.data, currentPage, pageSize]);

  const handlePagination = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleEdit = (row: GenericEntity) => {
    setSelectedEntity(row);
    setMode('edit');
    setDialogOpen(true);
  };

  const handleDelete = (row: GenericEntity) => {
    setSelectedEntity(row);
    setMode('remove');
    setDialogOpen(true);
  };

  const handleCreate = () => {
    setMode('create');
    setDialogOpen(true);
  };

  const handleExport = () => {
    const csvContent = [
      columns.map((col) => col.label).join(','),
      ...data.map((row) =>
        columns.map((col) => JSON.stringify(row[col.key] ?? '')).join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${entity}_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const extendedColumns: Column<GenericEntity>[] = [
    ...columns,
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => handleEdit(row)}>
            <Pencil className="w-4 h-4 mr-1" />
          </Button>
          <Button size="sm" variant="destructive" onClick={() => handleDelete(row)}>
            <Trash2 className="w-4 h-4 mr-1" />
          </Button>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (err) {
    return (
      <div className="text-red-500 text-center py-4">
        {err}
      </div>
    );
  }

  if (!data) return <div>Oops, {entity} Not found!</div>;

  return (
    <div className="p-6 bg-white dark:bg-gray-900 shadow-xl rounded-2xl w-200 lg:w-full mt-6">
      <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 dark:text-white capitalize mb-4">{entity} List</h2>

      <div className="space-y-4">
        {/* Top actions: Print and Export */}
        <div className="flex justify-end gap-2">
          <Button size="sm" variant="outline" onClick={() => window.print()}>
            Print
          </Button>
          <Button size="sm" variant="outline" onClick={() => handleExport()}>
            Export
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-400 text-white hover:text-white" size="sm" variant="outline" onClick={() => handleCreate()}>
            + New {entity}
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border rounded-lg">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                {extendedColumns?.map((column) => (
                  <TableHead key={column.key} className="bg-gray-100 text-gray-600 whitespace-nowrap text-md font-semibold py-6">
                    {column.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((row, index) => (
                <TableRow key={index} className="hover:bg-gray-100">
                  {extendedColumns.map((column) => (
                    <TableCell key={column.key} className="truncate max-w-[150px] text-gray-600">
                      {column.render ? (
                        column.render(row)
                      ) : (
                        <span title={row[column.key]}>
                          {String(row[column.key])?.length > 20
                            ? `${String(row[column.key]).slice(0, 10)}..`
                            : String(row[column.key])}
                        </span>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination & Controls */}
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePagination(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md font-medium transition ${
                currentPage === 1
                  ? "border border-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-400"
              }`}
            >
              Previous
            </button>

            <span className="text-gray-700 font-medium">
              Page {currentPage} of {totalPages || 4}
            </span>

            <button
              onClick={() => handlePagination(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md font-medium transition ${
                currentPage === totalPages
                  ? "border border-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-400"
              }`}
            >
              Next
            </button>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="pageSize" className="text-sm text-gray-700 font-medium">
              Posts per page:
            </label>
            <select
              id="pageSize"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded px-3 py-1 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[2, 5, 10, 25].map((size) => (
                <option key={size} value={size}>
                  {size} posts
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {dialogOpen && (
        <EntityFormDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          entity={entity}
          initialValues={selectedEntity || {}}
          mode={mode}
          id={mode === 'create' ? undefined : String(selectedEntity?.id)}
        />
      )}
    </div>
  );
};

export default EntityTable;



// "use client";

// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
// import { Button } from '../ui/button';
// import { Loader } from '../layout/Loader';
// import { Pencil, Trash2 } from 'lucide-react';
// import EntityFormDialog from './EntityFormDialog';
// import { useAllEntities } from '@/hooks/use-query';

//   type GenericEntity = {
//     id: string | number;
//     [key: string]: any;
//     pagination: any;
//   };

//   type Column<T> = {
//     key: string;
//     label: string;
//     render?: (row: T) => React.ReactNode;
//   };

//   interface EntityTableProps {
//     entity: string;
//   }

//   const EntityTable: React.FC<EntityTableProps> = ({ entity }) => {
//     const [data, setData] = useState<GenericEntity[]>([]);
//     const [columns, setColumns] = useState<Column<GenericEntity>[]>([]);
//     const [loading, setLoading] = useState<boolean | undefined |null>(true);
//     const [err, setErr] = useState<string | null>(null);
//     const [dialogOpen, setDialogOpen] = useState(false);
//     const [selectedEntity, setSelectedEntity] = useState<GenericEntity | null>(null);
//     const [mode, setMode] = useState<'edit' | 'remove' | 'create' | null>(null);
//     // const [pagination, setPagination] = useState<PaginatedResponse[]>([]);
//     const [currentPage, setCurrentPage] = useState<number>(1);
//     const [totalPages, setTotalPages] = useState<number>(2);
//     const [pageSize, setPageSize] = useState<number>(2);
//     const [total, setTotal] = useState<number>(10);
//     const response = useAllEntities(entity, { page: currentPage, limit: pageSize,});
//     console.log("\n\n\ndata table:", response?.data?.data);

//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           setData(response?.data?.data || []);
//           setTotalPages(response?.data?.pagination.totalPages);
//           setLoading(response?.loading);
    
//           if (response?.data?.data?.length > 0) {
//             const keys = Object.keys(response.data.data[0]).filter((key) => key !== 'userId');
//             const generatedColumns = keys.map((key) => ({
//               key,
//               label: key.charAt(0).toUpperCase() + key.slice(1),
//             }));
//             setColumns(generatedColumns);
//           }
//         } catch (e) {
//           console.error(e);
//           setErr('Failed to load data.');
//         } finally {
//           setLoading(false);
//         }
//       };
    
//       fetchData();
//     }, [response?.data?.data, currentPage, pageSize]);
    

//     const handlePagination = (page: number) => {
//       if (page >= 1 && page <= totalPages) {
//           setCurrentPage(page);
//       }
//     };

//     const handleEdit = (row: GenericEntity) => {
//       setSelectedEntity(row);
//       setMode('edit');
//       setDialogOpen(true);
//     };
    
//     const handleDelete = (row: GenericEntity) => {
//       setSelectedEntity(row);
//       setMode('remove');
//       setDialogOpen(true);
//     };

//     const handleCreate = () => {
//       setMode('create');
//       setDialogOpen(true);
//     };

//     const handleExport = () => {
//       const csvContent = [
//         columns.map((col) => col.label).join(','),
//         ...data.map((row) =>
//           columns.map((col) => JSON.stringify(row[col.key] ?? '')).join(',')
//         ),
//       ].join('\n');
  
//       const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', `${entity}_export.csv`);
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     };    

//     const extendedColumns: Column<GenericEntity>[] = [
//       ...columns,
//       {
//         key: 'actions',
//         label: 'Actions',
//         render: (row) => (
//           <div className="flex gap-2">
//             <Button size="sm" variant="outline" onClick={() => handleEdit(row)}>
//               <Pencil className="w-4 h-4 mr-1" />
//             </Button>
//             <Button size="sm" variant="destructive" onClick={() => handleDelete(row)}>
//               <Trash2 className="w-4 h-4 mr-1" />
//             </Button>
//           </div>
//         ),
//       },
//     ];

//     if (loading) {
//       return (
//         <div className="flex justify-center items-center h-48">
//           <Loader className="animate-spin" />
//         </div>
//       );
//     }

//     if (err) {
//       return (
//         <div className="text-red-500 text-center py-4">
//           {err}
//         </div>
//       );
//     }

//     if (!data) return <div>Oops, {entity} Not found!</div>;

//     return (
//       <div className="p-6 bg-white dark:bg-gray-900 shadow-xl rounded-2xl ">
//           <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 dark:text-white capitalize mb-4">{entity} List</h2>

//         <div className="space-y-4">
//           {/* Top actions: Print and Export */}
//           <div className="flex justify-end gap-2">
//             <Button size="sm" variant="outline" onClick={() => window.print()}>
//               Print
//             </Button>
//             <Button size="sm" variant="outline" onClick={() => handleExport()}>
//               Export
//             </Button>
//             <Button className='bg-blue-500 hover:bg-blue-400 text-white hover:text-white' size="sm" variant="outline" onClick={() => handleCreate()}>
//               + New {entity}
//             </Button>
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto rounded-lg border border-gray-300">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   {extendedColumns?.map((column) => (
//                     <TableHead key={column.key} className="bg-gray-100 text-gray-600 whitespace-nowrap text-md font-semibold py-6">
//                       {column.label}
//                     </TableHead>
//                   ))}
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {data?.map((row, index) => (
//                   <TableRow key={index} className="hover:bg-gray-100">
//                     {extendedColumns.map((column) => (
//                       <TableCell key={column.key} className="truncate max-w-[150px] text-gray-600">
//                         {column.render ? (
//                           column.render(row)
//                         ) : (
//                           <span title={row[column.key]}>
//                             {String(row[column.key])?.length > 20
//                               ? `${String(row[column.key]).slice(0, 10)}..`
//                               : String(row[column.key])}
//                           </span>
//                         )}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>

//           {/* Pagination & Controls */}
//           <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
//             <div className="flex items-center space-x-2">
//                 <button
//                     onClick={() => handlePagination(currentPage - 1)}
//                     // onClick={() => setCurrentPage(currentPage - 1)}
//                     disabled={currentPage === 1}
//                     className={`px-4 py-2 rounded-md font-medium transition ${
//                     currentPage === 1
//                       ? "border border-gray-300 text-gray-600 cursor-not-allowed"
//                       : "bg-blue-500 text-white hover:bg-blue-400"
//                     }`}
//                 >
//                     Previous
//                 </button>

//                 <span className="text-gray-700 font-medium">
//                     Page {currentPage} of {totalPages || 4}
//                 </span>

//                 <button
//                     onClick={() => handlePagination(currentPage + 1)}
//                     disabled={currentPage === totalPages}
//                     className={`px-4 py-2 rounded-md font-medium transition ${
//                     currentPage === totalPages
//                       ? "border border-gray-300 text-gray-600 cursor-not-allowed"
//                       : "bg-blue-500 text-white hover:bg-blue-400"
//                     }`}
//                 >
//                     Next
//                 </button>
//               </div>

//               <div className="flex items-center gap-2">
//                   <label htmlFor="pageSize" className="text-sm text-gray-700 font-medium">
//                       Posts per page:
//                   </label>
//                   <select
//                       id="pageSize"
//                       value={pageSize}
//                       onChange={(e) => {
//                           setPageSize(Number(e.target.value));
//                           setCurrentPage(1);
//                       }}
//                           className="border border-gray-300 rounded px-3 py-1 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                       {[2, 5, 10, 25].map((size) => (
//                       <option key={size} value={size}>
//                               {size} posts
//                       </option>
//                       ))}
//                   </select>
//               </div>
//             </div>
//           </div>

//           {dialogOpen && (
//             <EntityFormDialog
//               open={dialogOpen}
//               onClose={() => setDialogOpen(false)}
//               entity={entity}
//               initialValues={selectedEntity || {}}
//               // id={String(selectedEntity?.id)}
//               mode={mode}
//               id={mode === 'create' ? undefined : String(selectedEntity?.id)}
//             />
//           )}
//       </div>
//     );
// };

// export default EntityTable;





// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { getAllEntities } from '@/app/api/routes';
// import { Table, TableBody, TableCell, TableHead, TableRow } from '../ui/table';
// import { Button } from '../ui/button';
// import { Loader } from '../layout/Loader';
// import { Pencil, Trash2 } from 'lucide-react';
// import EntityFormDialog from './EntityFormDialog';
// import { opendir } from 'fs';

// type GenericEntity = {
//   id: string | number;
//   [key: string]: any;
// };

// type Column<T> = {
//   key: string;
//   label: string;
//   render?: (row: T) => React.ReactNode;
// };

// interface EntityTableProps {
//   entity: string;
// }

// const EntityTable: React.FC<EntityTableProps> = ({ entity }) => {
//   const [data, setData] = useState<GenericEntity[]>([]);
//   const [columns, setColumns] = useState<Column<GenericEntity>[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [err, setErr] = useState<string | null>(null);
//   const router = useRouter();
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [selectedEntity, setSelectedEntity] = useState<GenericEntity | null>(null);
//   const [mode, setMode] = useState<'edit' | 'remove' | 'create' | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const { data, error, loading } = await getAllEntities(entity);
//         setData(data);
//         setErr(error);
//         setLoading(loading);

//         if (data.length > 0) {
//           const keys = Object.keys(data[0]).filter((key) => key !== 'id');
//           const generatedColumns = keys.map((key) => ({
//             key,
//             label: key.charAt(0).toUpperCase() + key.slice(1),
//           }));
//           setColumns(generatedColumns);
//         }
//       } catch (e) {
//         console.error(e);
//         setErr('Failed to load data.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [entity]);

//   const handleEdit = (row: GenericEntity) => {
//     setSelectedEntity(row);
//     setMode('edit');
//     setDialogOpen(true);
//   };
  
//   const handleDelete = (row: GenericEntity) => {
//     setSelectedEntity(row);
//     setMode('remove');
//     setDialogOpen(true);
//   };

//   const handleCreate = () => {
//     setMode('create');
//     setDialogOpen(true);
//   };
  

//   const extendedColumns: Column<GenericEntity>[] = [
//     ...columns,
//     {
//       key: 'actions',
//       label: 'Actions',
//       render: (row) => (
//         <div className="flex gap-2">
//           <Button size="sm" variant="outline" onClick={() => handleEdit(row)}>
//             <Pencil className="w-4 h-4 mr-1" />
//             Edit
//           </Button>
//           <Button size="sm" variant="destructive" onClick={() => handleDelete(row)}>
//             <Trash2 className="w-4 h-4 mr-1" />
//             Delete
//           </Button>
//         </div>
//       ),
//     },
//   ];

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-48">
//         <Loader className="animate-spin" />
//       </div>
//     );
//   }

//   if (err) {
//     return (
//       <div className="text-red-500 text-center py-4">
//         {err}
//       </div>
//     );
//   }

//   if (!entity) return <div><Loader/></div>;

//   return (
//       <div className="p-6 bg-white dark:bg-gray-900 shadow-xl rounded-2xl overflow-x-auto">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold text-gray-800 dark:text-white capitalize">{entity} List</h2>
//           <Button size="sm" variant="outline" onClick={() => handleCreate()}>
//             + New {entity}
//           </Button>
//         </div>

//         <div className="min-w-full">
//           <Table className="min-w-full table-auto">
//           <TableHead>
//             <TableRow className="...">
//               {extendedColumns.map((col) => (
//                 <th
//                   key={col.key}
//                   className="text-gray-600 dark:text-gray-300 font-medium uppercase px-4 py-3 text-left whitespace-nowrap"
//                 >
//                   {col.label}
//                 </th>
//               ))}
//             </TableRow>
//           </TableHead>
//             {/* <TableHead>
//               <TableRow className="bg-gray-50 dark:bg-gray-800 text-sm">
//                 {extendedColumns.map((col) => (
//                   <TableCell
//                     key={col.key}
//                     className="text-gray-600 dark:text-gray-300 font-medium uppercase px-4 py-3 text-left whitespace-nowrap"
//                   >
//                     {col.label}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead> */}
//             <TableBody>
//               {data.map((row) => (
//                 <TableRow
//                   key={row.id}
//                   className="hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 border-t"
//                 >
//                   {extendedColumns.map((col) => (
//                     <TableCell
//                       key={col.key}
//                       className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200 whitespace-nowrap max-w-xs truncate"
//                     >
//                       {col.render ? col.render(row) : row[col.key]}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
    
//         {dialogOpen && (
//           <EntityFormDialog
//             open={dialogOpen}
//             onClose={() => setDialogOpen(false)}
//             entity={entity}
//             initialValues={selectedEntity || {}}
//             id={String(selectedEntity?.id)}
//             mode={mode}
//             // id={mode === 'edit' ? String(selectedEntity?.id) : undefined}
//           />
//         )}
//       </div>
//     );
// };

// export default EntityTable;






// // /cpmponents/shared/EntityTable.tsx

// import React, { useEffect, useState } from 'react';
// import { useAllEntities } from '@/hooks/use-query';
// import { Table, TableBody, TableCell, TableHead, TableRow } from '../ui/table';
// import { Button } from '../ui/button';
// import { Loader } from '../layout/Loader';
// import { useRouter } from 'next/navigation';
// import { getAllEntities } from '@/app/api/routes';


// type GenericEntity = {
//   id: string | number;
//   [key: string]: any;
// };

// type Column<T> = {
//   key: string;
//   label: string;
//   render?: (row: T) => React.ReactNode;
// };

// interface EntityTableProps {
//   entity: string;
// }


// const EntityTable: React.FC<EntityTableProps> = ({ entity }) => {
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

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center py-6">
//         <Loader className="animate-spin" />
//       </div>
//     );
//   }

//   // const extendedColumns: Column<T>[] = [
//     const extendedColumns: Column<GenericEntity>[] = [
//     ...columns,
//     {
//       key: 'actions',
//       label: 'Actions',
//       render: (row: any) => (
//         <div className="flex gap-2">
//           <Button size="sm" onClick={() => handleEdit(row)}>
//             Edit
//           </Button>
//           <Button size="sm" variant="destructive" onClick={() => handleDelete(row)}>
//             Delete
//           </Button>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <Table>
//       <TableHead>
//         <TableRow>
//           {extendedColumns.map((col) => (
//             <TableCell key={col.key}>{col.label}</TableCell>
//           ))}
//         </TableRow>
//       </TableHead>
//       <TableBody>
//         {/* {data?.map((row: T) => ( */}
//         {data.map((row) => (
//           <TableRow key={row.id}>
//             {extendedColumns.map((col) => (
//               <TableCell key={col.key}>
//                 {col.render ? col.render(row) : (row as any)[col.key]}
//               </TableCell>
//             ))}
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   );
// };

// export default EntityTable;




// import React from 'react';
// import { Table, TableBody, TableCell, TableHead, TableRow } from '../ui/table';
// import { Button } from '../ui/button';
// import { Loader } from 'lucide-react';
// import { useAllEntities } from '@/hooks/use-query';

// interface Column {
//   key: string;
//   label: string;
//   render?: (row: any) => React.ReactNode;
// }

// interface EntityTableProps {
//   entity: string;
//   columns: Column[];
//   onEdit: (row: any) => void;
//   onDelete: (row: any) => void;
// }

// const EntityTable = ({ entity, columns, onEdit, onDelete }: EntityTableProps) => {
//   const { data, loading } = useAllEntities(entity);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-32">
//         <Loader className="animate-spin" />
//       </div>
//     );
//   }

//   // Extend columns with an 'Actions' column
//   const extendedColumns: Column[] = [
//     ...columns,
//     {
//       key: 'actions',
//       label: 'Actions',
//       render: (row: any) => (
//         <div className="flex gap-2">
//           <Button size="sm" onClick={() => onEdit(row)}>
//             Edit
//           </Button>
//           <Button size="sm" variant="destructive" onClick={() => onDelete(row)}>
//             Delete
//           </Button>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <Table>
//       <TableHead>
//         <TableRow>
//           {extendedColumns.map((col) => (
//             <TableCell key={col.key}>{col.label}</TableCell>
//           ))}
//         </TableRow>
//       </TableHead>
//       <TableBody>
//         {data?.map((row: any) => (
//           <TableRow key={row.id}>
//             {extendedColumns.map((col) => (
//               <TableCell key={col.key}>
//                 {col.render ? col.render(row) : row[col.key]}
//               </TableCell>
//             ))}
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   );
// };

// export default EntityTable;





// import { useAllEntities } from '@/hooks/use-query';
// import React from 'react';
// import { Table, TableBody, TableCell, TableHead, TableRow } from '../ui/table';
// import { Button } from '../ui/button';

// interface EntityTableProps {
//   entity: string;
// }

// const EntityTable = ({ entity }: EntityTableProps) => {
//   const { data, loading } = useAllEntities(entity);

//   if (loading) return <div>Loading...</div>;

//   return (
//     <Table>
//       <TableHead>
//         <TableRow>
//           <TableCell>Name</TableCell>
//           <TableCell>Actions</TableCell>
//         </TableRow>
//       </TableHead>
//       <TableBody>
//         {data?.map((item: any) => (
//           <TableRow key={item.id}>
//             <TableCell>{item.name}</TableCell>
//             <TableCell>
//               <Button>Edit</Button>
//               <Button>Delete</Button>
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   );
// };

// export default EntityTable;






// // /components/shared

// // import { Button } from "../ui/button";
// import { Button } from "@/components/ui/button";
// import { DataTable } from "./DataTable";
// import { useAllEntities } from '@/hooks/use-query';
// import { Table, TableBody, TableCell, TableHead, TableRow } from '../ui/table';

// interface EntityTableProps<T> {
//   data: T[];
//   columns: any[];
//   onEdit: (row: T) => void;
//   onDelete: (row: T) => void;
// }

// export function EntityTable<T>({ data, columns, onEdit, onDelete }: EntityTableProps<T>) {
//   const extendedColumns = [
//     ...columns,
//     {
//       key: "actions",
//       label: "Actions",
//       render: (row: T) => (
//         <div className="flex gap-2">
//           <Button size="sm" onClick={() => onEdit(row)}>Edit</Button>
//           <Button size="sm" variant="destructive" onClick={() => onDelete(row)}>Delete</Button>
//         </div>
//       ),
//     },
//   ];

//   return <DataTable<T, any> data={data} columns={extendedColumns} />;
//   // return <DataTable<T> data={data} columns={extendedColumns} />;
// }


// // /components/shared/EntityTable.tsx
// import { FC } from 'react'
// import DataTable from './DataTable'

// interface EntityTableProps {
//   entity: string
//   columns: string[]
//   data: any[]
// }

// const EntityTable: FC<EntityTableProps> = ({ entity, columns, data }) => {
//   return (
//     <div className="p-4">
//       <h2>{entity} List</h2>
//       <DataTable columns={columns} data={data} />
//     </div>
//   )
// }

// export default EntityTable


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
