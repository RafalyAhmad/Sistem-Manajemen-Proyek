// import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import { Head } from "@inertiajs/react";
// import TicketCard from "@/Components/TicketCard";
// import BasicInput from "@/Components/BasicInput";
import React from "react";
import { useForm, usePage } from "@inertiajs/react";
import Widget from "@/Components/Widget";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router } from "@inertiajs/react";

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

                <div className="overflow-x-auto">
                    <table className="w-full border text-center">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="p-2 border">User</th>
                                <th className="p-2 border">Project</th>
                                <th className="p-2 border">Judul</th>
                                <th className="p-2 border">Deskripsi</th>
                                <th className="p-2 border">Waktu dibuat</th>
                                <th className="p-2 border">Status</th>
                                <th className="p-2 border">Aksi</th>
                            </tr>
                        </thead>

                        <tbody>
                            {tickets.map((t) => (
                                <tr
                                    key={t.ticket_id}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="border p-2">
                                        {t.user?.name}
                                    </td>
                                    <td className="border p-2">
                                        {t.project?.project_name}
                                    </td>
                                    <td className="border p-2">{t.title}</td>
                                    <td className="border p-2">
                                        {t.description}
                                    </td>
                                    <td className="border p-2">
                                        {formatTanggal(t.created_at)}
                                    </td>

                                    <td className="border p-2">
                                        {t.status === "live" ? (
                                            <span className="text-blue-600 font-semibold">
                                                Sedang berlangsung
                                            </span>
                                        ) : t.status === "approve" ? (
                                            <span className="text-green-600 font-semibold">
                                                Diterima
                                            </span>
                                        ) : t.status === "decline" ? (
                                            <span className="text-red-600 font-semibold">
                                                Ditolak
                                            </span>
                                        ) : null}
                                    </td>

                                    <td className="border p-2 space-x-2">
                                        <button
                                            className="bg-red-600 text-white px-3 py-1 rounded"
                                            onClick={() =>
                                                deleteTicket(t.ticket_id)
                                            }
                                        >
                                            Hapus
                                        </button>
                                        <button
                                            className="bg-blue-600 text-white px-3 py-1 rounded"
                                            onClick={() =>
                                                updateStatus(
                                                    t.ticket_id,
                                                    "live"
                                                )
                                            }
                                        >
                                            Tandai berlangsung
                                        </button>
                                        <button
                                            className="bg-green-600 text-white px-3 py-1 rounded"
                                            onClick={() =>
                                                updateStatus(
                                                    t.ticket_id,
                                                    "approve"
                                                )
                                            }
                                        >
                                            Tandai diterima
                                        </button>
                                        <button
                                            className="bg-yellow-600 text-white px-3 py-1 rounded"
                                            onClick={() =>
                                                updateStatus(
                                                    t.ticket_id,
                                                    "decline"
                                                )
                                            }
                                        >
                                            Tandai ditolak
                                        </button>
                                    </td>
                                    <td></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Widget>
        </AuthenticatedLayout>
    );
}
