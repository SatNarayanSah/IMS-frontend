import { Link, useLocation } from "@remix-run/react";
import { FaShoppingCart } from "react-icons/fa";
import {
  FiHome, FiPackage, FiDollarSign, FiUsers,
  FiTruck, FiPieChart, FiSettings,
} from "react-icons/fi";

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: FiHome },
    { name: "Sales", href: "/sales", icon: FiDollarSign },
    { name: 'Purchase', href: "/purchase", icon: FaShoppingCart },
    { name: "Inventory", href: "/inventory", icon: FiPackage },
    { name: "Customers", href: "/customers", icon: FiUsers },
    // { name: "Suppliers", href: "/suppliers", icon: FiTruck },
    // { name: "Reports", href: "/reports", icon: FiPieChart },
    // { name: "Settings", href: "/settings", icon: FiSettings },
  ];

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-52 transition-all duration-300 ease-in-out
          bg-slate-200 dark:bg-gray-800 
          text-gray-800 dark:text-white
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:h-screen`}
      >
        <div className="flex flex-col h-full">
          {/* Brand Logo */}
          <div className="flex items-center justify-center h-16 border-b 
                         border-gray-300 dark:border-gray-700">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              LiquorStock Pro
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-2 px-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors
                      ${
                        location.pathname === item.href
                          ? "bg-blue-400 dark:bg-gray-700 text-white dark:text-white"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-300 dark:border-gray-700">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                <span className="text-sm text-gray-700 dark:text-gray-300">AD</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Admin User
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Manager
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <button
          className="fixed inset-0 z-30  bg-opacity-15 bg-black md:hidden"
          onClick={() => setIsOpen(false)}
          aria-label="Close menu"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setIsOpen(false);
            }
          }}
        />
      )}
    </>
  );
};

export default Sidebar;