import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import MetricWidget from "@/Components/MetricWidget";
import Widget from "@/Components/Widget";
import { usePage } from "@inertiajs/react";

export default function Dashboard() {
    const {
        totalProject,
        totalClient,
        totalDeveloper,
        totalFeatureDone,
        totalFeatureNotDone,
    } = usePage().props;
    const metrics = [
        { title: "Total Projects", value: totalProject },
        { title: "Total Client", value: totalClient },
        { title: "Total Developers", value: totalDeveloper },
        { title: "Total Fitur Selesai", value: totalFeatureDone },
        { title: "Total Fitur Belum Selesai", value: totalFeatureNotDone },
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

            <div className="mt-4"></div>
        </AuthenticatedLayout>
    );
}
