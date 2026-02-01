import React from "react";
import { useForm, usePage, router } from "@inertiajs/react";
import Widget from "@/Components/Widget";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TicketCard from "@/Components/TicketCard";

export default function Tickets() {
    const { tickets, projects, auth } = usePage().props;

    const userRole = auth?.user?.role;

    const updateStatus = (ticketId, status) => {
        router.patch(route("tickets.update-status", { ticket: ticketId }), {
            status,
        });
    };

    const liveTickets = tickets.filter((t) => t.status === "live");
    const approvedTickets = tickets.filter((t) => t.status === "approve");
    const declinedTickets = tickets.filter((t) => t.status === "decline");

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        reset,
    } = useForm({
        ticket_id: "",
        project_id: "",
        title: "",
        description: "",
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
                    {/* PROJECT ONLY */}
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
                            {projects.map((p) => (
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

                    <div className="col-span-2">
                        <label className="font-semibold mb-1 block">
                            Deskripsi Tiket
                        </label>
                        <textarea
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

            {/* BOARD */}
            <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
                <section className="space-y-4">
                    <h3 className="font-bold">
                        New Tickets : {liveTickets.length}
                    </h3>
                    {liveTickets.map((t) => (
                        <TicketCard
                            key={t.ticket_id}
                            ticket={t}
                            statusType="live"
                            onAction={updateStatus}
                            isProjectManager={userRole === "project manager"}
                        />
                    ))}
                </section>

                <section className="space-y-4">
                    <h3 className="font-bold">
                        Approved Tickets : {approvedTickets.length}
                    </h3>
                    {approvedTickets.map((t) => (
                        <TicketCard
                            key={t.ticket_id}
                            ticket={t}
                            statusType="approve"
                            onAction={updateStatus}
                            isProjectManager={userRole === "project manager"}
                        />
                    ))}
                </section>

                <section className="space-y-4">
                    <h3 className="font-bold">
                        Declined Tickets : {declinedTickets.length}
                    </h3>
                    {declinedTickets.map((t) => (
                        <TicketCard
                            key={t.ticket_id}
                            ticket={t}
                            statusType="decline"
                            onAction={updateStatus}
                            isProjectManager={userRole === "project manager"}
                        />
                    ))}
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
