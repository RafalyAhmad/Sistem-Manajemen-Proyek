import React from "react";
import { useForm, usePage } from "@inertiajs/react";
import SidebarLayout from "@/Layouts/SidebarLayout";

// Perhatikan: Menghapus {p.description?.name} di kolom "User" dan "Project"
// Karena 'features' tidak memiliki properti tersebut berdasarkan data form yang ada.
// Jika 'feature' terhubung ke 'user' atau 'project', sesuaikan dengan struktur data yang benar.

export default function FeatureManagement({ features }) {
    const { projects } = usePage().props; // nanti kita kirim dari controller

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        reset,
    } = useForm({
        id: "",
        project_id: "",
        initial_feature_fee: "",
        initial_feature_time: "",
        status: "in_progress",
        description: "",
        initial_feature_fee: "",
        final_feature_fee: "",
        initial_feature_time: "",
        final_feature_time: "",
        change_feature_fee: "",
        change_feature_time: "",
        total_cfp: "",
        updated_at: "",
        total_change_feature_fee: "",
        total_change_feature_time: "",
        external_input: "",
        external_output: "",
        logical_internal_file: "",
        external_interface_file: "",
        external_inquiry: "",
    });

    // Asumsikan data/state Anda diperbarui dengan fungsi setData(key, value)
    const handleInputChange = (field, value) => {
        // 1. Update nilai field yang berubah
        setData(field, value);

        // 2. Ambil nilai terbaru untuk perhitungan
        // Pastikan konversi ke integer/float (jika input adalah string)
        const input =
            field === "external_input"
                ? parseInt(value) || 0
                : parseInt(data.external_input) || 0;
        const output =
            field === "external_output"
                ? parseInt(value) || 0
                : parseInt(data.external_output) || 0;
        const database =
            field === "logical_internal_file"
                ? parseInt(value) || 0
                : parseInt(data.logical_internal_file) || 0;
        const api_diakses =
            field === "external_interface_file"
                ? parseInt(value) || 0
                : parseInt(data.external_interface_file) || 0;
        const external_inquiry =
            field === "external_inquiry"
                ? parseInt(value) || 0
                : parseInt(data.external_inquiry) || 0;

        // 3. Lakukan perhitungan
        const total_cfp_baru =
            input * output * database * api_diakses * external_inquiry;

        // 4. Update state Total CFP
        setData("total_cfp", total_cfp_baru);
    };

    const submit = (e) => {
        e.preventDefault();

        if (data.id !== "" && data.id !== undefined) {
            put(`/features/${data.id}`, {
                onSuccess: () => reset(),
            });
        } else {
            post("/features", {
                onSuccess: () => reset(),
            });
        }
    };

    const editFeature = (feature) => {
        setData({
            id: feature.id,
            initial_feature_fee: feature.initial_feature_fee,
            initial_feature_time: feature.initial_feature_time,
            status: feature.status,
            description: feature.description,
        });
    };

    const deleteFeature = (id) => {
        if (confirm("Yakin ingin menghapus Fitur ini?")) {
            destroy(`/features/${id}`);
        }
    };

    return (
        <SidebarLayout>
            <h1 className="text-2xl font-bold mb-6">Feature Management</h1>{" "}
            {/* ========== FORM ========== */}
            <form onSubmit={submit} className="grid grid-cols-2 gap-4 mb-8">
                {/* USER */}
                <div>
                    <label className="block mb-1 font-semibold">Proyek</label>
                    <select
                        className="w-full border rounded px-3 py-2"
                        value={data.project_id}
                        onChange={(e) => setData("project_id", e.target.value)}
                    >
                        <option value="">-- Pilih project --</option>

                        {projects?.map((project) => (
                            <option
                                key={project.project_id}
                                value={project.project_id}
                            >
                                {project.project_name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block mb-1 font-semibold">
                        Nama Fitur
                    </label>
                    <input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        placeholder="Nama fitur"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">
                        Biaya Awal Fitur
                    </label>
                    <input
                        type="number"
                        className="w-full border rounded px-3 py-2"
                        placeholder=""
                        value={data.initial_feature_fee}
                        onChange={(e) =>
                            setData("initial_feature_fee", e.target.value)
                        }
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">
                        Biaya Akhir Fitur
                    </label>
                    <input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        placeholder=""
                        value={data.final_feature_fee}
                        onChange={(e) =>
                            setData("final_feature_fee", e.target.value)
                        }
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">
                        Waktu Awal Fitur
                    </label>
                    <input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        placeholder=""
                        value={data.initial_feature_time}
                        onChange={(e) =>
                            setData("initial_feature_time", e.target.value)
                        }
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">
                        Waktu Akhir Fitur
                    </label>
                    <input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        placeholder=""
                        value={data.final_feature_time}
                        onChange={(e) =>
                            setData("final_feature_time", e.target.value)
                        }
                    />
                </div>

                <div>
                    <label className="block mb-1 font-semibold">
                        Jumlah input
                    </label>
                    <input
                        type="number"
                        className="w-full border rounded px-3 py-2"
                        placeholder=""
                        value={data.external_input}
                        onChange={(e) =>
                            handleInputChange("external_input", e.target.value)
                        }
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">
                        Jumlah Output
                    </label>
                    <input
                        type="number"
                        className="w-full border rounded px-3 py-2"
                        placeholder=""
                        value={data.external_output}
                        onChange={(e) =>
                            handleInputChange("external_output", e.target.value)
                        }
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">
                        Database diakses
                    </label>
                    <input
                        type="number"
                        className="w-full border rounded px-3 py-2"
                        placeholder=""
                        value={data.logical_internal_file}
                        onChange={(e) =>
                            handleInputChange(
                                "logical_internal_file",
                                e.target.value
                            )
                        }
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">
                        API diakses
                    </label>
                    <input
                        type="number"
                        className="w-full border rounded px-3 py-2"
                        placeholder=""
                        value={data.external_interface_file}
                        onChange={(e) =>
                            handleInputChange(
                                "external_interface_file",
                                e.target.value
                            )
                        }
                        // onChange={(e) => setData("description", e.target.value)}
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">
                        External inquiry
                    </label>
                    <input
                        type="number"
                        className="w-full border rounded px-3 py-2"
                        placeholder=""
                        value={data.external_inquiry}
                        onChange={(e) =>
                            handleInputChange(
                                "external_inquiry",
                                e.target.value
                            )
                        }
                        // onChange={(e) => setData("description", e.target.value)}
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">
                        Total CFP
                    </label>
                    <input
                        type="number"
                        className="w-full border rounded px-3 py-2"
                        placeholder=""
                        value={data.total_cfp}
                        onChange={(e) => setData("total_cfp", e.target.value)}
                    />
                </div>

                <div className="col-span-2">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
                    >
                        {data.id ? "Update Fitur" : "Simpan Fitur"}
                    </button>
                </div>
            </form>
            {/* ========== TABEL ========== */}
            <div className="overflow-x-auto">
                <table className="w-full border text-center">
                    <thead className="bg-gray-200">
                        <tr>
                            {/* Sesuaikan Judul Kolom */}
                            <th className="border p-2">Deskripsi Fitur</th>
                            <th className="border p-2">Biaya Awal</th>
                            <th className="border p-2">Waktu Awal</th>
                            <th className="border p-2">Status</th>
                            <th className="border p-2">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {features.map((feature) => (
                            <tr key={feature.id} className="hover:bg-gray-50">
                                <td className="border p-2">
                                    {feature.description}
                                </td>
                                <td className="border p-2">
                                    {feature.initial_feature_fee}
                                </td>
                                <td className="border p-2">
                                    {feature.initial_feature_time}
                                </td>
                                <td className="border p-2">{feature.status}</td>
                                <td className="border p-2">
                                    <button
                                        onClick={() => editFeature(feature)}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            deleteFeature(feature.id)
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
