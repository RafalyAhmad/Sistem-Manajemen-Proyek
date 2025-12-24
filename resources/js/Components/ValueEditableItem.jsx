import { useState } from "react";
import Buttons from "@/Components/Buttons";
import BasicInput from "./BasicInput";

export default function ValueEditableItem({
    title,
    value,
    unit,
    type = "text",
    onSave,
    onEdit,
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [localValue, setLocalValue] = useState(value);

    const handleEditClick = () => {
        if (isEditing) {
            // Jika sedang edit, tombol menjadi 'Save'
            onSave && onSave(localValue);
            setIsEditing(false);
        } else {
            // Jika tidak edit, tombol menjadi 'Edit'
            onEdit && onEdit(); // Panggil handler onEdit eksternal (jika ada)
            setIsEditing(true);
        }
    };

    const SaveIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
            />
        </svg>
    );
    const EditIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
        </svg>
    );

    return (
        <div
            className={`
            flex justify-between items-center p-4 rounded-md my-3 shadow-md
            ${isEditing ? "bg-white" : "bg-gray-200"} 
            transition-all duration-200
        `}
        >
            {/* Judul Item */}
            <div className={`flex-1 ${isEditing ? "mr-2 sm:mr-4" : ""}`}>
                <h4 className="text-sm font-regular text-gray-800">{title}</h4>

                {isEditing ? (
                    // Mode Edit
                    <BasicInput
                        value={localValue}
                        onChange={(e) => setLocalValue(e.target.value)}
                        type={type}
                        className="mt-1 w-full bg-gray-100 focus:ring-0 text-xl font-bold"
                    />
                ) : (
                    // Mode Tampil
                    <p className="text-xl font-bold mt-1 text-gray-900">
                        {value}{" "}
                        <span className="text-base font-normal text-gray-500">
                            {unit}
                        </span>
                    </p>
                )}
            </div>

            <Buttons
                variant={isEditing ? "success" : "dark"}
                onClick={handleEditClick}
            >
                {isEditing ? SaveIcon : EditIcon}
                {isEditing ? "Save" : "Edit"}
            </Buttons>
        </div>
    );
}
