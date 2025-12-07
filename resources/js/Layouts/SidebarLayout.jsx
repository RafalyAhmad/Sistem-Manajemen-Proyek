import React from "react";
import { Link, Head, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "./AuthenticatedLayout";
AuthenticatedLayout;

export default function SidebarLayout({ title, children }) {
    const { auth } = usePage().props;
    const role = auth?.user?.role;

    console.log("ROLE:", role); // cek di console browser

    return (
        <AuthenticatedLayout>
            <div className="min-h-screen bg-gray-100 flex">
                {/* SIDEBAR */}
                <div className="w-64 bg-white shadow-lg p-5">
                    <ul className="space-y-3 text-gray-700">
                        <li>
                            <Link
                                href="/dashboard"
                                className="block px-3 py-2 rounded hover:bg-blue-100"
                            >
                                Dashboard
                            </Link>
                        </li>

                        {/* KHUSUS PROJECT MANAGER */}
                        {role === "project manager" && (
                            <li>
                                <Link
                                    href="/projects"
                                    className="block px-3 py-2 rounded hover:bg-blue-100"
                                >
                                    Projects
                                </Link>
                            </li>
                        )}

                        <li>
                            <Link
                                href="#"
                                className="block px-3 py-2 rounded hover:bg-blue-100"
                            >
                                Notification
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="#"
                                className="block px-3 py-2 rounded hover:bg-blue-100"
                            >
                                Meeting
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="#"
                                className="block px-3 py-2 rounded hover:bg-blue-100"
                            >
                                Contract
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/users"
                                className="block px-3 py-2 rounded font-semibold text-blue-600 hover:bg-blue-100"
                            >
                                Users
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="#"
                                className="block px-3 py-2 rounded hover:bg-blue-100"
                            >
                                General
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/features"
                                className="block px-3 py-2 rounded hover:bg-blue-100"
                            >
                                Project Board
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="#"
                                className="block px-3 py-2 rounded hover:bg-blue-100"
                            >
                                Project Timeline
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="#"
                                className="block px-3 py-2 rounded hover:bg-blue-100"
                            >
                                Vote
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* KONTEN */}
                <div className="flex-1 p-10">
                    <Head title={title} />
                    <div className="bg-white shadow rounded-lg p-6">
                        {children}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
