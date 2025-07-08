// app/routes/register.tsx
import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
    return [{ title: "Register | Liquor Shop IMS" }];
};

export default function Register() {
    return (
        <div>
            <div className="flex flex-col justify-center bg-gray-50">
                <div className="max-w-4xl w-full mx-auto border border-gray-300 rounded-2xl p-4 sm:p-8 bg-white shadow-lg">
                    <div className="text-center mb-6 sm:mb-12">
                        <Link to="">
                            <img
                                src="https://readymadeui.com/readymadeui.svg"
                                alt="Liquor Shop IMS Logo"
                                className="w-32 sm:w-40 mx-auto"
                            />
                        </Link>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-4">
                            Create a Liquor Shop IMS Account
                        </h2>
                    </div>

                    <form>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                            <div className="space-y-4 sm:space-y-6">
                                <div>
                                    <label htmlFor="businessName" className="text-slate-900 text-sm font-medium mb-2 block">
                                        Business Name
                                    </label>
                                    <input
                                        id="businessName"
                                        name="businessName"
                                        type="text"
                                        className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-2 sm:py-3 rounded-md outline-blue-500 focus:ring-2 focus:ring-blue-500"
                                        placeholder="e.g., ABC Liquor Store"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="ownerName" className="text-slate-900 text-sm font-medium mb-2 block">
                                        Owner Name
                                    </label>
                                    <input
                                        id="ownerName"
                                        name="ownerName"
                                        type="text"
                                        className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-2 sm:py-3 rounded-md outline-blue-500 focus:ring-2 focus:ring-blue-500"
                                        placeholder="e.g., John Doe"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="username" className="text-slate-900 text-sm font-medium mb-2 block">
                                        Username
                                    </label>
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-2 sm:py-3 rounded-md outline-blue-500 focus:ring-2 focus:ring-blue-500"
                                        placeholder="e.g., johndoe123"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="text-slate-900 text-sm font-medium mb-2 block">
                                        Email Id
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="text"
                                        className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-2 sm:py-3 rounded-md outline-blue-500 focus:ring-2 focus:ring-blue-500"
                                        placeholder="you@example.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="text-slate-900 text-sm font-medium mb-2 block">
                                        Phone Number
                                    </label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-2 sm:py-3 rounded-md outline-blue-500 focus:ring-2 focus:ring-blue-500"
                                        placeholder="+1 (555) 123-4567"
                                    />
                                </div>
                            </div>
                            <div className="space-y-4 sm:space-y-6">
                                <div>
                                    <label htmlFor="password" className="text-slate-900 text-sm font-medium mb-2 block">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-2 sm:py-3 rounded-md outline-blue-500 focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter password"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="cpassword" className="text-slate-900 text-sm font-medium mb-2 block">
                                        Confirm Password
                                    </label>
                                    <input
                                        id="cpassword"
                                        name="cpassword"
                                        type="password"
                                        className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-2 sm:py-3 rounded-md outline-blue-500 focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter confirm password"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="logo" className="text-slate-900 text-sm font-medium mb-2 block">
                                        Logo (Optional)
                                    </label>
                                    <input
                                        id="logo"
                                        name="logo"
                                        type="file"
                                        accept="image/*"
                                        className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-2 sm:py-3 rounded-md outline-blue-500 focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="address" className="text-slate-900 text-sm font-medium mb-2 block">
                                        Address (Optional)
                                    </label>
                                    <textarea
                                        id="address"
                                        name="address"
                                        className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-2 sm:py-3 rounded-md outline-blue-500 focus:ring-2 focus:ring-blue-500"
                                        placeholder="e.g., 123 Main St, Anytown, USA"
                                        rows={3}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="taxId" className="text-slate-900 text-sm font-medium mb-2 block">
                                        Tax ID (Optional)
                                    </label>
                                    <input
                                        id="taxId"
                                        name="taxId"
                                        type="text"
                                        className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-2 sm:py-3 rounded-md outline-blue-500 focus:ring-2 focus:ring-blue-500"
                                        placeholder="e.g., TX-123456"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 sm:mt-12">
                            <div className="flex items-center">
                                <input
                                    id="terms"
                                    name="terms"
                                    type="checkbox"
                                    className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="terms" className="text-slate-600 ml-3 block text-sm">
                                    I accept the{' '}
                                    <Link to="" className="text-blue-600 font-medium hover:underline ml-1">
                                        Terms and Conditions
                                    </Link>
                                </label>
                            </div>
                        </div>

                        <div className="mt-6 sm:mt-12">
                            <button
                                type="submit"
                                className="w-full py-3 px-4 text-sm tracking-wider font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition-colors"
                            >
                                Create an Account
                            </button>
                        </div>
                        <p className="text-slate-600 text-sm mt-4 sm:mt-6 text-center">
                            Already have an account?{' '}
                            <Link to="/login" className="text-blue-600 font-medium hover:underline ml-1">
                                Login here
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}