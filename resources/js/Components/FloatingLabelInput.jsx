import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import BasicInput from "./BasicInput";

export default forwardRef(function TextInput(
    { type = "text", className = "", isFocused = false, label = "", ...props },
    ref
) {
    const localRef = useRef(null);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [inputValue, setInputValue] = useState(props.value || "");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    useEffect(() => {
        setInputValue(props.value || "");
    }, [props.value]);

    const shouldFloat = isInputFocused || inputValue;

    // Tentukan type input yang sebenarnya:
    const inputType =
        type === "password" ? (isPasswordVisible ? "text" : "password") : type;

    // Fungsi toggle visibilitas password
    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prev) => !prev);
    };

    const baseInputType = type === "password" ? inputType : type;

    return (
        <div className="relative">
            <label
                htmlFor={props.id || props.name}
                className={`
                    absolute left-3 transition-all duration-300 ease-in-out cursor-text
                    ${
                        shouldFloat
                            ? "text-xs text-gray-500 top-[-10px] bg-white px-1"
                            : "text-base text-gray-500 top-3"
                    }
                `}
                onClick={() => localRef.current?.focus()}
            >
                {label}
            </label>

            <BasicInput
                {...props}
                id={props.id || props.name}
                type={baseInputType}
                ref={localRef}
                value={inputValue}
                className={
                    `py-3 px-3 ` +
                    `${type === "password" ? "pe-10" : ""}` +
                    `${className}`
                }
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                onChange={(e) => {
                    setInputValue(e.target.value);
                    props.onChange && props.onChange(e);
                }}
            />

            {type === "password" && (
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 end-0 flex items-center pe-3 text-gray-500 hover:text-gray-700"
                    aria-label={
                        isPasswordVisible ? "Hide password" : "Show password"
                    }
                >
                    {isPasswordVisible ? (
                        // Ikon Mata Tertutup (Eye Slash Icon)
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                            />
                        </svg>
                    ) : (
                        // Ikon Mata Terbuka (Eye Icon)
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                        </svg>
                    )}
                </button>
            )}
        </div>
    );
});
