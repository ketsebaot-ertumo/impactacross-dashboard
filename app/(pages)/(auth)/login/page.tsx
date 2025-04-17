

// "use client";

// import { FC, useState } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/app/components/ui/button";
// import { Input } from "@/app/components/ui/input";
// import { useAuth } from "@/app/hooks/use-auth";
// import { Eye, EyeOff } from "lucide-react";

// const LoginPage: FC = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const { login } = useAuth();
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await login({ email, password });
//     router.push("/dashboard");
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#e27a00]/30 to-[#03DAC6]/30 px-4">
//       <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
//         {/* Optional Logo */}
//         <div className="flex justify-center mb-6">
//           {/* Replace with your logo image */}
//           {/* <img src="/logo.png" alt="Logo" className="h-12" /> */}
//         </div>

//         <h2 className="text-4xl font-bold text-center text-[#e27a00] mb-2">Login</h2>
//         <p className="text-center text-gray-500 mb-6">Please sign in to your account</p>

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
//               className="absolute top-9 right-3 text-gray-400 hover:text-[#e27a00] transition"
//               tabIndex={-1}
//             >
//               {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//             </button>
//           </div>

//           <div className="flex justify-end text-sm">
//             <a
//               href="/forgot-password"
//               className="text-[#03DAC6] hover:underline transition"
//             >
//               Forgot password?
//             </a>
//           </div>

//           <Button
//             type="submit"
//             className="w-full bg-[#e27a00] hover:bg-[#cc6c00] text-white transition duration-200"
//           >
//             Login
//           </Button>
//         </form>

//         <div className="mt-2 text-center text-xs text-gray-400">
//           Need help?{" "}
//           <a href="/reset-password" className="text-[#03DAC6] hover:underline">
//             Contact us
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { useAuth } from "@/app/hooks/use-auth";
import { Eye, EyeOff } from "lucide-react";

const LoginPage: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ email, password });
    router.push("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#003366] to-[#66ccff] px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        
        {/* <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="Logo" className="h-12" />
          <span className="text-2xl font-bold text-[#003366] ml-2">Your Logo</span>
        </div> */}

        <h2 className="text-4xl font-bold text-center text-[#003366] mb-2">Login</h2>
        <p className="text-center text-gray-600 mb-6">Please sign in to your account</p>

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
              className="absolute top-9 right-3 text-gray-400 hover:text-[#003366] transition"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="flex justify-end text-sm">
            <a
              href="/forgot-password"
              className="text-[#66ccff] hover:underline transition"
            >
              Forgot password?
            </a>
          </div>

          <Button
            type="submit"
            className="w-full text-[#66ccff] hover:text-[#66ccff] text-white transition duration-200"
          >
            Login
          </Button>
        </form>

        <div className="mt-2 text-center text-xs text-gray-400">
          Need help?{" "}
          <a href="mailto:info@gmail.com" className="text-[#66ccff] hover:underline">
            Contact us
        </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;