import React from "react";

const Buttons = ({
    children,
    onClick,
    type = "button",
    variant = "primary", // 'primary', 'info', 'success'
    disabled = false,
    className = "",
}) => {
    const baseClasses =
        "inline-flex items-center justify-center px-4 py-2 text-md sm:text-lg font-medium rounded-lg gap-2 cursor-pointer transition-colors duration-300 disabled:cursor-not-allowed";

    const variantStyles = {
        primary:
            "text-white bg-[#db2727] hover:bg-[#991b1b] disabled:bg-[#fee2e2]",
        info: "text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400",
        success:
            "text-white bg-green-600 hover:bg-green-700 disabled:bg-green-400",
    };

    const variantClasses = variantStyles[variant] || variantStyles.secondary;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${variantClasses} ${className}`}
        >
            {children}
        </button>
    );
};

export default Buttons;
