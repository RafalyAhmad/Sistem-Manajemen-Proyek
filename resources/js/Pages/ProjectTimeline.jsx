import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import BasicInput from "@/Components/BasicInput";
import TimelineContainer from "@/Components/Timeline/TimelineContainer";

export default function ProjectTimeline() {
    const timelineData = {
        title: "Project Timeline",
        range: 12,
        unitLabel: "Month",
        rows: [
            {
                id: 1,
                name: "Feature X",
                status: "In Progress",
                duration: "4",
                start: 1,
                end: 5,
                progress: 70,
            },
            {
                id: 2,
                name: "Feature A",
                status: "In Progress",
                duration: "5",
                start: 4,
                end: 9,
                progress: 40,
            },
        ],
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row items-start justify-between w-full gap-4">
                    <h2 className="text-2xl font-semibold leading-tight text-gray-800">
                        Project Timeline
                    </h2>
                    <BasicInput
                        placeholder="Cari Project..."
                        className="w-full sm:max-w-xs"
                    />
                </div>
            }
        >
            <Head title="Project Timeline" />

            <TimelineContainer data={timelineData} />
        </AuthenticatedLayout>
    );
}
