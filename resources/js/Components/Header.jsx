import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown"; // Jika menggunakan dropdown profile

export default function Header({ user, onToggleSidebar, showing }) {
    return (
        // Header dengan Flexbox, fixed di atas
        <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-300 z-30 flex items-center justify-between px-4 sm:px-8">
            <button
                onClick={onToggleSidebar}
                type="button"
                className="sm:hidden focus:outline-none"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`w-6 h-6 transition duration-500 ${
                        showing ? "rotate-90" : ""
                    }`}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 9h16.5m-16.5 6.75h16.5"
                    />
                </svg>
            </button>

            {/* Logo GiPM */}
            <Link href="/" className="flex items-center space-x-3">
                <ApplicationLogo className="w-6 h-6 fill-current text-gray-800" />
                <span className="text-xl font-bold">GiPM</span>
            </Link>

            {/* Profil */}
            <div className="flex items-center">
                {/* Menggunakan elemen Link atau Dropdown untuk Profile */}
                <Dropdown>
                    <Dropdown.Trigger>
                        <span className="inline-flex">
                            <button
                                type="button"
                                className="inline-flex items-center border border-transparent bg-white text-sm text-gray-800 font-medium leading-4 transition duration-300 ease-in-out hover:text-gray-400 focus:outline-none"
                            >
                                {user?.name}

                                <svg
                                    className="-me-0.5 ms-2 h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </span>
                    </Dropdown.Trigger>

                    <Dropdown.Content>
                        <Dropdown.Link href={route("profile.edit")}>
                            Profile
                        </Dropdown.Link>
                        <Dropdown.Link
                            href={route("logout")}
                            method="post"
                            as="button"
                        >
                            Log Out
                        </Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
                {/* <Link
                    href={route("profile.edit")}
                    className="p-2 rounded-full hover:bg-gray-100"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.485 0-4.793-.139-6.999-.442z"
                        />
                    </svg>
                </Link> */}
            </div>
        </header>
    );
}
