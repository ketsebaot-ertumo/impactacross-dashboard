// 'use client';
// import { useForm } from 'react-hook-form';
// import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';

// export function UserFormDialog({ defaultValues, onSubmit }: any) {
//   const { register, handleSubmit } = useForm({ defaultValues });

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button>{defaultValues ? 'Edit User' : 'Add User'}</Button>
//       </DialogTrigger>
//       <DialogContent>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <Input {...register('name')} placeholder="Name" />
//           <Input {...register('email')} placeholder="Email" type="email" />
//           <Button type="submit">Save</Button>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }
