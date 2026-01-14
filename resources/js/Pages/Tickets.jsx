// import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import { Head } from "@inertiajs/react";
// import BasicInput from "@/Components/BasicInput";
import React from "react";
import { useForm, usePage } from "@inertiajs/react";
import Widget from "@/Components/Widget";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router } from "@inertiajs/react";
import TicketCard from "@/Components/TicketCard";

export default function Tickets() {
    const { tickets, user, project } = usePage().props;

    const updateStatus = (ticketId, status) => {
        router.patch(
            route("tickets.update-status", {
                ticket: ticketId,
            }),
            { status }
        );
    };

    const liveTickets = tickets.filter((t) => t.status === "live");
    const approvedTickets = tickets.filter((t) => t.status === "approve");
    const declinedTickets = tickets.filter((t) => t.status === "decline");

    const formatTanggal = (dateString) => {
        return new Date(dateString).toLocaleString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        reset,
    } = useForm({
        ticket_id: "",
        user_id: "",
        project_id: "",
        title: "",
        description: "",
        status: "",
        timestamp: "",
    });

    const submit = (e) => {
        e.preventDefault();

        if (data.ticket_id) {
            put(`/tickets/${data.ticket_id}`, {
                onSuccess: () => reset(),
            });
        } else {
            post("/tickets", {
                onSuccess: () => reset(),
            });
        }
    };

    const deleteTicket = (ticket_id) => {
        if (confirm("Yakin ingin menghapus ticket ini?")) {
            destroy(`/tickets/${ticket_id}`);
        }
    };

    return (
        <AuthenticatedLayout>
            <Widget>
                <form
                    onSubmit={submit}
                    className="grid grid-cols-2 gap-4 mb-10"
                >
                    <div>
                        <label className="font-semibold mb-1 block">
                            User terkait
                        </label>
                        <select
                            className="w-full border rounded px-3 py-2"
                            value={data.user_id}
                            onChange={(e) => setData("user_id", e.target.value)}
                        >
                            <option value="">-- Pilih User --</option>
                            {user.map((u) => (
                                <option key={u.id} value={u.id}>
                                    {u.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="font-semibold mb-1 block">
                            Nama Project
                        </label>
                        <select
                            className="w-full border rounded px-3 py-2"
                            value={data.project_id}
                            onChange={(e) =>
                                setData("project_id", e.target.value)
                            }
                        >
                            <option value="">-- Pilih Project --</option>
                            {project.map((p) => (
                                <option key={p.project_id} value={p.project_id}>
                                    {p.project_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="font-semibold mb-1 block">
                            Judul Tiket
                        </label>
                        <input
                            type="text"
                            className="border rounded px-3 py-2 w-full"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="font-semibold mb-1 block">
                            Deskripsi Tiket
                        </label>
                        <input
                            type="text"
                            className="border rounded px-3 py-2 w-full"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                        />
                    </div>

                    <div className="col-span-2">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
                        >
                            {data.ticket_id ? "Update Tiket" : "Tambah Tiket"}
                        </button>
                    </div>
                </form>
            </Widget>

            <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Kolom LIVE */}
                <section className="space-y-4">
                    <h3 className="font-bold text-gray-700 flex items-center gap-2">
                        <span className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></span>
                        Ticket Baru ({liveTickets.length})
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                        {liveTickets.map((t) => (
                            <TicketCard
                                key={t.ticket_id}
                                ticket={t}
                                statusType="live"
                                onAction={updateStatus}
                            />
                        ))}
                    </div>
                </section>

                {/* Kolom APPROVED */}
                <section className="space-y-4">
                    <h3 className="font-bold text-gray-700 flex items-center gap-2">
                        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                        Diterima ({approvedTickets.length})
                    </h3>
                    <div className="grid grid-cols-1 gap-4 opacity-90">
                        {approvedTickets.map((t) => (
                            <TicketCard
                                key={t.ticket_id}
                                ticket={t}
                                statusType="approve"
                                onAction={updateStatus}
                            />
                        ))}
                    </div>
                </section>

                {/* Kolom DECLINED */}
                <section className="space-y-4">
                    <h3 className="font-bold text-gray-700 flex items-center gap-2">
                        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                        Ditolak ({declinedTickets.length})
                    </h3>
                    <div className="grid grid-cols-1 gap-4 opacity-90">
                        {declinedTickets.map((t) => (
                            <TicketCard
                                key={t.ticket_id}
                                ticket={t}
                                statusType="decline"
                                onAction={updateStatus}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
