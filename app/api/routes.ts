// /api/routes.ts

import API from "./api";

// login
export const loginUser = async (credentials: { email: string; password: string }) => {
    try{
      const { data } = await API.post(`auth/login`, credentials);
      return data;
    }catch(err){
      console.error(err);
      return null
    }
};

// logout
export const logoutUser = async () => {
    const { data } = await API.post(`auth/logout`);
    return data;
};



// Generic function to get a single entity by ID
export const getEntity = async (entity: string, id: string) => {
  const { data } = await API.get(`/${entity}/${id}`);
  return data;
};

// Generic function to get all entities of a type
export const getAllEntities = async (entity: string) => {
  const { data } = await API.get(`/${entity}`);
  return data;
};

// Generic function to create a new entity
export const createEntity = async (entity: string, values: any) => {
  const { data } = await API.post(`/${entity}`, values);
  return data;
};

// Generic function to update an existing entity
export const updateEntity = async (entity: string, id: string, values: any) => {
  const { data } = await API.put(`/${entity}/${id}`, values); // Changed to .put() for updating
  return data;
};

// Generic function to delete an entity
export const deleteEntity = async (entity: string, id: string) => {
  const { data } = await API.delete(`/${entity}/${id}`);
  return data;
};
  


// /lib/api/blog.ts
// import API from '../page';

// export const getAllBlogs = async () => {
//   const { data } = await API.get('blogs');
//   return data;
// };

// export const getBlogById = async (id: string) => {
//   const { data } = await API.get(`blogs/${id}`);
//   return data;
// };

// export const createBlog = async (payload: BlogPayload) => {
//   const { data } = await API.post('blogs', payload);
//   return data;
// };
  
// export const getUser = async (id: string) => {
//   const { data } = await API.get(`users/${id}`);
//   return data;
// };





// "use client";
// import API from './api';


// // get latest blog post
// export async function getLatestBlogPost() {
//     try {
//         const res = await API.get('/blog/latest');
//         if (res?.status === 200 || res?.data?.sucess) {
//             return res.data.data;
//         }
//         return null;
//     } catch (err) {
//         console.error("Error fetching latest blog post:", err);
//         throw err;
//     }
// };

// // get all blog post
// export async function getAllBlogs( currentPage, limit ) {
//     console.log("\n\n\npage:",currentPage, "limit", limit)
//   try {
//     const res = await API.get(`/blog?limit=${limit}&page=${currentPage}`);
//     console.log(res)
//     if (res.status === 200 || res.data.success) {
//       return res.data;
//     }
//     return null
//   } catch (err) {
//     console.error("Error fetching latest blog post:", err);
//     throw err;
//   }
// }

// // get single blog post
// export async function getSingleBlogPost(id) {
//     try {
//         const res = await API.get(`/blog/${id}`);
//         if (res.status === 200 || res.data.success) {
//             return res.data.data;
//         }
//         return null;
//     } catch (err) {
//         console.error("Error fetching latest blog post:", err);
//         throw err;
//     }
// };


// // get latest publication post
// export async function getLatestPublication() {
//     try {
//         const res = await API.get('/publication/latest');
//         if (res?.status === 200 || res?.data?.sucess) {
//             return res.data.data;
//         }
//         return null;
//     } catch (err) {
//         console.error("Error fetching latest post:", err);
//         throw err;
//     }
// };

// // get all publication post
// export async function getAllPublication( page, limit ) {
//   try {
//     const res = await API.get(`/publication/?limit=${limit}&page=${page}`);
//     if (res.status === 200 || res.data.success) {
//         return res.data;
//     }
//     return null
//   } catch (err) {
//     console.error("Error fetching latest post:", err);
//     throw err;
//   }
// }


// // get single publication
// export async function getSinglePublicationPost(id) {
//   try {
//     const res = await API.get(`/publication/${id}`);
//     if (res.status === 200 || res.data.success) {
//         return res.data.data;
//     }
//     return null;
//   } catch (err) {
//     console.error("Error fetching latest post:", err);
//     throw err;
//   }
// };

// // get latest multimedia post
// export async function getLatestMultimedia() {
//     try {
//         const res = await API.get('/multimedia/latest');
//         if (res?.status === 200 || res?.data?.sucess) {
//             return res.data.data;
//         }
//         return null;
//     } catch (err) {
//         console.error("Error fetching latest post:", err);
//         throw err;
//     }
// };

// // get all multimedia post
// export async function getAllMultimedias( page, limit ) {
//     try {
//         const res = await API.get(`/multimedia/?limit=${limit}&page=${page}`);
//         if (res.status === 200 || res.data.success) {
//             return res.data;
//         }
//         return null
//     } catch (err) {
//         console.error("Error fetching latest post:", err);
//         throw err;
//     }
// }

// // get single multimedia
// export async function getSingleMultimediaPost(id) {
//     try {
//         const res = await API.get(`/multimedia/${id}`);
//         if (res.status === 200 || res.data.success) {
//             return res.data.data;
//         }
//         return null;
//     } catch (err) {
//         console.error("Error fetching latest multimedia post:", err);
//         throw err;
//     }
// };


// // get latest training post
// export async function getLatestTraining() {
//     try {
//         const res = await API.get('/training/latest');
//         if (res?.status === 200 || res?.data?.sucess) {
//             return res.data.data;
//         }
//         return null;
//     } catch (err) {
//         console.error("Error fetching latest training post:", err);
//         throw err;
//     }
// };

// // get all training post
// export async function getAllTrainings( page, limit ) {
//     try {
//         const res = await API.get(`/training/?limit=${limit}&page=${page}`);
//         if (res.status === 200 || res.data.success) {
//             return res.data;
//         }
//         return null
//     } catch (err) {
//         console.error("Error fetching latest training post:", err);
//         throw err;
//     }
// }

// // get single training
// export async function getSingleTrainingPost(id) {
//     try {
//         const res = await API.get(`/training/${id}`);
//         if (res.status === 200 || res.data.success) {
//             return res.data.data;
//         }
//         return null;
//     } catch (err) {
//         console.error("Error fetching latest training post:", err);
//         throw err;
//     }
// };

  