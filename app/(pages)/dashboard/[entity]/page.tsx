
// import { useQuery } from '@/app/hooks/use-query';
// import { useParams } from 'next/navigation';
// import { useRouter } from 'next/router';
// // import EntityTable from '@/app/components/shared/EntityTable';

// const EntityPage = () => {
//   // const router = useRouter();
//   // const { entity } = router.query;
//   const { entity } = useParams();
//   const { data, error, loading } = useQuery(`/api/${entity}`);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <h2 className="text-xl">{entity} List</h2>
//       <EntityTable entity={data} />
//     </div>
//   );
// };

// export default EntityPage;

