export default function Checkbox({ className = "", ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                "rounded border-gray-300 text-[#db2727] shadow-sm focus:ring-[#db2727] " +
                className
            }
        />
    );
}
