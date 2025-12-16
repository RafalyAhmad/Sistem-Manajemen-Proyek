import React from "react";
import { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import SidebarLayout from "@/Layouts/SidebarLayout";

export default function ProjectManagement({ projects, features }) {
    const { users } = usePage().props;

    const [factor, setFactor] = useState(1);

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
        final_project_fee: "",
        initial_project_time: "",
        final_project_time: "",
        description: "",
        status: "in_progress",
        total_cfp: "",
        total_rcaf: "",
        total_feature_fee: "",
        total_feature_time: "",
        working_hour_per_day: "",
        development_cost_per_day: "",
        line_of_code_per_day: "",
        features: [],
    });

    //Perhitungan
    const updateTotalCfp = (selectedFeatures) => {
        const total = features
            .filter((f) => selectedFeatures.includes(f.id))
            .reduce((sum, f) => sum + Number(f.feature_cfp), 0);
        setData("total_cfp", total);
    };

    const CalculateTime = (field, value) => {
        setData(field, value);
        const work_hour =
            field === "working_hour_per_day"
                ? parseInt(value) || 0
                : parseInt(data.working_hour_per_day) || 0;
        const line_code =
            field === "line_of_code_per_day"
                ? parseInt(value) || 0
                : parseInt(data.line_of_code_per_day) || 0;
        const cfp =
            field === "total_cfp"
                ? parseInt(value) || 0
                : parseInt(data.total_cfp) || 0;
        const rcaf =
            field === "total_rcaf"
                ? parseInt(value) || 0
                : parseInt(data.total_rcaf) || 0;
        const time =
            work_hour * ((factor * (cfp * (0.65 + 0.01 * rcaf))) / line_code);
        setData("initial_project_time", time);
    };

    const CalculateFee = (field, value) => {
        setData(field, value);
        const time =
            field === "initial_project_time"
                ? parseInt(value) || 0
                : parseInt(data.initial_project_time) || 0;
        const dev_cost =
            field === "development_cost_per_day"
                ? parseInt(value) || 0
                : parseInt(data.development_cost_per_day) || 0;

        const fee = time * dev_cost;
        setData("initial_project_fee", fee);
    };

    //button logic

    const submit = (e) => {
        e.preventDefault();

        if (data.project_id) {
            put(`/projects/${data.project_id}`, {
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
            id: project.project_id,
            user_id: project.user_id,
            project_name: project.project_name,
            features: project.features?.map((f) => f.id) ?? [],
            initial_project_fee: project.initial_project_fee,
            initial_project_time: project.initial_project_time,
            status: project.status,
            total_cfp: project.total_cfp,
            deskripsi: project.deskripsi,
        });
    };

    const deleteProject = (project_id) => {
        if (confirm("Yakin ingin menghapus project ini?")) {
            destroy(`/projects/${project_id}`);
        }
    };

    return (
        <SidebarLayout title="Project Management">
            <h1 className="text-2xl font-bold mb-6">Project Management</h1>

            {/* ================= FORM ================= */}
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
                        value={data.project_name}
                        onChange={(e) =>
                            setData("project_name", e.target.value)
                        }
                    />
                </div>

                {/* FEATURES */}
                <div>
                    <label className="block mb-1 font-semibold">Features</label>
                    <div className="border rounded p-3 space-y-2 max-h-48 overflow-y-auto">
                        {features?.map((feature) => {
                            const selected = data.features;

                            return (
                                <label
                                    key={feature.id}
                                    className="flex items-center gap-2"
                                >
                                    <input
                                        type="checkbox"
                                        value={feature.id}
                                        checked={selected.includes(feature.id)}
                                        onChange={() => {
                                            let updated;

                                            if (selected.includes(feature.id)) {
                                                updated = selected.filter(
                                                    (f) => f !== feature.id
                                                );
                                            } else {
                                                updated = [
                                                    ...selected,
                                                    feature.id,
                                                ];
                                            }

                                            setData("features", updated);
                                            updateTotalCfp(updated); // HITUNG CFP
                                        }}
                                    />
                                    <span>
                                        {feature.feature_name} -{" "}
                                        {feature.feature_cfp}
                                    </span>
                                </label>
                            );
                        })}
                    </div>
                </div>

                <div>
                    <label className="block mb-1 font-semibold">
                        Bahasa Pemrograman
                    </label>
                    <input
                        type="number"
                        className="w-full border rounded px-3 py-2"
                        value={factor}
                        onChange={(e) => {
                            setFactor(Number(e.target.value));
                            CalculateTime("factor", e.target.value);
                        }}
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

                {/* DESKRIPSI */}
                <div className="col-span-2">
                    <label className="block mb-1 font-semibold">
                        Deskripsi
                    </label>
                    <input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                    />
                </div>

                {/* TOTAL RCAF */}
                <div>
                    <label className="block mb-1 font-semibold">
                        Total RCAF
                    </label>
                    <input
                        type="number"
                        className="w-full border rounded px-3 py-2"
                        value={data.total_rcaf}
                        onChange={(e) =>
                            CalculateTime("total_rcaf", e.target.value)
                        }
                    />
                </div>

                {/* TOTAL CFP */}
                <div>
                    <label className="block mb-1 font-semibold">
                        Total CFP
                    </label>
                    <input
                        type="number"
                        className="w-full border rounded px-3 py-2"
                        value={data.total_cfp}
                        readOnly
                        onChange={(e) =>
                            CalculateTime("total_cfp", e.target.value)
                        }
                    />
                </div>

                {/* Working hour per day */}
                <div>
                    <label className="block mb-1 font-semibold">
                        Jam kerja sehari
                    </label>
                    <input
                        type="number"
                        className="w-full border rounded px-3 py-2"
                        value={data.working_hour_per_day}
                        onChange={(e) =>
                            CalculateTime(
                                "working_hour_per_day",
                                e.target.value
                            )
                        }
                    />
                </div>

                {/* Dev Cost per hour */}
                <div>
                    <label className="block mb-1 font-semibold">
                        Dev Cost per jam
                    </label>
                    <input
                        type="number"
                        className="w-full border rounded px-3 py-2"
                        value={data.development_cost_per_day}
                        onChange={(e) =>
                            CalculateFee(
                                "development_cost_per_day",
                                e.target.value
                            )
                        }
                    />
                </div>

                {/* Line of code */}
                <div className="col-span-2">
                    <label className="block mb-1 font-semibold">
                        Baris kode sehari
                    </label>
                    <input
                        type="number"
                        className="w-full border rounded px-3 py-2"
                        value={data.line_of_code_per_day}
                        onChange={(e) =>
                            CalculateTime(
                                "line_of_code_per_day",
                                e.target.value
                            )
                        }
                    />
                </div>

                {/* Biaya awal */}
                <div>
                    <label className="block mb-1 font-semibold">
                        Biaya Awal Proyek
                    </label>
                    <input
                        type="number"
                        className="w-full border rounded px-3 py-2"
                        value={data.initial_project_fee}
                        readOnly
                    />
                </div>

                {/* Biaya Akhir */}
                <div>
                    <label className="block mb-1 font-semibold">
                        Biaya akhir Proyek
                    </label>
                    <input
                        type="number"
                        className="w-full border rounded px-3 py-2"
                        value={data.final_project_fee}
                        onChange={(e) =>
                            setData("final_project_fee", e.target.value)
                        }
                    />
                </div>

                {/* Waktu awal */}
                <div>
                    <label className="block mb-1 font-semibold">
                        Durasi awal Proyek
                    </label>
                    <input
                        type="number"
                        className="w-full border rounded px-3 py-2"
                        value={data.initial_project_time}
                        readOnly
                        onChange={(e) =>
                            CalculateFee("initial_project_time", e.target.value)
                        }
                    />
                </div>

                {/* Waktu Akhir */}
                <div>
                    <label className="block mb-1 font-semibold">
                        Durasi akhir Proyek
                    </label>
                    <input
                        type="number"
                        className="w-full border rounded px-3 py-2"
                        value={data.final_project_time}
                        onChange={(e) =>
                            CalculateFee("final_project_time", e.target.value)
                        }
                    />
                </div>

                <div>
                    <label className="block mb-1 font-semibold">
                        Total biaya fitur
                    </label>
                    <input
                        type="number"
                        className="w-full border rounded px-3 py-2"
                        value={data.total_feature_fee}
                        onChange={(e) =>
                            setData("total_feature_fee", e.target.value)
                        }
                    />
                </div>

                <div>
                    <label className="block mb-1 font-semibold">
                        Total durasi fitur
                    </label>
                    <input
                        type="number"
                        className="w-full border rounded px-3 py-2"
                        value={data.total_feature_time}
                        onChange={(e) =>
                            setData("total_feature_time", e.target.value)
                        }
                    />
                </div>

                {/* SUBMIT */}
                <div className="col-span-2">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
                    >
                        {data.project_id ? "Update Project" : "Simpan Project"}
                    </button>
                </div>
            </form>

            {/* ================= TABLE ================= */}
            <div className="overflow-x-auto">
                <table className="w-full border text-center">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border p-2">User</th>
                            <th className="border p-2">Project</th>
                            <th className="border p-2">Tanggal</th>
                            <th className="border p-2">Status</th>
                            <th className="border p-2">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((p) => (
                            <tr key={p.project_id}>
                                <td className="border p-2">{p.user?.name}</td>
                                <td className="border p-2">{p.project_name}</td>
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
                                        onClick={() =>
                                            deleteProject(p.project_id)
                                        }
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
