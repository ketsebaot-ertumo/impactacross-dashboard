// /app/dashboard/page.tsx

"use client";

import { Loader } from '@/components/layout/Loader';
import EntityTable from '@/components/shared/EntityTable';
import { useParams } from 'next/navigation';

const EntityPage = () => {
  const params = useParams();
  const entity = params?.entity as string;

    if (!entity) return <div><Loader/></div>;

  return (
    <div>
      {/* <h1>{entity}</h1> */}
      <EntityTable entity={entity} />
    </div>
  );
};

export default EntityPage;





// // /app/[entity]/page.tsx
// // import { EntityTable } from "@/app/components/shared/EntityTable";
// import { EntityTable } from "@/app/components/shared/EntityTable";
// import { useAllEntities } from "@/app/hooks/use-query";
// import { createEntity, updateEntity } from "@/app/lib/routes";
// import { useParams } from "next/navigation";

// export default function EntityPage() {
//   const { entity } = useParams();

//   if (!entity) {
//     return <div>No entity specified</div>;
//   }

//   // Fetch all entities for the specified entity type using useAllEntities hook
//   const { data, loading, error } = useAllEntities(entity);

//   // Create new entity function
//   const createNewEntity = async (values: any) => {
//     await createEntity(entity, values);
//   };

//   // Update existing entity function
//   const updateExistingEntity = async (id: string, values: any) => {
//     await updateEntity(entity, id, values);
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error loading {entity}: {error.message}</div>;
//   if (!data) return <div>No data found for {entity}</div>;

//   return (
//     <div>
//       <h1>{entity} Management</h1>
//       <EntityTable
//         data={data}
//         onCreate={createNewEntity}
//         onUpdate={updateExistingEntity}
//       />
//     </div>
//   );
// }





// // 'use client';

// // import { EntityTable } from '@/app/components/shared/EntityTable';
// // import { useQuery } from '@/app/hooks/use-query';
// // import { useParams } from 'next/navigation';

// // const EntityPage = () => {
// //   const params = useParams();
// //   const entity = params.entity as string;

// //   const { data, error, loading } = useQuery(`/${entity}`);

// //   if (loading) return <div>Loading...</div>;
// //   if (error) return <div>Error: {error.message}</div>; // make sure it's `error.message`

// //   return (
// //     <div>
// //       <h2 className="text-xl">{entity} List</h2>
// //       <EntityTable entity={data} /> {/* Make sure EntityTable expects `entity` as a prop */}
// //     </div>
// //   );
// // };

// // export default EntityPage;





// // // import { EntityTable } from '@/app/components/shared/EntityTable';
// // // import { useQuery } from '@/app/hooks/use-query';
// // // import { useParams } from 'next/navigation';
// // // // import EntityTable from '@/app/components/shared/EntityTable';

// // // const EntityPage = () => {
// // //   // const router = useRouter();
// // //   // const { entity } = router.query;
// // //   const { entity } = useParams();
// // //   const { data, error, loading } = useQuery(`/api/${entity}`);

// // //   if (loading) return <div>Loading...</div>;
// // //   if (error) return <div>Error: {error}</div>;

// // //   return (
// // //     <div>
// // //       <h2 className="text-xl">{entity} List</h2>
// // //       <EntityTable entity={data} />
// // //     </div>
// // //   );
// // // };

// // // export default EntityPage;

