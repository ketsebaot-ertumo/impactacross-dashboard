// /app/(auth)/register/page.tsx

"use client";

import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/layout/Loader";

const RegistrationPage: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localErr, setLocalErr] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const { register, registrationLoading, success, error, user, err } = useAuth();
  const router = useRouter();

  // Reset error when typing new input
  useEffect(() => {
    if (localErr ) setLocalErr("");
  }, [email, password, firstName, lastName, phoneNumber]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalErr("");
    try {
      const {data: registrationData} = await register({ firstName, lastName, email, password, phoneNumber });
      const role = registrationData?.user.role;

      if (registrationData?.success && registrationData?.token && role) {
        success(registrationData?.message ||"Registration successfull");
        router.push("/dashboard");
      }
      else {
        setLocalErr("Registration failed. Please try again.");
        error("Registration failed. Please try again.");
      }
    } catch (err: any) {
      const msg = err?.message || "Registration failed. Please try again.";
      setLocalErr(msg);
      error(msg);
    }
  };

  return (
    <div className="flex items-center justify-center h-[100vh] bg-primary px-8 sm:px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-4xl font-bold text-center text-primary my-2">Register</h2>
        <p className="text-center text-gray-600 my-4">Please register your account</p>

        {localErr && (
          <p className="text-center text-red-600 text-sm mt-2 mb-4">
            {localErr || " Unable to Register. Please try again."}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-between gap-2">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <Input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 w-full"
                placeholder="your first name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <Input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 w-full"
                placeholder="your father name"
                required
              />
            </div>
          </div>

          <div className="flex justify-between gap-2">
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

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <Input
                id="phoneNumber"
                type="text"
                value={phoneNumber}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 w-full"
                placeholder="+251987654321"
              />
            </div>
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

            {password && (password.length < 8 || password.length > 100) && (
              <small className="text-red-500 block mt-1 text-xs">
                Password must be 8–100 characters long
              </small>
            )}
          </div>

          <div className="flex justify-start text-xs sm:text-sm">
            <a href="/login" className="text-[#1F75BB] hover:underline transition">
              Already have an account?
            </a>
          </div>

          <Button
            type="submit"
            className="w-full text-white bg-primary hover:bg-primary hover:opacity-90 transition duration-200"
          >
            {registrationLoading ? <Loader /> : "Register"}
          </Button>
        </form>

        <div className="mt-2 text-center text-xs text-gray-400">
          Need help?{" "}
          <a href="mailto:info@gmail.com" className="text-[#1F75BB] hover:underline">
            Contact us
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
