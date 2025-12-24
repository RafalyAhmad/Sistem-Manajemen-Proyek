import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import MetricWidget from "@/Components/MetricWidget";
import Widget from "@/Components/Widget";

export default function Dashboard() {
    const metrics = [
        { title: "Total Projects", value: 3 },
        { title: "Total Tickets", value: 10 },
        { title: "Total Developers", value: 2 },
    ];

    return (
        <AuthenticatedLayout
            header={
                <>
                    <h2 className="text-2xl font-semibold leading-tight text-gray-800">
                        Dashboard
                    </h2>
                </>
            }
        >
            <Head title="Dashboard" />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {metrics.map((metric, index) => (
                    <MetricWidget
                        key={index}
                        title={metric.title}
                        value={metric.value}
                    />
                ))}
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
                <Widget
                    title="Number of tickets per project"
                    className="lg:col-span-1 min-h-[300px]"
                >
                    <p className="text-gray-500">Placeholder Chart 1</p>
                </Widget>

                <Widget
                    title="Developer Statistics Chart"
                    className="lg:col-span-1 min-h-[300px]"
                >
                    <p className="text-gray-500">Placeholder Chart 2</p>
                </Widget>

                <Widget
                    title="Ticket Creation Trend"
                    className="lg:col-span-2 min-h-[300px]"
                >
                    <p className="text-gray-500">Placeholder Chart 3</p>
                </Widget>

                <Widget
                    title="Project Timeline"
                    className="lg:col-span-2 min-h-[400px]"
                >
                    <p className="text-gray-500">Placeholder Timeline</p>
                </Widget>

                <Widget
                    title="User Statistics"
                    className="lg:col-span-1 min-h-[350px]"
                >
                    <p className="text-gray-500">Placeholder Table 1</p>
                </Widget>

                <Widget
                    title="Recent Activities"
                    className="lg:col-span-1 min-h-[350px]"
                >
                    <p className="text-gray-500">Placeholder Table 2</p>
                </Widget>
            </div>
        </AuthenticatedLayout>
    );
}
