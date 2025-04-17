// // components/shared/EntityForm.tsx
// 'use client';

// import { useEffect, useState } from 'react';
// import { fetchEntityItem, saveEntityItem } from '@/lib/api';
// import { useRouter } from 'next/navigation';

// interface EntityFormProps {
//   entity: string;
//   id?: string;
// }

// export default function EntityForm({ entity, id }: EntityFormProps) {
//   const [formData, setFormData] = useState({});
//   const router = useRouter();

//   useEffect(() => {
//     if (id) {
//       fetchEntityItem(entity, id).then(setFormData);
//     }
//   }, [entity, id]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await saveEntityItem(entity, formData);
//     router.push(`/dashboard/${entity}`);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       {/* Render form fields dynamically based on formData */}
//       {Object.keys(formData).map((key) => (
//         <div key={key}>
//           <label className="block text-sm font-medium text-gray-700">{key}</label>
//           <input
//             type="text"
//             name={key}
//             value={formData[key]}
//             onChange={handleChange}
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
//           />
//         </div>
//       ))}
//       <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
//         Save
//       </button>
//     </form>
//   );
// }





// // components/shared/EntityFormDialog.tsx

// "use client";

// import { useState } from "react";
// import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import EntityForm from "./EntityForm";
// import { Button } from "@/components/ui/button";

// interface EntityFormDialogProps {
//   entity: string;
//   initialValues?: Record<string, any>;
//   triggerText?: string;
//   onSuccess?: () => void;
// }

// export default function EntityFormDialog({
//   entity,
//   initialValues,
//   triggerText = "Create",
//   onSuccess,
// }: EntityFormDialogProps) {
//   const [open, setOpen] = useState(false);

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button variant="default">{triggerText}</Button>
//       </DialogTrigger>
//       <DialogContent className="max-w-2xl w-full">
//         <EntityForm
//           entity={entity}
//           initialValues={initialValues}
//           onSuccess={() => {
//             setOpen(false);
//             onSuccess?.();
//           }}
//         />
//       </DialogContent>
//     </Dialog>
//   );
// }






// // components/shared/EntityForm.tsx

// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { createEntity, updateEntity } from "@/lib/proxy/route";

// interface EntityFormProps {
//   entity: string;
//   initialValues?: Record<string, any>;
//   onSuccess?: () => void;
// }

// export default function EntityForm({ entity, initialValues = {}, onSuccess }: EntityFormProps) {
//   const [formData, setFormData] = useState(initialValues);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (key: string, value: string) => {
//     setFormData({ ...formData, [key]: value });
//   };

//   const handleSubmit = async () => {
//     setLoading(true);
//     try {
//       if (initialValues?.id) {
//         await updateEntity(entity, initialValues.id, formData);
//       } else {
//         await createEntity(entity, formData);
//       }
//       onSuccess?.();
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="space-y-4">
//       {Object.keys(formData).map((key) => (
//         <Input
//           key={key}
//           placeholder={key}
//           value={formData[key]}
//           onChange={(e) => handleChange(key, e.target.value)}
//         />
//       ))}
//       <Button onClick={handleSubmit} disabled={loading}>
//         {loading ? "Saving..." : "Save"}
//       </Button>
//     </div>
//   );
// }
