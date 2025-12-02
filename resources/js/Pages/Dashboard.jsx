import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import SidebarLayout from "@/Layouts/SidebarLayout";

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div>
                <SidebarLayout title="Dashboard">
                    <h1 className="text-2xl font-bold mb-3">Dashboard</h1>
                    <p>Selamat datang di halaman Dashboard</p>
                </SidebarLayout>
            </div>
        </AuthenticatedLayout>
    );
}
