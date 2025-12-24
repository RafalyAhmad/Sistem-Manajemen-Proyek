import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import ValueEditableItem from "@/Components/ValueEditableItem";
import BasicInput from "@/Components/BasicInput";

export default function GeneralSettings() {
    const settings = [
        {
            id: 1,
            title: "Development cost/hour",
            value: "200.000",
            unit: "Rupiah",
            type: "currency",
        },
        {
            id: 2,
            title: "Working hours/day",
            value: "7",
            unit: "hours",
            type: "numeric",
        },
        {
            id: 3,
            title: "Lines of code/day",
            value: "1000",
            unit: "lines",
            type: "numeric",
        },
    ];

    // Logika Search (belum)
    const handleSearch = (e) => {
        console.log("Searching for:", e.target.value);
    };

    return (
        <AuthenticatedLayout
            header={
                <>
                    <h2 className="text-2xl font-semibold leading-tight text-gray-800">
                        General Settings
                    </h2>

                    <BasicInput
                        placeholder="Search setting..."
                        onChange={handleSearch}
                        className="w-full sm:w-auto sm:max-w-sm"
                    />
                </>
            }
        >
            <Head title="General Settings" />
            <div>
                <div className="my-4">
                    <h3 className="text-xl font-medium text-gray-500 mb-4">
                        Development
                    </h3>

                    <div>
                        {settings.map((item) => (
                            <ValueEditableItem
                                key={item.id}
                                title={item.title}
                                value={item.value}
                                unit={item.unit}
                                type={item.type}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
