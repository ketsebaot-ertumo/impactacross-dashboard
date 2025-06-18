// /login
"use client";

import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/layout/Loader";
import { startTransition } from "react";

const LoginPage: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localErr, setLocalErr] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login, loginLoading, success, error, user } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalErr("");
    try {
      const {data: loginData} = await login({ email, password });
      const role = loginData?.user.role;

      if (loginData?.success && loginData?.token && role) {
        success("Login successfull");
        router.push("/dashboard");
      } else {
        throw new Error("Invalid login credentials.");
      }
    } catch (err: any) {
      const msg = err?.message || "Login failed. Please try again.";
      setLocalErr(msg);
      error(msg);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-primary px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-4xl font-bold text-center text-primary mb-2">Login</h2>
        <p className="text-center text-gray-600 mb-6">Please sign in to your account</p>

        {localErr && (
          <p className="text-center text-red-600 text-sm mb-4">{localErr}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full"
              placeholder="you@example.com"
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full pr-10"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-9 right-3 text-gray-400 hover:text-primary transition"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="flex justify-between text-xs sm:text-sm">
            <a href="/register" className="text-primary hover:underline transition">
              Don’t have an account?
            </a>
            <a href="/forgot-password" className="text-primary hover:underline transition">
              Forgot password?
            </a>
          </div>

          <Button
            type="submit"
            className="w-full text-white bg-primary hover:bg-primary hover:opacity-80 transition duration-200"
          >
            {loginLoading ? <Loader /> : "Login"}
          </Button>
        </form>

        <div className="mt-2 text-center text-xs text-gray-400">
          Need help?{" "}
          <a href="mailto:info@gmail.com" className="text-primary hover:underline">
            Contact us
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;




// "use client";

// import { FC, useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/hooks/use-auth";
// import { Eye, EyeOff } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Loader } from "@/components/layout/Loader";

// const LoginPage: FC = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [Err, setErr] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const { login, loginLoading, success, error, succ, err} = useAuth();
//   const router = useRouter();
 
  
//   if (succ) {
//     success("Successfully Login.")
//     router.push("/dashboard");
//   }

//   const handleSubmit = async (e: any) => {
//     try{
//       e.preventDefault();
//       await login({ email, password });
//       // success("Successfull Login.")
//     } catch(err: any){
//       error("Unable to Login.");
//       setErr(err.message)
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#003366] to-[#66ccff] px-4">
//       <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        
//         {/* <div className="flex justify-center mb-6">
//           <img src="/logo.png" alt="Logo" className="h-12" />
//           <span className="text-2xl font-bold text-#4C94D1 ml-2">Your Logo</span>
//         </div> */}

//         <h2 className="text-4xl font-bold text-center text-[#1F75BB] my-2">Login</h2>
//         <p className="text-center text-gray-600 mb-6">Please sign in to your account</p>
//         {(err || Err) && (
//           <p className="text-center text-red-600 text-sm mb-4">
//             Unable to login. Please check your credentials.
//           </p>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <Input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="mt-1 w-full"
//               placeholder="you@example.com"
//             />
//           </div>

//           <div className="relative">
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <Input
//               id="password"
//               type={showPassword ? "text" : "password"}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="mt-1 w-full pr-10"
//               placeholder="••••••••"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute top-9 right-3 text-gray-400 hover:text-[#003366] transition"
//               tabIndex={-1}
//             >
//               {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//             </button>
//           </div>

//           <div className="flex justify-end text-sm">
//             <a
//               href="/forgot-password"
//               className="text-[#1F75BB] hover:underline transition"
//             >
//               Forgot password?
//             </a>
//           </div>

//           <Button
//             type="submit"
//             className={`w-full text-white text-white transition duration-200`}
//           >
//             {/* Login */}
//             {loginLoading ? <Loader/> : "Login"}
//           </Button>
//         </form>

//         <div className="mt-2 text-center text-xs text-gray-400">
//           Need help?{" "}
//           <a href="mailto:info@gmail.com" className="text-[#1F75BB]
//            hover:underline">
//             Contact us
//         </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
