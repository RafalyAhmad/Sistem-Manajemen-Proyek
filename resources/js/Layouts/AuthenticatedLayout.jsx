import Header from "@/Components/Header";
import Sidebar from "@/Components/Sidebar";
import { usePage } from "@inertiajs/react";
import { useState } from "react";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingSidebar, setShowingSidebar] = useState(false);
    const toggleSidebar = () => setShowingSidebar((prev) => !prev);

    return (
        <div className="min-h-screen bg-gray-100">
            <Header
                user={user}
                onToggleSidebar={toggleSidebar}
                showing={showingSidebar}
            />

            <div className="flex pt-16">
                <Sidebar showing={showingSidebar} toggle={toggleSidebar} />

                <main className="flex-1 sm:ml-64 p-4">
                    {header && (
                        <div className="mx-auto mb-4">
                            <div className="flex justify-between items-start flex-wrap gap-4">
                                {header}
                            </div>
                        </div>
                    )}

                    <div className="mx-auto">{children}</div>
                </main>
            </div>
            {showingSidebar && (
                <div
                    onClick={toggleSidebar}
                    className="fixed inset-0 z-10 bg-black bg-opacity-50 sm:hidden" // Hanya tampil di mobile
                ></div>
            )}
        </div>
    );
}
