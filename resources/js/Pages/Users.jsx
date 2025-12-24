import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Buttons from "@/Components/Buttons";
import MetricWidget from "@/Components/MetricWidget";
import Table from "@/Components/Table";
import { useState } from "react";

export default function Users(clients, developers) {
    const metrics = [
        { title: "Clients", value: 20 },
        { title: "Developers", value: 4 },
    ];

    const clientColumns = [
        { label: "Client", key: "name" },
        { label: "Username", key: "username" },
        { label: "Organization", key: "organization" },
        { label: "Email", key: "email" },
        { label: "Projects", key: "projects_count" },
    ];

    const devColumns = [
        { label: "Developer", key: "name" },
        { label: "Username", key: "username" },
        { label: "Role", key: "role_name" },
        { label: "Projects", key: "projects_count" },
    ];

    const dummyClients = [
        {
            id: 1,
            name: "XYZ",
            username: "wyzsama",
            organization: "Thales Group",
            email: "priaidaman99@thales.fr",
            projects_count: 2,
        },
        {
            id: 2,
            name: "XYZ",
            username: "wyzsama",
            organization: "Thales Group",
            email: "priaidaman99@thales.fr",
            projects_count: 2,
        },
    ];

    const dummyDevelopers = [
        {
            id: 1,
            name: "XYZ",
            username: "arnora334",
            role_name: "Quality Assurance",
            projects_count: 2,
        },
        {
            id: 2,
            name: "XYZ",
            username: "arnora334",
            role_name: "Fullstack Developer",
            projects_count: 5,
        },
    ];

    const displayClients = dummyClients;
    const displayDevelopers = dummyDevelopers;

    // const [page, setPage] = useState(1);
    // const [rowsPerPage, setRowsPerPage] = useState(5);
    // const totalRows = clientRows.length;
    // const totalPages = Math.max(1, Math.ceil(totalRows / rowsPerPage));
    // const paginatedRows = clientRows.slice(
    //     (page - 1) * rowsPerPage,
    //     page * rowsPerPage
    // );
    // const pagination = {
    //     page,
    //     rowsPerPage,
    //     totalRows,
    //     totalPages,
    //     onPrev: () => setPage((p) => Math.max(1, p - 1)),
    //     onNext: () => setPage((p) => Math.min(totalPages, p + 1)),
    //     onRowsPerPageChange: (value) => {
    //         setRowsPerPage(value);
    //         setPage(1); // reset page
    //     },
    // };

    const AddUserIcon = (
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
                d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
            />
        </svg>
    );

    return (
        <AuthenticatedLayout
            header={
                <>
                    <h2 className="text-2xl font-semibold leading-tight text-gray-800">
                        Users
                    </h2>
                    <Buttons variant="dark">
                        {AddUserIcon}
                        User
                    </Buttons>
                </>
            }
        >
            <Head title="Users Management" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {metrics.map((metric, index) => (
                    <MetricWidget
                        key={index}
                        title={metric.title}
                        value={metric.value}
                    />
                ))}
            </div>

            <div className="mb-6">
                <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">
                    <div className="p-4 border-b border-gray-100">
                        <h3 className="font-bold text-gray-700">
                            Development Team
                        </h3>
                    </div>

                    <div className="overflow-x-auto">
                        <Table columns={devColumns} data={displayDevelopers} />
                    </div>
                </div>
            </div>
            <div className="mb-6">
                <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">
                    <div className="p-4 border-b border-gray-100">
                        <h3 className="font-bold text-gray-700">Clients</h3>
                    </div>

                    <div className="overflow-x-auto">
                        <Table columns={clientColumns} data={displayClients} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
