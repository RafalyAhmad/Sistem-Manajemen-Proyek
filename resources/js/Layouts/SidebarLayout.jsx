import React from "react";
import { Link, Head } from "@inertiajs/react";

export default function SidebarLayout({ title, children }) {
    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* SIDEBAR */}
            <div className="w-64 bg-white shadow-lg p-5">
                <h2 className="text-2xl font-bold mb-8 text-blue-600">
                    My App
                </h2>

                <ul className="space-y-3 text-gray-700">
                    <li>
                        <Link
                            href="/dashboard"
                            className="block px-3 py-2 rounded hover:bg-blue-100"
                        >
                            Dashboard
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/projects"
                            className="block px-3 py-2 rounded hover:bg-blue-100"
                        >
                            Projects
                        </Link>
                    </li>

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

            {/* KONTEN KANAN */}
            <div className="flex-1 p-10">
                <Head title={title} />

                <div className="bg-white shadow rounded-lg p-6">{children}</div>
            </div>
        </div>
    );
}
