import { Outlet } from "@remix-run/react";
import { useState } from "react";
import Header from "~/components/layout/Header";
import Sidebar from "~/components/layout/Sidebar";
const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div>
            <div className="h-screen bg-gray-100 dark:bg-gray-900">
                <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
                <div className="md:pl-52 h-full flex flex-col">
                    <Header isSidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen((open) => !open)} />
                    <main className="flex-1 overflow-y-auto p-4 md:p-6">
                        <Outlet />
                        
                    </main>
                </div>
            </div>
        </div>
    )
}

export default Layout