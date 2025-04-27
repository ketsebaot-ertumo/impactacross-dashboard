// // /components/entity/users/UserForm.tsx

// import { useState, useEffect } from 'react';
// import { Button, Input } from '../../ui'; // Import UI components
// import { useQuery } from '../../../hooks/use-query'; // Custom hook to fetch user data if editing

// const UserForm = ({ userId }: { userId?: string }) => {
//   const [userData, setUserData] = useState<any>({
//     name: '',
//     email: '',
//     role: '',
//   });

//   const { data, isLoading, error } = useQuery(userId ? `/users/${userId}` : null);

//   useEffect(() => {
//     if (data) {
//       setUserData(data);
//     }
//   }, [data]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setUserData({
//       ...userData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Make an API request to save user data
//     // Example: postUserData(userData);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <Input
//         label="Name"
//         name="name"
//         value={userData.name}
//         onChange={handleChange}
//       />
//       <Input
//         label="Email"
//         name="email"
//         type="email"
//         value={userData.email}
//         onChange={handleChange}
//       />
//       <Input
//         label="Role"
//         name="role"
//         value={userData.role}
//         onChange={handleChange}
//       />
//       <Button type="submit">Save User</Button>
//     </form>
//   );
// };

// export default UserForm;
