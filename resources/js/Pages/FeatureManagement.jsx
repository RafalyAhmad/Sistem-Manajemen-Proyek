import React from "react";
import { useForm, usePage } from "@inertiajs/react";
import SidebarLayout from "@/Layouts/SidebarLayout";

// Perhatikan: Menghapus {p.description?.name} di kolom "User" dan "Project"
// Karena 'features' tidak memiliki properti tersebut berdasarkan data form yang ada.
// Jika 'feature' terhubung ke 'user' atau 'project', sesuaikan dengan struktur data yang benar.

export default function FeatureManagement({ features }) {
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
        // Hapus 'project_name', 'initial_project_fee', 'initial_project_time' karena ini untuk Project, BUKAN Feature.
        // Hapus properti project yang tidak digunakan di form ini
        // data form untuk feature:
        initial_feature_fee: "",
        initial_feature_time: "",
        status: "in_progress",
        // TAMBAHKAN 'description' ke state useForm, agar bisa diakses di form
        description: "",
        // Hapus properti yang tidak digunakan di form ini
        // working_hour_per_day: "",
        // development_cost_per_day: "",
        // line_of_code_per_day: "",
    });

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
            // Perbaiki: Sesuaikan dengan field yang ada di data
            initial_feature_fee: feature.initial_feature_fee,
            initial_feature_time: feature.initial_feature_time,
            status: feature.status,
            description: feature.description, // Pastikan field ini ada di object 'feature'
            // Reset field lain jika diperlukan, atau hanya perbarui field yang relevan
            user_id: feature.user_id, // Jika user_id ada
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
            {/* Judul diperbaiki */}
            {/* ========== FORM ========== */}
            <form onSubmit={submit} className="grid grid-cols-2 gap-4 mb-8">
                {/* DESKRIPSI FITUR */}
                <div>
                    <label className="block mb-1 font-semibold">
                        Nama Fitur / Deskripsi
                    </label>
                    <input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        placeholder="Nama fitur"
                        // PERBAIKAN 1 untuk TypeError:
                        // Mengakses 'data.description' BUKAN 'data.feature.description'
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                    />
                </div>

                {/* INITIAL FEE */}
                <div>
                    <label className="block mb-1 font-semibold">
                        Biaya Awal Fitur - Function Point
                    </label>
                    <input
                        type="number"
                        className="w-full border rounded px-3 py-2"
                        value={data.initial_feature_fee}
                        onChange={(e) =>
                            setData("initial_feature_fee", e.target.value)
                        }
                    />
                </div>

                {/* Anda mungkin ingin menambahkan input untuk initial_feature_time dan status di sini */}

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
                        {/* PASTIKAN 'features' adalah array dan memiliki properti 'id' */}
                        {features.map((feature) => (
                            // PERBAIKAN 2 untuk Warning Key:
                            // Gunakan 'feature.id' sebagai key, BUKAN p.id (menggunakan nama variabel yang jelas)
                            <tr key={feature.id} className="hover:bg-gray-50">
                                {/* Ganti p.description?.name dengan properti yang benar, kemungkinan 'feature.description' */}
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
