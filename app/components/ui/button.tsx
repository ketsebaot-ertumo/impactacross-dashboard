import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "accent";
  size?: "default" | "icon";
}

export function Button({
  children,
  variant = "primary",
  size = "default",
  ...props
}: ButtonProps) {
  const variantClasses = {
    primary: "bg-[#003366] text-white hover:bg-[#002244]", // Dark blue
    secondary: "bg-[#66ccff] text-[#003366] hover:bg-[#4db8e6]", // Light blue
    accent: "bg-[#e27a00] text-white hover:bg-[#cc6c00]", // Orange
    ghost:
      "bg-transparent text-[#003366] hover:bg-[#e6f3ff] dark:hover:bg-[#002244] dark:text-[#66ccff]",
  };

  const sizeClasses = {
    default: "px-4 py-2",
    icon: "p-2",
  };

  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#66ccff] ${variantClasses[variant]} ${sizeClasses[size]}`}
    >
      {children}
    </button>
  );
}




// import { ButtonHTMLAttributes } from 'react';

// interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
//   children: React.ReactNode;
//   variant?: "default" | "ghost";  // These are the allowed variants
//   size?: "default" | "icon";     // These are the allowed sizes
// }

// export function Button({ children, variant = "default", size = "default", ...props }: ButtonProps) {
//   // Define the styles for the variants
//   const variantClasses = {
//     default: "bg-[#e27a00] text-white hover:bg-[#cc6c00]", // Primary colors
//     ghost: "bg-transparent text-[#e27a00] hover:bg-[#ffe5b4] dark:hover:bg-[#cc6c00] dark:text-[#ffcc80]", // Ghost variant colors
//   };

//   // Define the styles for the sizes
//   const sizeClasses = {
//     default: "px-4 py-2",    // Default size padding
//     icon: "p-2",             // Smaller padding for icon buttons
//   };

//   return (
//     <button
//       {...props}
//       className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variantClasses[variant]} ${sizeClasses[size]}`}
//     >
//       {children}
//     </button>
//   );
// }



// // components/ui/button.tsx

// import { ButtonHTMLAttributes } from 'react';

// interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
//   children: React.ReactNode;
//   variant?: "default" | "ghost";  // These are the allowed variants
//   size?: "default" | "icon";     // These are the allowed sizes
// }

// export function Button({ children, variant = "default", size = "default", ...props }: ButtonProps) {
//   // Define the styles for the variants
//   const variantClasses = {
//     default: "bg-blue-600 text-white hover:bg-blue-700",
//     ghost: "bg-transparent text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-700 dark:text-blue-400",
//   };

//   // Define the styles for the sizes
//   const sizeClasses = {
//     default: "px-4 py-2",    // Default size padding
//     icon: "p-2",             // Smaller padding for icon buttons
//   };

//   return (
//     <button
//       {...props}
//       className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variantClasses[variant]} ${sizeClasses[size]}`}
//     >
//       {children}
//     </button>
//   );
// }





// // components/ui/button.tsx
// import { ButtonHTMLAttributes } from 'react';

// interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
//   children: React.ReactNode;
// }

// export function Button({ children, ...props }: ButtonProps) {
//   return (
//     <button
//       {...props}
//       className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//     >
//       {children}
//     </button>
//   );
// }




// // components/ui/button.tsx

// import * as React from "react";
// import { Slot } from "@radix-ui/react-slot";
// import { cn } from "@/app/lib/utils";

// export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   asChild?: boolean;
//   variant?: "default" | "outline" | "ghost";
// }

// export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
//   ({ className, variant = "default", asChild = false, ...props }, ref) => {
//     const Comp = asChild ? Slot : "button";
//     return (
//       <Comp
//         className={cn(
//           "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
//           variant === "default" && "bg-primary text-white hover:bg-primary/90",
//           variant === "outline" && "border border-input hover:bg-accent hover:text-accent-foreground",
//           variant === "ghost" && "hover:bg-accent hover:text-accent-foreground",
//           className
//         )}
//         ref={ref}
//         {...props}
//       />
//     );
//   }
// );
// Button.displayName = "Button";
