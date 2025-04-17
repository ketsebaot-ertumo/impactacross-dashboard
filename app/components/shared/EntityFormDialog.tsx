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
