import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function BasicInput(
    { type = "text", className = "", isFocused = false, ...props },
    ref
) {
    const localRef = useRef(null);

    // Tentukan tipe HTML input yang benar
    // Jika tipe yang diminta adalah 'numeric', gunakan 'text' dan tambahkan pola
    const inputHtmlType =
        type === "numeric" || type === "currency" ? "text" : type;

    // tambahkan atribut inputMode dan pattern untuk keyboard di mobile
    const numericProps =
        type === "numeric" || type === "currency"
            ? { inputMode: "numeric", pattern: "[0-9]*" }
            : {};

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            {...numericProps}
            type={inputHtmlType}
            className={`
                w-full rounded-md border-gray-300 shadow-sm 
                focus:border-[#db2727] focus:ring-[#db2727]
                py-3 px-3 
                ${className}
            `}
            ref={localRef}
        />
    );
});
