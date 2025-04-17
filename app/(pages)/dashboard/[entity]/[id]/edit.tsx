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

