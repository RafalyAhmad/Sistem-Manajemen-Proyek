import { Link } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                "inline-flex items-center text-sm font-regular leading-5 transition duration-300 ease-in-out focus:outline-none " +
                (active
                    ? "text-[#db2727] focus:border-[#991b1b]"
                    : "text-gray-500 hover:text-gray-800 focus:text-gray-700") +
                className
            }
        >
            {children}
        </Link>
    );
}
