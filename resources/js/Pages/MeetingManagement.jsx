import React from "react";
import { useForm, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Widget from "@/Components/Widget";

export default function MeetingManagement() {
    const { meetings, user, project } = usePage().props;

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        reset,
    } = useForm({
        meeting_id: "",
        user_id: "",
        project_id: "",
        title: "",
        description: "",
        notulensi: "",
        meeting_time: "",
        email_to: "",
    });

    const submit = (e) => {
        e.preventDefault();

        if (data.meeting_id) {
            put(`/meetings/${data.meeting_id}`, {
                onSuccess: () => reset(),
            });
        } else {
            post("/meetings", {
                onSuccess: () => reset(),
            });
        }
    };

    const editMeeting = (meeting) => {
        setData({
            meeting_id: meeting.meeting_id,
            user_id: meeting.user_id,
            project_id: meeting.project_id,
            title: meeting.title,
            description: meeting.description,
            notulensi: meeting.notulensi,
            meeting_time: meeting.meeting_time,
            email_to: meeting.email_to,
        });
    };

    const deleteMeeting = (id) => {
        if (confirm("Yakin ingin menghapus meeting ini?")) {
            destroy(`/meetings/${id}`);
        }
    };

    return (
        <AuthenticatedLayout>
            <Widget>
                <h1 className="text-2xl font-bold mb-6">Meeting Management</h1>

                {/* FORM */}
                <form
                    onSubmit={submit}
                    className="grid grid-cols-2 gap-4 mb-10"
                >
                    {/* USER */}
                    <div>
                        <label className="font-semibold mb-1 block">User</label>
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

                    {/* PROJECT */}
                    <div>
                        <label className="font-semibold mb-1 block">
                            Project
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

                    {/* TITLE */}
                    <div>
                        <label className="font-semibold mb-1 block">
                            Judul Meeting
                        </label>
                        <input
                            type="text"
                            className="border rounded px-3 py-2 w-full"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                        />
                    </div>

                    {/* MEETING TIME */}
                    <div>
                        <label className="font-semibold mb-1 block">
                            Waktu Meeting
                        </label>
                        <input
                            type="datetime-local"
                            className="border rounded px-3 py-2 w-full"
                            value={data.meeting_time}
                            onChange={(e) =>
                                setData("meeting_time", e.target.value)
                            }
                        />
                    </div>

                    {/* EMAIL TO */}
                    <div>
                        <label className="font-semibold mb-1 block">
                            Kirim ke Email
                        </label>
                        <input
                            type="email"
                            className="border rounded px-3 py-2 w-full"
                            value={data.email_to}
                            onChange={(e) =>
                                setData("email_to", e.target.value)
                            }
                        />
                    </div>

                    {/* DESKRIPSI */}
                    <div className="col-span-2">
                        <label className="font-semibold mb-1 block">
                            Deskripsi
                        </label>
                        <textarea
                            className="border rounded px-3 py-2 w-full"
                            rows="3"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                        ></textarea>
                    </div>

                    {/* NOTULENSI */}
                    <div className="col-span-2">
                        <label className="font-semibold mb-1 block">
                            Notulensi
                        </label>
                        <textarea
                            className="border rounded px-3 py-2 w-full"
                            rows="3"
                            value={data.notulensi}
                            onChange={(e) =>
                                setData("notulensi", e.target.value)
                            }
                        ></textarea>
                    </div>

                    {/* BUTTON */}
                    <div className="col-span-2">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
                        >
                            {data.meeting_id
                                ? "Update Meeting"
                                : "Tambah Meeting"}
                        </button>
                    </div>
                </form>

                {/* TABLE */}
                <div className="overflow-x-auto">
                    <table className="w-full border text-center">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="p-2 border">User</th>
                                <th className="p-2 border">Project</th>
                                <th className="p-2 border">Title</th>
                                <th className="p-2 border">Waktu</th>
                                <th className="p-2 border">Email</th>
                                <th className="p-2 border">Aksi</th>
                            </tr>
                        </thead>

                        <tbody>
                            {meetings.map((m) => (
                                <tr
                                    key={m.meeting_id}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="border p-2">
                                        {m.user?.name}
                                    </td>
                                    <td className="border p-2">
                                        {m.project?.project_name}
                                    </td>
                                    <td className="border p-2">{m.title}</td>
                                    <td className="border p-2">
                                        {m.meeting_time}
                                    </td>
                                    <td className="border p-2">{m.email_to}</td>

                                    <td className="border p-2 space-x-2">
                                        <button
                                            className="bg-yellow-500 text-white px-3 py-1 rounded"
                                            onClick={() => editMeeting(m)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="bg-red-600 text-white px-3 py-1 rounded"
                                            onClick={() =>
                                                deleteMeeting(m.meeting_id)
                                            }
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Widget>
        </AuthenticatedLayout>
    );
}
