// app/routes/login.tsx
import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export const meta: MetaFunction = () => {
  return [
    { title: "Sign In | Your App Name" },
    { description: "Sign in to your account to get started." }
  ];
};




export default function Login() {

  const [showPassword, setShowPassword] = useState(false)

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="py-6 px-4 w-full">
        <div className="grid lg:grid-cols-2 items-center gap-6 max-w-6xl mx-auto w-full">
          {/* Login Form Card */}
          <div className="border border-slate-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] mx-auto lg:mx-0 bg-white">
            <form className="space-y-6">
              <div className="mb-12">
                <h1 className="text-slate-900 text-3xl font-semibold">Sign in</h1>
              </div>

              {/* Username Field */}
              <div>
                <label htmlFor="username" className="text-slate-900 text-sm font-medium mb-2 block">Username</label>
                <div className="relative flex items-center">
                  <input
                    name="username"
                    type="text"
                    required
                    className="w-full text-sm text-slate-900 border bg-gray-100 border-slate-300 pl-4 pr-10 py-3 rounded-lg outline-blue-600 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="Enter username"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-4"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                    <path
                      d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="text-slate-900 text-sm font-medium mb-2 block">Password</label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full text-sm text-slate-900 border bg-gray-200 border-slate-300 pl-4 pr-10 py-3 rounded-lg outline-blue-600 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="Enter password"
                  />
                  <div className=" absolute right-3 ">
                    <button onClick={handleShowPassword}>
                      {showPassword ? <>  <FiEye className="text-gray-600" /></> : <> <FiEyeOff className="text-gray-600"/> </>}
                    </button>
                  </div>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500  border-slate-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-3 block text-sm text-slate-500">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              {/* Submit Button */}
              <div className="!mt-12">
                <button
                  type="submit"
                  className="w-full shadow-xl py-2.5 px-4 text-[15px] font-medium tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Sign in
                </button>
                <p className="text-sm !mt-6 text-center text-slate-600">
                  Don&#39;t have an account?{" "}
                  <Link
                    to="/register"
                    className="text-blue-600 font-medium hover:underline ml-1 whitespace-nowrap"
                  >
                    Register here
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Login Image - Hidden on small screens */}
          <div className="max-lg:hidden">
            <img
              src="https://readymadeui.com/login-image.webp"
              className="w-full aspect-[71/50] object-cover rounded-lg shadow-lg"
              alt="Login illustration"
            />
          </div>
        </div>
      </div>
    </div>
  );
}