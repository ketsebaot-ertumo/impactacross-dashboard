// /hooks/use-query.ts

import { useEffect, useState } from "react";
import { createEntity, deleteEntity, getAllEntities, getEntity, updateEntity } from "@/app/api/routes";
import { useToast } from "./use-toast";

export const useQuery = <T>(fetcher: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  // const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const { success, error } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetcher();
        setData(res);
        success("Data loaded!");
      } catch (err) {
        // setError(err as Error);
        error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [fetcher]);

  return { data, error, loading };
};


// Fetch all entities
export const useAllEntities = (entity: string) => {
  const { info } = useToast();
  try{
    const fetchAllEntities = async () => await getAllEntities(entity);
    return useQuery(fetchAllEntities);
  } catch(err){
    console.error(err);
    info(`Unable to fetching ${entity} detail.`);
    throw err;
  }
};


// Fetch single entity
export const useSingleEntity = (entity: string, id: string) => {
  const { info } = useToast();
  try{
    const fetchEntity = async () => await getEntity(entity, id);
    return useQuery(fetchEntity);
  } catch(err){
    console.error(err);
    info(`Unable to fetching ${entity} detail.`);
    throw err;
  }
};

// CRUD actions (used inside forms or dialogs)
export const useEntityActions = (entity: string) => {
  const { info } = useToast();

  return {
    create: async (values: any) => {
      try {
        const res = await createEntity(entity, values);
        info("Created successfully" );
        return res;
      } catch (err: any) {
        info("Create failed");
        console.error(err);
        throw err;
      }
    },
    update: async (id: string, values: any) => {
      try {
        const res = await updateEntity(entity, id, values);
        info("Updated successfully");
        return res;
      } catch (err: any) {
        info("Update failed");
        console.error(err);
        throw err;
      }
    },
    remove: async (id: string) => {
      try {
        const res = await deleteEntity(entity, id);
        info("Deleted successfully");
        return res;
      } catch (err: any) {
        info("Delete failed");
        console.error(err);
        throw err;
      }
    },
  };
};





  // useEffect(() => {
  //   const load = async () => {
  //     try {
  //       const res = await fetcher();
  //       setData(res);
  //     } catch (err) {
  //       setError(err as Error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   load();
  // }, [fetcher]);



// // /hooks/use-query.ts
// import { useEffect, useState } from "react";
// import { createEntity, deleteEntity, getAllEntities, getEntity, updateEntity } from "../lib/routes";

// export const useQuery = <T>(fetcher: () => Promise<T>) => {
//   const [data, setData] = useState<T | null>(null);
//   const [error, setError] = useState<Error | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const res = await fetcher();
//         setData(res);
//       } catch (err) {
//         setError(err as Error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     load();
//   }, [fetcher]);

//   return { data, error, loading };
// };

// // Custom hook for fetching all entities
// export const useAllEntities = (entity: string) => {
//   const fetchAllEntities = async () => {
//     return await getAllEntities(entity);
//   };
//   return useQuery(fetchAllEntities);
// };


// // Custom hook for fetching a single entity by ID
// export const useSingleEntity = (entity: string, id: string) => {
//   const fetchEntity = async () => {
//     return await getEntity(entity, id);
//   };
//   return useQuery(fetchEntity);
// };


// // CRUD utility hooks
// export const useEntityActions = (entity: string) => {
//   return {
//     create: (values: any) => createEntity(entity, values),
//     update: (id: string, values: any) => updateEntity(entity, id, values),
//     remove: (id: string) => deleteEntity(entity, id),
//   };
// };


// create entity
// export const useCreateEntity = (entity: string, id: string) => {
// };

// edit entity
// export const useEditEntity = (entity: string, id: string) => {
// };

// delete entity
// export const useEditEntity = (entity: string, id: string) => {
// };






// // /hooks/use-query.ts
// import { useEffect, useState } from 'react';

// export const useQuery = <T>(fetcher: () => Promise<T>) => {
//   const [data, setData] = useState<T | null>(null);
//   const [error, setError] = useState<Error | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const res = await fetcher();
//         setData(res);
//       } catch (err) {
//         setError(err as Error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     load();
//   }, [fetcher]);

//   return { data, error, loading };
// };





// // import { useState, useEffect } from 'react';
// // import { fetchData } from '../lib/proxy/route';

// // export function useQuery<T>(url: string) {
// //   const [data, setData] = useState<T | null>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);

// //   useEffect(() => {
// //     const fetchDataFromAPI = async () => {
// //       try {
// //         const response = await fetchData<T>(url);
// //         setData(response);
// //       } catch (err) {
// //         setError('Error fetching data');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchDataFromAPI();
// //   }, [url]);

// //   return { data, loading, error };
// // }
