import React from "react";
import { useForm, usePage } from "@inertiajs/react";
import SidebarLayout from "@/Layouts/SidebarLayout";

export default function ProjectManagement({ projects }) {
    const { users } = usePage().props; // nanti kita kirim dari controller

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        reset,
    } = useForm({
        id: "",
        user_id: "",
        project_name: "",
        initial_project_fee: "",
        initial_project_time: "",
        status: "in_progress",
        working_hour_per_day: "",
        development_cost_per_day: "",
        line_of_code_per_day: "",
    });

    const submit = (e) => {
        e.preventDefault();

        if (data.id !== "" && data.id !== undefined) {
            put(`/projects/${data.id}`, {
                onSuccess: () => reset(),
            });
        } else {
            post("/projects", {
                onSuccess: () => reset(),
            });
        }
    };

    const editProject = (project) => {
        setData({
            id: project.id,
            user_id: project.user_id,
            project_name: project.project_name,
            initial_project_fee: project.initial_project_fee,
            initial_project_time: project.initial_project_time,
            status: project.status,
        });
    };

    const deleteProject = (id) => {
        if (confirm("Yakin ingin menghapus project ini?")) {
            destroy(`/projects/${id}`);
        }
    };

    return (
        <SidebarLayout title="Project Management">
            <h1 className="text-2xl font-bold mb-6">Project Management</h1>

            {/* ========== FORM ========== */}
            <form onSubmit={submit} className="grid grid-cols-2 gap-4 mb-8">
                {/* USER */}
                <div>
                    <label className="block mb-1 font-semibold">User</label>
                    <select
                        className="w-full border rounded px-3 py-2"
                        value={data.user_id}
                        onChange={(e) => setData("user_id", e.target.value)}
                    >
                        <option value="">-- Pilih User --</option>
                        {users?.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* PROJECT NAME */}
                <div>
                    <label className="block mb-1 font-semibold">
                        Nama Project
                    </label>
                    <input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        placeholder="Nama project"
                        value={data.project_name}
                        onChange={(e) =>
                            setData("project_name", e.target.value)
                        }
                    />
                </div>

                {/* INITIAL FEE */}
                <div>
                    <label className="block mb-1 font-semibold">
                        Biaya Awal Project - Function Point
                    </label>
                    <input
                        type="number"
                        className="w-full border rounded px-3 py-2"
                        value={data.initial_project_fee}
                        onChange={(e) =>
                            setData("initial_project_fee", e.target.value)
                        }
                    />
                </div>

                {/* INITIAL DATE */}
                <div>
                    <label className="block mb-1 font-semibold">
                        Tanggal Awal Project
                    </label>
                    <input
                        type="date"
                        className="w-full border rounded px-3 py-2"
                        value={data.initial_project_time}
                        onChange={(e) =>
                            setData("initial_project_time", e.target.value)
                        }
                    />
                </div>

                {/* STATUS */}
                <div className="col-span-2">
                    <label className="block mb-1 font-semibold">Status</label>
                    <select
                        className="w-full border rounded px-3 py-2"
                        value={data.status}
                        onChange={(e) => setData("status", e.target.value)}
                    >
                        <option value="in_progress">In Progress</option>
                        <option value="complete">Complete</option>
                    </select>
                </div>

                {/* Deskripsi */}
                <div className="col-span-2">
                    <label className="block mb-1 font-semibold">
                        Deskripsi
                    </label>
                    <input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        placeholder="deskripsi"
                        value={data.deskripsi}
                        onChange={(e) => setData("deskripsi", e.target.value)}
                    />
                </div>

                {/* CFP */}
                <div>
                    <label className="block mb-1 font-semibold">
                        Total CFP - Function Point
                    </label>
                    <input
                        type="number"
                        className="w-full border rounded px-3 py-2"
                        value={data.total_cfp}
                        onChange={(e) => setData("total_cfp", e.target.value)}
                    />
                </div>

                {/* RCAF */}
                <div>
                    <label className="block mb-1 font-semibold">
                        Total RCAF - Function Point
                    </label>
                    <input
                        type="number"
                        className="w-full border rounded px-3 py-2"
                        value={data.total_rcaf}
                        onChange={(e) => setData("total_rcaf", e.target.value)}
                    />
                </div>

                {/* Working Hour */}
                <div>
                    <label className="block mb-1 font-semibold">
                        Jam bekerja - Function Point
                    </label>
                    <input
                        type="number"
                        className="w-full border rounded px-3 py-2"
                        value={data.working_hour_per_day}
                        onChange={(e) =>
                            setData("working_hour_per_day", e.target.value)
                        }
                    />
                </div>

                {/* Dev Cost */}
                <div>
                    <label className="block mb-1 font-semibold">
                        Dev Cost - Function Point
                    </label>
                    <input
                        type="number"
                        className="w-full border rounded px-3 py-2"
                        value={data.development_cost_per_day}
                        onChange={(e) =>
                            setData("development_cost_per_day", e.target.value)
                        }
                    />
                </div>

                {/* line of code */}
                <div>
                    <label className="block mb-1 font-semibold">
                        Line Code - Function Point
                    </label>
                    <input
                        type="number"
                        className="w-full border rounded px-3 py-2"
                        value={data.line_of_code_per_day}
                        onChange={(e) =>
                            setData("line_of_code_per_day", e.target.value)
                        }
                    />
                </div>

                <div className="col-span-2">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
                    >
                        {data.id ? "Update Project" : "Simpan Project"}
                    </button>
                </div>
            </form>

            {/* ========== TABEL ========== */}
            <div className="overflow-x-auto">
                <table className="w-full border text-center">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border p-2">User</th>
                            <th className="border p-2">Project</th>
                            <th className="border p-2">Biaya</th>
                            <th className="border p-2">Tanggal</th>
                            <th className="border p-2">Status</th>
                            <th className="border p-2">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((p) => (
                            <tr key={p.id} className="hover:bg-gray-50">
                                <td className="border p-2">{p.user?.name}</td>
                                <td className="border p-2">{p.project_name}</td>
                                <td className="border p-2">
                                    Rp {p.initial_project_fee}
                                </td>
                                <td className="border p-2">
                                    {p.initial_project_time}
                                </td>
                                <td className="border p-2">{p.status}</td>
                                <td className="border p-2 space-x-2">
                                    <button
                                        onClick={() => editProject(p)}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => deleteProject(p.id)}
                                        className="bg-red-600 text-white px-3 py-1 rounded"
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </SidebarLayout>
    );
}
