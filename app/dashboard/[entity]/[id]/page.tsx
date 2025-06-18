'use client';

import { useParams } from 'next/navigation';
import { useSingleEntity } from '@/hooks/use-query';
import { useMemo } from 'react';
import { Loader } from '@/components/layout/Loader';

export default function EntityDetailPage() {
  const { entity, id } = useParams() as { entity: string; id: string };

  const { data, loading } = useSingleEntity(entity, id);
  console.log("\n data:", data)

  const formattedEntity = useMemo(() => {
    return entity.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  }, [entity]);

  if (loading) return <LoadingSkeleton />;
//   if (err) return <ErrorState message={err} />;
  if (!data?.data) return <EmptyState />;

  return (
    <div className="bg-gray-50 pt-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-6 sm:p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">{formattedEntity} Details</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Object.entries(data?.data).map(([key, value]) => (
            <DetailItem key={key} label={key} value={value} />
          ))}
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: any }) {
  const formattedLabel = label
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const displayValue =
    typeof value === 'boolean'
      ? value
        ? 'Yes'
        : 'No'
      : typeof value === 'object' && value !== null
      ? JSON.stringify(value, null, 2)
      : value ?? '-';

  return (
    <div className="bg-gray-100 rounded-lg p-4 shadow-sm">
      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{formattedLabel}</p>
      <p className="text-base text-gray-800 break-all whitespace-pre-wrap">{displayValue}</p>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <Loader/>
    // <div className="min-h-[50vh] flex items-center justify-center text-gray-500 animate-pulse">
    //   Loading...
    // </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="min-h-[50vh] flex items-center justify-center text-red-500">
      {message}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center text-gray-600">
      No data available.
    </div>
  );
}






// import { useRouter } from 'next/router';
// import { useSingleEntity } from '@/hooks/use-query';
// import EntityForm from '@/shared/EntityForm';

// const EditEntityPage = () => {
//   const router = useRouter();
//   const { entity, id } = router.query;

//   if (!entity || !id) return <div>Loading...</div>;

//   const { data, loading } = useSingleEntity(entity as string, id as string);

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div>
//       <h1>Edit {entity}</h1>
//       <EntityForm entity={entity as string} initialValues={data} id={id as string} onClose={() => router.push(`/dashboard/${entity}`)} />
//     </div>
//   );
// };

// export default EditEntityPage;





// // app/dashboard/[entity]/[id]/edit.tsx
// 'use client';

// import { useParams } from 'next/navigation';
// import EntityForm from '@/components/shared/EntityForm';

// export default function EditEntityPage() {
//   const { entity, id } = useParams();

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold capitalize mb-4">Edit {entity}</h1>
//       <EntityForm entity={entity} id={id} />
//     </div>
//   );
// }



// // app/dashboard/[entity]/[id]/edit.tsx

// import { useRouter } from 'next/router';
// import { useState, useEffect } from 'react';
// import { getUser } from '../../../lib/api/user';
// import UserForm from '../../../components/entity/users/UserForm';

// const EditEntityPage = () => {
//   const router = useRouter();
//   const { id, entity } = router.query;
//   const [entityData, setEntityData] = useState<any>(null);

//   useEffect(() => {
//     if (id && entity) {
//       getUser(id).then((data) => setEntityData(data));
//     }
//   }, [id, entity]);

//   return entityData ? <UserForm initialData={entityData} /> : <div>Loading...</div>;
// };

// export default EditEntityPage;

