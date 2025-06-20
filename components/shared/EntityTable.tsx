// /components/shared/EntityTable.tsx

"use client";

import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { Loader } from '../layout/Loader';
import { Download, Pencil, Plus, Printer, Trash2 } from 'lucide-react';
import { useAllEntities } from '@/hooks/use-query';
import EntityFormDialog from './EntityFormDialog';
import { UserResponse } from '@/types';
import { defaultFields } from '@/types/defaultFields';
import { Section } from '@/types/section';
import { Owner } from '@/types/owner';

type GenericEntity = {
  _id: string | number;
  [key: string]: any;
  pagination: any;
};

type Column<T> = {
  key: string;
  label: string | boolean;
  render?: (row: T) => React.ReactNode;
};

interface EntityTableProps {
  entity: string;
}

const EntityTable: React.FC<EntityTableProps> = ({ entity }) => {
  const [data, setData] = useState<GenericEntity[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState<GenericEntity | null>(null);
  const [mode, setMode] = useState<'edit' | 'remove' | 'create' | null>(null);
  const { data: response, loading: loading, refetch  } = useAllEntities(entity, { page: 1, limit: 20 });
  const [sections, setSections] = useState<Section[]>([]);
  const [owners, setOwners] = useState<Owner[]>([]);
  const [users, setUsers] = useState<UserResponse[]>([]);
  const { data: sectionData, loading: sectionLoading } = useAllEntities("sections");
  const { data: ownerData, loading: ownerLoading } = useAllEntities("owners");
  const { data: userData, loading: userLoading } = useAllEntities("users");

  const columns = Object.keys(defaultFields[entity] || {}).map(key => ({
    key,
    label: key.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
    render:
      entity === "multimedias" && key === "tags"
        ? (row: GenericEntity) => `${row.args?.length || 0} tags`
        : undefined,
  }));


  useEffect(() => {
    try{
      if (ownerData?.data) setOwners(ownerData.data);
      if (sectionData?.data) setSections(sectionData.data);
      if (userData?.data) setUsers(userData.data);
      if (response?.data) setData(response?.data);
    } catch (err){
      console.error(err);
      setErr('Failed to load data.');
    }

    }, [userData?.data, sectionData?.data, ownerData?.data, response?.data]);


  if(loading) return <Loader/>
  if (err) {
    return (
      <div className="text-red-500 text-center py-4 h-[60vh] flex items-center justify-center">
        {err}
      </div>
    );
  }

  const getInstructorsAndCreators = () => {
    return {
      owners,
      sections,
      users,
    };
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
    const defaultEntity = defaultFields[entity] || {}; 
    setSelectedEntity(defaultEntity);
    setMode('create');
    setDialogOpen(true);
  };

  if(!data || !data.length)
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold text-gray-800">
            No {entity} available
          </h2>
          <p className="text-gray-600 text-base pb-4">
            We couldn't find any {entity} at the moment. Please check back later or contact support.
          </p>

          {(entity !== "users" && entity !== "owners") && (
            <Button className="bg-primary hover:bg-primary hover:opacity-70 text-white cursor-pointer" size="sm" onClick={() => handleCreate()}>
              <Plus/> <span className='mr-2'>Add</span>
            </Button>
          )}

          {dialogOpen && (
            <EntityFormDialog
              open={dialogOpen}
              onClose={() => setDialogOpen(false)}
              entity={entity}
              initialValues={selectedEntity || {}}
              mode="create"
              id=""
              data = {getInstructorsAndCreators()}
              columns={columns}
            />
          )}
        </div>
      </div>
    )

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
          <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); handleEdit(row); }}>
            <Pencil className="w-4 h-4 mr-1" />
          </Button>
          <Button size="sm" variant="destructive" onClick={(e) => { e.stopPropagation(); handleDelete(row); }}>
            <Trash2 className="w-4 h-4 mr-1" />
          </Button>

        </div>
      ),
    },
  ];

  return (
    <div className="overflow-auto p-4 md:p-6 bg-white dark:bg-gray-900 shadow-xl rounded-2xl mt-6 w-[calc(100vw-50px)] md:w-[calc(100vw-280px)] lg:w-[calc(100vw-320px)]">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white capitalize mb-4">{entity} Data</h2>

      <div className="space-y-4 w-full">
        {/* Top actions: Print and Export */}
        <div className="flex justify-end gap-2 w-full">
          <Button className='cursor-pointer' size="sm" variant="outline" onClick={() => window.print()}>
            <Printer/>
          </Button>
          <Button className='cursor-pointer' size="sm" variant="outline" onClick={() => handleExport()}>
            <Download />
          </Button>
          {entity !== "users" &&(
            <Button className="bg-primary hover:bg-primary hover:opacity-70 text-white cursor-pointer" size="sm" onClick={() => handleCreate()}>
              <Plus className='mx-2'/>
            </Button>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto border rounded-md">
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
                <TableRow
                  key={index}
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => window.location.href = `/dashboard/${entity}/${row.id}`}
                >
                  {extendedColumns.map((column) => (
                    <TableCell key={column.key} className="truncate max-w-[150px] text-gray-600">
                      {column.render ? (
                        column.render(row)
                      ) : (
                        <span title={String(row[column.key])}>
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
      </div>

      {dialogOpen && (
        <EntityFormDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          entity={entity}
          initialValues={selectedEntity || {}}
          mode={mode}
          id={mode === 'create' ? "" : String(`${selectedEntity?.id}`)}
          data = {getInstructorsAndCreators()}
          columns={columns}
          refetch={refetch}
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

// type GenericEntity = {
//   id: string | number;
//   [key: string]: any;
//   pagination: any;
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
//   const [loading, setLoading] = useState<boolean | undefined | null>(true);
//   const [err, setErr] = useState<string | null>(null);
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [selectedEntity, setSelectedEntity] = useState<GenericEntity | null>(null);
//   const [mode, setMode] = useState<'edit' | 'remove' | 'create' | null>(null);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [totalPages, setTotalPages] = useState<number>(2);
//   const [pageSize, setPageSize] = useState<number>(5);
//   const [total, setTotal] = useState<number>(5);
//   const response = useAllEntities(entity, { page: currentPage, limit: pageSize });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setData(response?.data?.data || []);
//         setTotalPages(response?.data?.pagination.totalPages);
//         setLoading(response?.loading);

//         if (response?.data?.data?.length > 0) {
//           const keys = Object.keys(response.data.data[0]).filter((key) => key !== 'userId');
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
//   }, [response?.data?.data, currentPage, pageSize]);

//   const handlePagination = (page: number) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

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

//   const handleExport = () => {
//     const csvContent = [
//       columns.map((col) => col.label).join(','),
//       ...data.map((row) =>
//         columns.map((col) => JSON.stringify(row[col.key] ?? '')).join(',')
//       ),
//     ].join('\n');

//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.setAttribute('download', `${entity}_export.csv`);
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
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
//           </Button>
//           <Button size="sm" variant="destructive" onClick={() => handleDelete(row)}>
//             <Trash2 className="w-4 h-4 mr-1" />
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

//   if (!data) return <div>Oops, {entity} Not found!</div>;

//   return (
//     <div className="p-4 md:p-6 bg-white dark:bg-gray-900 shadow-xl rounded-2xl mt-6 w-[calc(100vw-50px)] md:w-[calc(100vw-280px)] lg:w-[calc(100vw-320px)]">
//       <h2 className="text-xl md:text-4xl font-semibold text-gray-800 dark:text-white capitalize mb-4">{entity} List</h2>

//       <div className="space-y-4 w-full">
//         {/* Top actions: Print and Export */}
//         <div className="flex justify-end gap-2 w-full">
//           <Button size="sm" variant="outline" onClick={() => window.print()}>
//             Print
//           </Button>
//           <Button size="sm" variant="outline" onClick={() => handleExport()}>
//             Export
//           </Button>
//           <Button className="bg-blue-500 hover:bg-blue-400 text-white hover:text-white" size="sm" variant="outline" onClick={() => handleCreate()}>
//             + New
//           </Button>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto border rounded-md">
//           <Table className="min-w-full">
//             <TableHeader>
//               <TableRow>
//                 {extendedColumns?.map((column) => (
//                   <TableHead key={column.key} className="bg-gray-100 text-gray-600 whitespace-nowrap text-md font-semibold py-6">
//                     {column.label}
//                   </TableHead>
//                 ))}
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {data?.map((row, index) => (
//                 <TableRow key={index} className="hover:bg-gray-100">
//                   {extendedColumns.map((column) => (
//                     <TableCell key={column.key} className="truncate max-w-[150px] text-gray-600">
//                       {column.render ? (
//                         column.render(row)
//                       ) : (
//                         <span title={String(row[column.key])}>
//                         {/* <span title={row[column.key] != null ? String(row[column.key]) : ''}> */}
//                           {String(row[column.key])?.length > 20
//                             ? `${String(row[column.key]).slice(0, 10)}..`
//                             : String(row[column.key])}
//                         </span>
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>

//         {/* Pagination & Controls */}
//         <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={() => handlePagination(currentPage - 1)}
//               disabled={currentPage === 1}
//               className={`px-4 py-2 rounded-md font-medium transition ${
//                 currentPage === 1
//                   ? "border border-gray-300 text-gray-600 cursor-not-allowed"
//                   : "bg-blue-500 text-white hover:bg-blue-400"
//               }`}
//             >
//               Previous
//             </button>

//             <span className="text-gray-700 font-medium">
//               Page {currentPage} of {totalPages || 4}
//             </span>

//             <button
//               onClick={() => handlePagination(currentPage + 1)}
//               disabled={currentPage === totalPages}
//               className={`px-4 py-2 rounded-md font-medium transition ${
//                 currentPage === totalPages
//                   ? "border border-gray-300 text-gray-600 cursor-not-allowed"
//                   : "bg-blue-500 text-white hover:bg-blue-400"
//               }`}
//             >
//               Next
//             </button>
//           </div>

//           <div className="hidden lg:flex items-center gap-2">
//             <label htmlFor="pageSize" className="text-sm text-gray-700 font-medium">
//               Posts per page:
//             </label>
//             <select
//               id="pageSize"
//               value={pageSize}
//               onChange={(e) => {
//                 setPageSize(Number(e.target.value));
//                 setCurrentPage(1);
//               }}
//               className="border border-gray-300 rounded px-3 py-1 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               {[2, 5, 10, 25].map((size) => (
//                 <option key={size} value={size}>
//                   {size} posts
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>

//       {dialogOpen && (
//         <EntityFormDialog
//           open={dialogOpen}
//           onClose={() => setDialogOpen(false)}
//           entity={entity}
//           initialValues={selectedEntity || {}}
//           mode={mode}
//           id={mode === 'create' ? undefined : String(selectedEntity?.id)}
//         />
//       )}
//     </div>
//   );
// };

// export default EntityTable;

