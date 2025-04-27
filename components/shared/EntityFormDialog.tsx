// /components/shared/entityFormDialog.tsx


import { useEntityActions } from '@/hooks/use-query';
import { useEffect, useState } from 'react';
import { Dialog, DialogAction, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { useSingleEntity } from '@/hooks/use-query';  // Import useSingleEntity hook

interface EntityFormDialogProps {
  open: boolean;
  onClose: () => void;
  entity: string;
  initialValues?: any;
  id?: string;
  mode?: 'create' | 'edit' | 'remove' | null; // Define mode types
}

const EntityFormDialog = ({ open, onClose, entity, initialValues, id, mode }: EntityFormDialogProps) => {
  const [values, setValues] = useState(initialValues || {});
  const [isOpen, setIsOpen] = useState(open);
  const { create, update, remove } = useEntityActions(entity);

  // Fetch single entity for edit mode if id is provided
  const { data, loading, error } = useSingleEntity(entity, id || '');
  console.log("\n\n\nentity data:", data);

  useEffect(() => {
    if (mode === 'edit' && data) {
      setValues(data.data); // Set data if in edit mode
    } else if (mode === 'create') {
      const emptyValues: Record<string, string> = {};
      if (initialValues) {
        Object.keys(initialValues).forEach((key) => {
          emptyValues[key] = '';
        });
      }
      setValues(emptyValues);
    }
  }, [data, mode, initialValues]);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useEffect(() => {
    if (!isOpen) onClose();
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (mode === 'edit' && id) {
      await update(id, values); // Update record in edit mode
    } else if (mode === 'remove' && id) {
      await remove(id); // Remove record in delete mode
    } else {
      await create(values); // Create a new record in create mode
    }
    onClose(); // Close dialog after action
  };

  const isReadonly = mode === 'remove'; // Make fields readonly for deletion mode
  const isCreateMode = mode === 'create'; // Identify if it's in create mode

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === 'edit' ? 'Edit Record' : mode === 'remove' ? 'Delete Record' : 'Create Record'}</DialogTitle>
          <DialogDescription>
            {mode === 'edit' ? 'Update the entity data.' : mode === 'remove' ? 'Delete the entity data.' : 'Fill the form to add a new record.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={(e) => e.preventDefault()}> {/* Prevent form submission to avoid page reload */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {/* {Object.keys(values).map((key) => {
              // Skip fields like id, userId, createdAt, updatedAt in all modes
              if (['id', 'userId','name', 'createdAt', 'updatedAt'].includes(key)) return null;

              return (
                <div key={key} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">{key}</label>
                  <input
                    type="text"
                    name={key}
                    value={values[key] || ''}  // For Create, set value to empty string
                    onChange={handleChange}
                    className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm ${isReadonly ? 'bg-gray-200 cursor-not-allowed' : ''}`}
                    placeholder={`Enter ${key}`}
                    readOnly={isReadonly}  // Make field read-only for deletion mode
                  />
                </div>
              );
            })} */}
            
            {Object.keys(values).map((key) => {
  if (['id', 'userId','name', 'createdAt', 'updatedAt'].includes(key)) return null;

  const statusOptions =
    entity === 'blog' || entity === 'publication' || entity === 'multimedia'
      ? ['Draft', 'Published', 'Archived']
      : entity === 'training'
        ? ['Draft', 'Completed', 'Archived']
        : [];

  return (
    <div key={key} className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{key}</label>

      {/* Check if the field is 'status' and has options */}
      {key === 'status' && statusOptions.length > 0 ? (
        <select
          name={key}
          value={values[key] || ''}
          onChange={(e) =>
            setValues({
              ...values,
              [e.target.name]: e.target.value,
            })
          }
          className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm ${
            mode === 'remove' ? 'bg-gray-200 cursor-not-allowed' : ''
          }`}
          disabled={mode === 'remove'}
        >
          <option value="" disabled>Select status</option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      ) : (
        // Normal input for all other fields
        <input
          type="text"
          name={key}
          value={values[key] || ''}
          onChange={handleChange}
          className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm ${
            mode === 'remove' ? 'bg-gray-200 cursor-not-allowed' : ''
          }`}
          placeholder={`Enter ${key}`}
          readOnly={mode === 'remove'}
        />
      )}
    </div>
  );
})}


          </div>
          <DialogFooter>
            <DialogAction type="button" onClick={() => setIsOpen(false)}>Cancel</DialogAction>
            <DialogAction onClick={handleSubmit}>{mode === 'edit' || mode === 'remove' ? 'Save' : 'Submit'}</DialogAction>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EntityFormDialog;







// import { useEntityActions } from '@/hooks/use-query';
// import { useEffect, useState } from 'react';
// import { Dialog, DialogAction, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
// import { Button } from '../ui/button';
// import { useSingleEntity } from '@/hooks/use-query';  // Import useSingleEntity hook

// interface EntityFormDialogProps {
//   open: boolean;
//   onClose: () => void;
//   entity: string;
//   initialValues?: any;
//   id?: string;
//   mode?: 'create' | 'edit' | 'remove' | null; // Define mode types
// }

// const EntityFormDialog = ({ open, onClose, entity, initialValues, id, mode }: EntityFormDialogProps) => {
//   const [values, setValues] = useState(initialValues || {});
//   const [isOpen, setIsOpen] = useState(open);
//   const { create, update, remove } = useEntityActions(entity);

//   // Fetch single entity for edit mode if id is provided
//   const { data, loading, error } = useSingleEntity(entity, id || '');
//   console.log("\n\n\nentity data:", data);

//   useEffect(() => {
//     if (mode === 'edit' && data) {
//       setValues(data.data); // Set data if in edit mode
//     } else if (mode === 'create') {
//       setValues(initialValues || {}); // Initialize empty values for create mode
//     }
//   }, [data, mode, initialValues]);

//   useEffect(() => {
//     setIsOpen(open);
//   }, [open]);

//   useEffect(() => {
//     if (!isOpen) onClose();
//   }, [isOpen]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setValues({
//       ...values,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async () => {
//     if (mode === 'edit' && id) {
//       await update(id, values); // Update record in edit mode
//     } else if (mode === 'remove' && id) {
//       await remove(id); // Remove record in delete mode
//     } else {
//       await create(values); // Create a new record in create mode
//     }
//     onClose(); // Close dialog after action
//   };

//   const isReadonly = mode === 'remove'; // Make fields readonly for deletion mode
//   const isCreateMode = mode === 'create'; // Identify if it's in create mode

//   return (
//     <Dialog open={open} onOpenChange={setIsOpen}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>{mode === 'edit' ? 'Edit Record' : mode === 'remove' ? 'Delete Record' : 'Create Record'}</DialogTitle>
//           <DialogDescription>
//             {mode === 'edit' ? 'Update the entity data.' : mode === 'remove' ? 'Delete the entity data.' : 'Fill the form to add a new record.'}
//           </DialogDescription>
//         </DialogHeader>
//         <form onSubmit={(e) => e.preventDefault()}> {/* Prevent form submission to avoid page reload */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
//             {Object.keys(values).map((key) => {
//               // Skip fields that should not be displayed in create mode
//               if (mode === 'create' && ['id', 'userId', 'createdAt', 'updatedAt'].includes(key)) return null;

//               return (
//                 <div key={key} className="space-y-2">
//                   <label className="block text-sm font-medium text-gray-700">{key}</label>
//                   <input
//                     type="text"
//                     name={key}
//                     value={isCreateMode ? '' : values[key] || ''}  // For Create, set value to empty string
//                     onChange={handleChange}
//                     className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm ${isReadonly ? 'bg-gray-200 cursor-not-allowed' : ''}`}
//                     placeholder={`Enter ${key}`}
//                     readOnly={isReadonly}  // Make field read-only for deletion mode
//                   />
//                 </div>
//               );
//             })}
//           </div>
//           <DialogFooter>
//             <DialogAction type="button" onClick={() => setIsOpen(false)}>Cancel</DialogAction>
//             <DialogAction onClick={handleSubmit}>{mode === 'edit' || mode === 'remove' ? 'Save' : 'Submit'}</DialogAction>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default EntityFormDialog;







// import { useEntityActions } from '@/hooks/use-query';
// import { useEffect, useState } from 'react';
// import { Dialog, DialogAction, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
// import { Button } from '../ui/button';
// import { useSingleEntity } from '@/hooks/use-query';  // Import useSingleEntity hook

// interface EntityFormDialogProps {
//   open: boolean;
//   onClose: () => void;
//   entity: string;
//   initialValues?: any;
//   id?: string;
//   mode?: 'create' | 'edit' | 'remove' | null; // Define mode types
// }

// const EntityFormDialog = ({ open, onClose, entity, initialValues, id, mode }: EntityFormDialogProps) => {
//   const [values, setValues] = useState(initialValues || {});
//   const [isOpen, setIsOpen] = useState(open);
//   const { create, update, remove } = useEntityActions(entity);

//   // Fetch single entity for edit mode if id is provided
//   const { data, loading, error } = useSingleEntity(entity, id || '');
//   console.log("\n\n\nentity data:", data);

//   useEffect(() => {
//     if (mode === 'edit' && data) {
//       setValues(data.data); // Set data if in edit mode
//     } else if (mode === 'create') {
//       setValues(initialValues || {}); // Initialize empty values for create mode
//     }
//   }, [data, mode, initialValues]);

//   useEffect(() => {
//     setIsOpen(open);
//   }, [open]);

//   useEffect(() => {
//     if (!isOpen) onClose();
//   }, [isOpen]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setValues({
//       ...values,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async () => {
//     if (mode === 'edit' && id) {
//       await update(id, values); // Update record in edit mode
//     } else if (mode === 'remove' && id) {
//       await remove(id); // Remove record in delete mode
//     } else {
//       await create(values); // Create a new record in create mode
//     }
//     onClose(); // Close dialog after action
//   };

//   return (
//     <Dialog open={open} onOpenChange={setIsOpen}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>{mode === 'edit' ? 'Edit Record' : mode === 'remove' ? 'Delete Record' : 'Create Record'}</DialogTitle>
//           <DialogDescription>
//             {mode === 'edit' ? 'Update the entity data.' : mode === 'remove' ? 'Delete the entity data.' : 'Fill the form to add a new record.'}
//           </DialogDescription>
//         </DialogHeader>
//         <form onSubmit={(e) => e.preventDefault()}> {/* Prevent form submission to avoid page reload */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {Object.keys(values).map((key) => {
//               // Skip fields that should not be displayed (id, userId, createdAt, updatedAt)
//               if (['id', 'userId', 'createdAt', 'updatedAt'].includes(key)) return null;

//               return (
//                 <div key={key} className="space-y-2">
//                   <label className="block text-sm font-medium text-gray-700">{key}</label>
//                   <input
//                     type="text"
//                     name={key}
//                     value={values[key] || ''}
//                     onChange={handleChange}
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
//                     placeholder={`Enter ${key}`}
//                   />
//                 </div>
//               );
//             })}
//           </div>
//           <DialogFooter>
//             <DialogAction type="button" onClick={() => setIsOpen(false)}>Cancel</DialogAction>
//             <DialogAction onClick={handleSubmit}>{mode === 'edit' || mode === 'remove' ? 'Save' : 'Submit'}</DialogAction>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default EntityFormDialog;








// import { useEntityActions } from '@/hooks/use-query';
// import { useEffect, useState } from 'react';
// import { Dialog, DialogAction, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
// import { Button } from '../ui/button';
// import { useSingleEntity } from '@/hooks/use-query';  // Import useSingleEntity hook

// interface EntityFormDialogProps {
//   open: boolean;
//   onClose: () => void;
//   entity: string;
//   initialValues?: any;
//   id?: string;
//   mode?: 'create' | 'edit' | 'remove' | null; // Define mode types
// }

// const EntityFormDialog = ({ open, onClose, entity, initialValues, id, mode }: EntityFormDialogProps) => {
//   const [values, setValues] = useState(initialValues || {});
//   const [isOpen, setIsOpen] = useState(open);
//   const { create, update, remove } = useEntityActions(entity);

//   // Fetch single entity for edit mode if id is provided
//   const { data, loading, error } = useSingleEntity(entity, id || '');
//   console.log("\n\n\nentity data:", data)

//   useEffect(() => {
//     if (mode === 'edit' && data) {
//       // setValues(data.data); // Set data if in edit mode
//     } else if (mode === 'create') {
//       setValues(initialValues || {}); // Initialize empty values for create mode
//     }
//   }, [data, mode, initialValues]);

//   useEffect(() => {
//     setIsOpen(open);
//   }, [open]);

//   useEffect(() => {
//     if (!isOpen) onClose();
//   }, [isOpen]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setValues({
//       ...values,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async () => {
//     if (mode === 'edit' && id) {
//       await update(id, values); // Update record in edit mode
//     } else if (mode === 'remove' && id) {
//       await remove(id); // Remove record in delete mode
//     } else {
//       await create(values); // Create a new record in create mode
//     }
//     onClose(); // Close dialog after action
//   };

//   return (
//     <Dialog open={open} onOpenChange={setIsOpen}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>{mode === 'edit' ? 'Edit Record' : mode === 'remove' ? 'Delete Record' : 'Create Record'}</DialogTitle>
//           <DialogDescription>
//             {mode === 'edit' ? 'Update the entity data.' : mode === 'remove' ? 'Delete the entity data.' : 'Fill the form to add a new record.'}
//           </DialogDescription>
//         </DialogHeader>
//         <form onSubmit={(e) => e.preventDefault()}> {/* Prevent form submission to avoid page reload */}
//           {/* Render dynamic form fields here based on the values (formData) */}
//           <div className="grid gap-2">
//             {Object.keys(values).map((key) => (
//               <div key={key}>
//                 <label className="block text-sm font-medium text-gray-700">{key}</label>
//                 <input
//                   type="text"
//                   name={key}
//                   value={values[key] || ''}
//                   onChange={handleChange}
//                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
//                   placeholder={`Enter ${key}`}
//                 />
//               </div>
//             ))}
//           </div>
//           <DialogFooter>
//             <DialogAction type="button" onClick={() => setIsOpen(false)}>Cancel</DialogAction>
//             {/* Trigger handleSubmit via onClick */}
//             <DialogAction onClick={handleSubmit}>{mode === 'edit' || mode === 'remove' ? 'Save' : 'Submit'}</DialogAction>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default EntityFormDialog;








// import { useEntityActions } from '@/hooks/use-query';
// import { useEffect, useState } from 'react';
// import { Dialog, DialogAction, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
// import { Button } from '../ui/button';

// interface EntityFormDialogProps {
//   open: boolean;
//   onClose: () => void;
//   entity: string;
//   initialValues?: any;
//   id?: string;
//   mode?: string | null;
// }

// const EntityFormDialog = ({ open, onClose, entity, initialValues, id, mode }: EntityFormDialogProps) => {
//   const [values, setValues] = useState(initialValues || {});
//   const [isOpen, setIsOpen] = useState(open);
//   const { create, update, remove } = useEntityActions(entity);

//   // Sync with external `open` prop
//   useEffect(() => {
//     setIsOpen(open);
//   }, [open]);

//   // Close externally
//   useEffect(() => {
//     if (!isOpen) onClose();
//   }, [isOpen]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setValues({
//       ...values,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async () => {
//     // Handle submit without the form event
//     if (mode === "edit" && id) {
//       await update(id, values); // Update record if mode is edit
//     } else if (mode === "remove" && id) {
//       await remove(id); // Remove record if mode is delete
//     } else {
//       await create(values); // Create a new record
//     }
//     onClose(); // Close dialog after action
//   };

//   return (
//     <Dialog open={open} onOpenChange={setIsOpen}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>{mode === 'edit' ? 'Edit Record' : mode === 'remove' ? 'Delete Record' : 'Create Record'}</DialogTitle>
//           <DialogDescription>
//             {mode === 'edit' ? 'Update the entity data.' : mode === 'remove' ? 'Delete the entity data.' : 'Fill the form to add a new record.'}
//           </DialogDescription>
//         </DialogHeader>
//         <form onSubmit={(e) => e.preventDefault()}> {/* Prevent form submission to avoid page reload */}
//           {/* Render dynamic form fields here based on the `initialValues` */}
//           <div className="grid gap-2">
//             {/* Assuming name is the required field */}
//             <label htmlFor="name">Entity Name</label>
//             <input
//               id="name"
//               name="name"
//               type="text"
//               value={values.name || ''}
//               onChange={handleChange}
//               placeholder="Enter entity name"
//             />
//           </div>
//           <DialogFooter>
//             <DialogAction type="button" onClick={() => setIsOpen(false)}>Cancel</DialogAction>
//             {/* Trigger handleSubmit via onClick */}
//             <DialogAction onClick={handleSubmit}>{mode === 'edit' || mode === 'remove' ? 'Save' : 'Submit'}</DialogAction>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default EntityFormDialog;






// import { useEntityActions } from '@/hooks/use-query';
// import { useEffect, useState } from 'react';
// import { Dialog, DialogAction, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
// import { Button } from '../ui/button';

// interface EntityFormDialogProps {
//   open: boolean;
//   onClose: () => void;
//   entity: string;
//   initialValues?: any;
//   id?: string;
//   mode?: string | null;
// }

// const EntityFormDialog = ({ open, onClose, entity, initialValues, id, mode }: EntityFormDialogProps) => {
//   const [values, setValues] = useState(initialValues || {});
//   const [isOpen, setIsOpen] = useState(open);
//   const { create, update, remove } = useEntityActions(entity);

//   // Sync with external `open` prop
//   useEffect(() => {
//     setIsOpen(open);
//   }, [open]);

//   // Close externally
//   useEffect(() => {
//     if (!isOpen) onClose();
//   }, [isOpen]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setValues({
//       ...values,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async () => {
//     if (id && mode === "edit") {
//       await update(id, values);
//     }else if (id && mode === "remove") {
//       await remove(id);
//     } else {
//       await create(values);
//     }
//     onClose();
//   };

//   return (
//     <Dialog open={open} onOpenChange={setIsOpen}>
//       <DialogTrigger>Open Dialog</DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>{id ? 'Edit Record' : 'Create Record'}</DialogTitle>
//           <DialogDescription>
//             {id ? 'Update the entity data.' : 'Fill the form to add a new record.'}
//           </DialogDescription>
//         </DialogHeader>
//         <DialogFooter>
//           <DialogAction onClick={handleSubmit}>{id ? 'Save' : 'Submit'}</DialogAction>
//           <DialogAction onClick={() => setIsOpen(false)}>Cancel</DialogAction>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default EntityFormDialog;






// // components/shared/EntityFormDialog.tsx
// 'use client';

// import { useState } from 'react';
// import EntityForm from './EntityForm';

// interface EntityFormDialogProps {
//   entity: string;
// }

// export default function EntityFormDialog({ entity }: EntityFormDialogProps) {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <>
//       <button
//         onClick={() => setIsOpen(true)}
//         className="px-4 py-2 bg-green-600 text-white rounded-md"
//       >
//         Add {entity}
//       </button>
//       {isOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-md">
//             <EntityForm entity={entity} />
//             <button
//               onClick={() => setIsOpen(false)}
//               className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-md"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
