// 'use client'

// import { useForm } from 'react-hook-form'
// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from '@/components/ui/dialog'
// import { Input } from '@/components/ui/input'
// import { Button } from '@/components/ui/button'
// import { useEffect } from 'react'

// type UserFormProps = {
//   defaultValues?: {
//     name: string
//     email: string
//   }
//   onSubmit: (data: any) => void
//   triggerLabel?: string
// }

// export function UserFormDialog({
//   defaultValues,
//   onSubmit,
//   triggerLabel = 'Add User',
// }: UserFormProps) {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { isSubmitting },
//   } = useForm({
//     defaultValues,
//   })

//   useEffect(() => {
//     if (defaultValues) reset(defaultValues)
//   }, [defaultValues, reset])

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="outline">{defaultValues ? 'Edit' : triggerLabel}</Button>
//       </DialogTrigger>

//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>{defaultValues ? 'Edit User' : 'Add New User'}</DialogTitle>
//         </DialogHeader>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <Input {...register('name')} placeholder="Full Name" />
//           <Input {...register('email')} type="email" placeholder="Email Address" />
//           <DialogFooter>
//             <Button type="submit" disabled={isSubmitting}>
//               {isSubmitting ? 'Saving...' : 'Save'}
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   )
// }
