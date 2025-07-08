import { FiUser, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { Form } from "@remix-run/react";
import { toggleTheme } from "utills/themeToggle";
import { useEffect, useState } from "react";

type HeaderProps = {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
};

const Header = ({ isSidebarOpen, toggleSidebar }: HeaderProps) => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const theme = localStorage.getItem("theme");
        setIsDark(theme === "dark");
    }, []);

    const handleToggle = () => {
        toggleTheme();
        setIsDark((prev) => !prev);
    };

    return (
        <header className="bg-white dark:bg-gray-800 shadow-sm z-50 h-16 w-full">
            <div className="flex items-center justify-between px-4 py-3 md:px-6 w-full">
                {/* Mobile menu button (only on mobile) */}
                <button
                    onClick={toggleSidebar}
                    className="md:hidden mr-2 p-2 bg-opacity-10 dark:bg-white dark:bg-opacity-20 dark:text-white bg-gray-800 text-gray-800  rounded-lg"
                    aria-label="Toggle menu"
                >
                    {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
                {/* Brand/Logo */}
                <div className="flex-1 flex items-center">
                    <span className="font-bold text-lg text-gray-800 sm:block md:hidden dark:text-white">IMS</span>
                </div>
                {/* Right side controls */}
                <div className="flex items-center gap-5">
                    {/* Theme Toggle Button */}
                    <button className="text-xl" onClick={handleToggle}>
                        {isDark ? "\ud83c\udf19" : "\u2600\ufe0f"}
                    </button>
                    {/* User Menu */}
                    <div className="relative group">
                        <button className="flex items-center space-x-2 focus:outline-none">
                            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                                <FiUser className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                            </div>
                            <span className="hidden md:inline text-sm font-medium dark:text-white">Admin</span>
                        </button>
                        {/* Dropdown */}
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                            <Form method="post" action="/logout">
                                <button
                                    type="submit"
                                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left"
                                >
                                    <FiLogOut className="mr-2" />
                                    Sign out
                                </button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
