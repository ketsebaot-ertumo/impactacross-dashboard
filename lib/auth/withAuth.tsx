"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import React from "react";
import Cookies from "js-cookie";

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.ComponentType<P> {
  const ComponentWithAuth = (props: P) => {
    const { user, loginLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      const cookieToken = Cookies.get("token");
      const localToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;

      console.log("\n\n\ntoken:", cookieToken)

      const isAuthenticated = !cookieToken || !localToken;

      if (!isAuthenticated) {
        router.push("/login");
      }
      // router.push("/dashbard");
    }, [router]);

    if (loginLoading || !user) {
      return null; // or return <Loader />
    }

    return <WrappedComponent {...props} />;
  };

  ComponentWithAuth.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return ComponentWithAuth;
}





// // lib/auth/withAuth.tsx
// "use client";

// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import { useAuth } from "@/hooks/use-auth";
// import React from "react";
// import Cookies from "js-cookie";

// export function withAuth<P extends object>(
//   WrappedComponent: React.ComponentType<P>
// ): React.ComponentType<P> {
//   const ComponentWithAuth = (props: P) => {
//     const { user, loginLoading } = useAuth();
//     const router = useRouter();

//     useEffect(() => {
//       const token = Cookies.getItem('token');
//     //   const isAuthenticated = !!localStorage.getItem("token"); // Example: token in localStorage
//     //   if (!isAuthenticated) {
//     //     router.push("/login");
//     //   }
//     }, [router]);

//     // useEffect(() => {
//     //   if (!loginLoading && !user) {
//     //     router.push("/login");
//     //   }
//     // }, [user, loginLoading, router]);

//     // if (loginLoading || !user) {
//     //   return null; // or return a spinner
//     // }

//     return <WrappedComponent {...props} />;
//   };

//   ComponentWithAuth.displayName = `withAuth(${
//     WrappedComponent.displayName || WrappedComponent.name || "Component"
//   })`;

//   return ComponentWithAuth;
// }





// // // app/lib/auth/withAuth.tsx

// // import { useEffect } from "react";
// // import { useRouter } from "next/navigation";

// // interface WithAuthProps {
// //   // Add any props you need to pass through
// // }

// // const withAuth = <P extends object>(
// //   WrappedComponent: React.ComponentType<P>
// // ): React.FC<P & WithAuthProps> => {
// //   const AuthComponent: React.FC<P & WithAuthProps> = (props) => {
// //     const router = useRouter();

// //     useEffect(() => {
// //       const isAuthenticated = !!localStorage.getItem("token"); // Example: token in localStorage
// //       if (!isAuthenticated) {
// //         router.push("/login");
// //       }
// //     }, [router]);

// //     return <WrappedComponent {...props} />;
// //   };

// //   return withAuth;
// // };

// // export default withAuth;
