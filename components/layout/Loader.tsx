// // components/shared/Loader.tsx

import { cn } from "@/lib/utils"; // optional, if you have a `cn` util
import { RefreshCcw } from "lucide-react";

interface LoaderProps {
  className?: string;
}

export const Loader = ({ className }: LoaderProps) => {
  return (
    <div className={cn("flex justify-center items-center py-4", className)}>
      <RefreshCcw className="h-6 w-6 animate-spin text-muted-foreground text-white" />
    </div>
  );
};




// import { cn } from "@/lib/utils";

// export default function Loader({ className }: { className?: string }) {
//   return (
//     <div className={cn("flex items-center justify-center py-10", className)}>
//       <svg
//         className="animate-spin h-8 w-8 text-primary"
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 24 24"
//       >
//         <circle
//           className="opacity-25"
//           cx="12"
//           cy="12"
//           r="10"
//           stroke="currentColor"
//           strokeWidth="4"
//         />
//         <path
//           className="opacity-75"
//           fill="currentColor"
//           d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
//         />
//       </svg>
//     </div>
//   );
// }
