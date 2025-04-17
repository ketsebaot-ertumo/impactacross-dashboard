// // lib/api/blog.ts

// import { fetchData } from '../proxy/route';

// const BASE_URL = '/api/blogs';

// export async function getBlogs() {
//   return fetchData<{ data: Blog[] }>(`${BASE_URL}`);
// }

// export async function getBlogById(id: string) {
//   return fetchData<Blog>(`${BASE_URL}/${id}`);
// }

// export async function createBlog(blog: Blog) {
//   return fetchData<Blog>(`${BASE_URL}`, {
//     method: 'POST',
//     body: JSON.stringify(blog),
//   });
// }

// export async function updateBlog(id: string, blog: Blog) {
//   return fetchData<Blog>(`${BASE_URL}/${id}`, {
//     method: 'PUT',
//     body: JSON.stringify(blog),
//   });
// }

// export async function deleteBlog(id: string) {
//   return fetchData(`${BASE_URL}/${id}`, {
//     method: 'DELETE',
//   });
// }
