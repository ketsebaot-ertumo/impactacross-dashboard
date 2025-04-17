
// /lib/api/user.ts

import { BlogPayload } from "@/app/types";
import API from "../api";

export const getUser = async (id: string) => {
  const { data } = await API.get(`users/${id}`);
  return data;
};

export const loginUser = async (credentials: { email: string; password: string }) => {
  const { data } = await API.post(`auth/login`, credentials);
  return data;
};

export const logoutUser = async () => {
  const { data } = await API.post(`auth/logout`);
  return data;
};

// /lib/api/blog.ts
// import API from '../page';

export const getAllBlogs = async () => {
  const { data } = await API.get('blogs');
  return data;
};

export const getBlogById = async (id: string) => {
  const { data } = await API.get(`blogs/${id}`);
  return data;
};

export const createBlog = async (payload: BlogPayload) => {
  const { data } = await API.post('blogs', payload);
  return data;
};





// // lib/api/user.ts

// import { User } from '@/app/types';
// import { fetchData } from '../proxy/route';

// const BASE_URL = '/user';

// export async function getUsers() {
//   return fetchData<{ data: User[] }>(`${BASE_URL}`);
// }

// export async function getUserById(id: string) {
//   return fetchData<User>(`${BASE_URL}/${id}`);
// }

// export async function createUser(user: User) {
//   return fetchData<User>(`${BASE_URL}`, {
//     method: 'POST',
//     body: JSON.stringify(user),
//   });
// }

// export async function updateUser(id: string, user: User) {
//   return fetchData<User>(`${BASE_URL}/${id}`, {
//     method: 'PUT',
//     body: JSON.stringify(user),
//   });
// }

// export async function deleteUser(id: string) {
//   return fetchData(`${BASE_URL}/${id}`, {
//     method: 'DELETE',
//   });
// }
