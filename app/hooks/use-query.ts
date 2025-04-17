
// /hooks/use-query.ts
import { useEffect, useState } from 'react';

export const useQuery = <T>(fetcher: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetcher();
        setData(res);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [fetcher]);

  return { data, error, loading };
};





// import { useState, useEffect } from 'react';
// import { fetchData } from '../lib/proxy/route';

// export function useQuery<T>(url: string) {
//   const [data, setData] = useState<T | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchDataFromAPI = async () => {
//       try {
//         const response = await fetchData<T>(url);
//         setData(response);
//       } catch (err) {
//         setError('Error fetching data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDataFromAPI();
//   }, [url]);

//   return { data, loading, error };
// }
