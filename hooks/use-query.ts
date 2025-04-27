// /hooks/use-query.ts
"use client"

import { useCallback, useEffect, useState } from "react";
import { createEntity, deleteEntity, getAllEntities, getEntity, updateEntity } from "@/app/api/routes";
import { useToast } from "./use-toast";
import API from "@/app/api/api";


export const useQuery = <T>(fetcher: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const { success, error } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetcher();
        setData(res);
        // success("Data loaded!");
      } catch (err) {
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
export const useAllEntities = (
  entity: string,
  { page = 1, limit = 10 }: { page?: number; limit?: number }
) => {
  const fetchAllEntities = useCallback(
    async () => await getAllEntities(entity, { page, limit }),
    // async () => await API.get(`/${entity}?limit=${limit}&page=${page}`),
    [entity, page, limit]
  );

  return useQuery(fetchAllEntities);
};


// Fetch single entity
export const useSingleEntity = (entity: string, id: string) => {
  // Memoize fetchEntity function to avoid re-triggering on every re-render
  const fetchEntity = useCallback(async () => await getEntity(entity, id), [entity, id]);
  return useQuery(fetchEntity);
};


// CRUD actions (used inside forms or dialogs)
export const useEntityActions = (entity: string) => {
  const { success } = useToast();

  return {
    create: async (values: any) => {
        const res = await createEntity(entity, values);
        success("Created successfully" );
        return res;
    },

    // delete
    update: async (id: string, values: any) => {
        const res = await updateEntity(entity, id, values);
        success("Updated successfully");
        return res;
    },

    // remove
    remove: async (id: string) => {
        const res = await deleteEntity(entity, id);
        success("Deleted successfully");
        return res;
    },
  };
};
