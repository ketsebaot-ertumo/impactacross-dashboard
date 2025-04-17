import * as React from "react";
import { cn } from "@/app/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
// export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
//   variant?: 'default' | 'outlined';
// }


const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className="", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border border-zinc-200 bg-white text-zinc-900 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100",
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className="", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("p-4", className)}
        {...props}
      />
    );
  }
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className="", ...props }, ref) => {
  return (
    <h3
      ref={ref}
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  );
});
CardTitle.displayName = "CardTitle";

const CardContent = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className="", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("p-4 pt-0", className)}
        {...props}
      />
    );
  }
);
CardContent.displayName = "CardContent";

export { Card, CardHeader, CardTitle, CardContent };





// import * as React from "react";
// import { cn } from "@/app/lib/utils";

// export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

// const Card = React.forwardRef<HTMLDivElement, CardProps>(
//   ({ className="", ...props }, ref) => {
//     return (
//       <div
//         ref={ref}
//         className={cn(
//           "rounded-xl border border-zinc-200 bg-white text-zinc-900 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100",
//           className
//         )}
//         {...props}
//       />
//     );
//   }
// );
// Card.displayName = "Card";

// const CardHeader = React.forwardRef<HTMLDivElement, CardProps>(
//   ({ className="", ...props }, ref) => {
//     return (
//       <div
//         ref={ref}
//         className={cn("p-4", className)}
//         {...props}
//       />
//     );
//   }
// );
// CardHeader.displayName = "CardHeader";

// const CardTitle = React.forwardRef<
//   HTMLParagraphElement,
//   React.HTMLAttributes<HTMLParagraphElement>
// >(({ className="", ...props }, ref) => {
//   return (
//     <h3
//       ref={ref}
//       className={cn("text-lg font-semibold leading-none tracking-tight", className)}
//       {...props}
//     />
//   );
// });
// CardTitle.displayName = "CardTitle";

// const CardContent = React.forwardRef<HTMLDivElement, CardProps>(
//   ({ className="", ...props }, ref) => {
//     return (
//       <div
//         ref={ref}
//         className={cn("p-4 pt-0", className)}
//         {...props}
//       />
//     );
//   }
// );
// CardContent.displayName = "CardContent";

// export { Card, CardHeader, CardTitle, CardContent };
