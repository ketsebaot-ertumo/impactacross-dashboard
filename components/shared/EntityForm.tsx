// components/shared/EntityForm.tsx
"use client";
import { useState } from "react";
import { Input } from "../../app/components/ui/input";
import { Button } from "../../app/components/ui/button";

interface EntityFormProps<T> {
  entity?: T;
  onSubmit: (values: T) => void;
  fields: { name: keyof T; label: string; type: string }[];
}

export function EntityForm<T extends Record<string, any>>({ entity, onSubmit, fields }: EntityFormProps<T>) {
  const [formState, setFormState] = useState<T>(entity || {} as T);

  const handleChange = (key: keyof T, value: any) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formState);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map(({ name, label, type }) => (
        <div key={String(name)}>
          <label className="block font-medium mb-1">{label}</label>
          <Input
            type={type}
            value={formState[name] || ""}
            onChange={(e) => handleChange(name, e.target.value)}
          />
        </div>
      ))}
      <Button type="submit">Save</Button>
    </form>
  );
}



// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useState } from "react";

// interface Field {
//   name: string;
//   label: string;
//   type?: "text" | "number" | "email" | "password";
// }

// interface EntityFormProps {
//   fields: Field[];
//   initialValues?: Record<string, any>;
//   onSubmit: (data: Record<string, any>) => void;
//   submitText?: string;
// }

// export const EntityForm = ({
//   fields,
//   initialValues = {},
//   onSubmit,
//   submitText = "Save",
// }: EntityFormProps) => {
//   const [formState, setFormState] = useState(initialValues);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormState({ ...formState, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit(formState);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       {fields.map((field) => (
//         <div key={field.name} className="space-y-1">
//           <Label htmlFor={field.name}>{field.label}</Label>
//           <Input
//             id={field.name}
//             name={field.name}
//             type={field.type || "text"}
//             value={formState[field.name] || ""}
//             onChange={handleChange}
//           />
//         </div>
//       ))}
//       <Button type="submit" className="w-full">{submitText}</Button>
//     </form>
//   );
// };





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
