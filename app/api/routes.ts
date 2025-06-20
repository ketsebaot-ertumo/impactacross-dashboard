// /api/routes.ts

import API from "./api";


// register
export const registerUser = async (credentials: {firstName: string; lastName: string; email: string; password: string; phoneNumber: string;}) => {
  try{
    const data = await API.post(`auth/signup`, credentials);
    return data;
  }catch(err: any){
    // console.error(err);
    return  err.message
  }
};

// login
export const loginUser = async (credentials: { email: string; password: string }) => {
    try{
      const data = await API.post(`auth/login`, credentials);
      return data;
    }catch(err: any){
      console.error(err);
      return  err.message
    }
};

// === GET ALL ===
export const getAllEntities = async (
  entity: string,
  options?: { page?: number; limit?: number }
) => {
  const page = options?.page ?? 1;
  const limit = options?.limit ?? 10;
  const { data } = await API.get(`/${entity}?limit=${limit}&page=${page}`);
  return data;
};


// === GET LATEST ===
export async function getLatestEntity(entity: string ) {
  try {
      const res = await API.get(`/${entity}/latest`);
      return res?.data || res;
  } catch (err: any) {
      console.error(`Error fetching latest ${entity}:`, err);
      return err.message;
  }
}



// === GET DATA BY ID ===
export const getEntity = async (entity: string, id: string) => {
  try{
    const data = await API.get(`/${entity}/${id}`);
    return data;
  }catch(err: any){
    // console.error(err);
    return err.message
  }
};



// Generic function to create a new entity
export const createEntity = async (entity: string, values: any) => {
  try{
    const data = await API.post(`/${entity}`, values);
    return data;
  }catch(err: any){
    // console.error("\nerror in createEntity", err.message, "\nerr:",err?.response?.data?.error?.detail, );
    return err?.response?.data?.error || err.message || "Unknown error";
  }
};

// Generic function to update an existing entity
export const updateEntity = async (entity: string, id: string, values: any) => {
  try{
    const data = await API.put(`/${entity}/id/${id}`, values); 
    return data;
  }catch(err: any){
    // console.error(err);
    return err?.response?.data?.error || err.message || "Unknown error";
  }
};

// Generic function to delete an entity
export const deleteEntity = async (entity: string, id: string) => {
  try{
    const data = await API.delete(`/${entity}/${id}`);
    return data;
  }catch(err: any){
    // console.error(err);
    return err?.response?.data?.error || err.message || "Unknown error";
  }
};
