import React from "react";
import { useForm, usePage } from "@inertiajs/react";
import SidebarLayout from "@/Layouts/SidebarLayout";

export default function FeatureManagement({ features }) {
    const { projects } = usePage().props;

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
        description: "",
        initial_feature_fee: "",
        final_feature_fee: "",
        initial_feature_time: "",
        final_feature_time: "",
        change_feature_fee: "",
        change_feature_time: "",
        total_cfp: "",
        total_change_feature_fee: "",
        total_change_feature_time: "",
        external_input: "",
        external_output: "",
        logical_internal_file: "",
        external_interface_file: "",
        external_inquiry: "",
        status: "in_progress",
    });

    const handleInputChange = (field, value) => {
        setData(field, value);

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
        const api =
            field === "external_interface_file"
                ? parseInt(value) || 0
                : parseInt(data.external_interface_file) || 0;
        const inquiry =
            field === "external_inquiry"
                ? parseInt(value) || 0
                : parseInt(data.external_inquiry) || 0;

        const total = input * output * database * api * inquiry;
        setData("total_cfp", total);
    };

    const submit = (e) => {
        e.preventDefault();

        if (data.id) {
            put(`/features/${data.id}`, { onSuccess: () => reset() });
        } else {
            post("/features", { onSuccess: () => reset() });
        }
    };

    const editFeature = (feature) => {
        setData({
            id: feature.id,
            project_id: feature.project_id,
            description: feature.description,
            initial_feature_fee: feature.initial_feature_fee,
            final_feature_fee: feature.final_feature_fee,
            initial_feature_time: feature.initial_feature_time,
            final_feature_time: feature.final_feature_time,
            change_feature_fee: feature.change_feature_fee,
            change_feature_time: feature.change_feature_time,
            total_cfp: feature.total_cfp,
            total_change_feature_fee: feature.total_change_feature_fee,
            total_change_feature_time: feature.total_change_feature_time,
            external_input: feature.external_input,
            external_output: feature.external_output,
            logical_internal_file: feature.logical_internal_file,
            external_interface_file: feature.external_interface_file,
            external_inquiry: feature.external_inquiry,
            status: feature.status,
        });
    };

    const deleteFeature = (id) => {
        if (confirm("Yakin ingin menghapus Fitur ini?")) {
            destroy(`/features/${id}`);
        }
    };

    return (
        <SidebarLayout>
            <h1 className="text-2xl font-bold mb-6">Feature Management</h1>

            <form onSubmit={submit} className="grid grid-cols-2 gap-4 mb-8">
                <select
                    value={data.project_id}
                    onChange={(e) => setData("project_id", e.target.value)}
                    className="border p-2 rounded col-span-2"
                >
                    <option value="">-- Pilih Project --</option>
                    {projects.map((p) => (
                        <option key={p.project_id} value={p.project_id}>
                            {p.project_name}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="Nama Feature"
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                    className="border p-2 rounded col-span-2"
                />

                <input
                    type="number"
                    placeholder="Initial Fee"
                    value={data.initial_feature_fee}
                    onChange={(e) =>
                        setData("initial_feature_fee", e.target.value)
                    }
                    className="border p-2 rounded"
                />

                <input
                    type="number"
                    placeholder="Final Fee"
                    value={data.final_feature_fee}
                    onChange={(e) =>
                        setData("final_feature_fee", e.target.value)
                    }
                    className="border p-2 rounded"
                />

                <input
                    type="number"
                    placeholder="Initial Time"
                    value={data.initial_feature_time}
                    onChange={(e) =>
                        setData("initial_feature_time", e.target.value)
                    }
                    className="border p-2 rounded"
                />

                <input
                    type="number"
                    placeholder="Final Time"
                    value={data.final_feature_time}
                    onChange={(e) =>
                        setData("final_feature_time", e.target.value)
                    }
                    className="border p-2 rounded"
                />

                <input
                    type="number"
                    placeholder="External Input"
                    value={data.external_input}
                    onChange={(e) =>
                        handleInputChange("external_input", e.target.value)
                    }
                    className="border p-2 rounded"
                />

                <input
                    type="number"
                    placeholder="External Output"
                    value={data.external_output}
                    onChange={(e) =>
                        handleInputChange("external_output", e.target.value)
                    }
                    className="border p-2 rounded"
                />

                <input
                    type="number"
                    placeholder="Logical Internal File"
                    value={data.logical_internal_file}
                    onChange={(e) =>
                        handleInputChange(
                            "logical_internal_file",
                            e.target.value
                        )
                    }
                    className="border p-2 rounded"
                />

                <input
                    type="number"
                    placeholder="External Interface"
                    value={data.external_interface_file}
                    onChange={(e) =>
                        handleInputChange(
                            "external_interface_file",
                            e.target.value
                        )
                    }
                    className="border p-2 rounded"
                />

                <input
                    type="number"
                    placeholder="External Inquiry"
                    value={data.external_inquiry}
                    onChange={(e) =>
                        handleInputChange("external_inquiry", e.target.value)
                    }
                    className="border p-2 rounded"
                />

                <input
                    type="number"
                    placeholder="Total CFP"
                    value={data.total_cfp}
                    readOnly
                    className="border p-2 rounded bg-gray-100 col-span-2"
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded col-span-2"
                >
                    {data.id ? "Update Feature" : "Simpan Feature"}
                </button>
            </form>

            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Nama Feature</th>
                        <th className="border p-2">Fee</th>
                        <th className="border p-2">CFP</th>
                        <th className="border p-2">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {features.map((f) => (
                        <tr key={f.id}>
                            <td className="border p-2">{f.description}</td>
                            <td className="border p-2">
                                {f.initial_feature_fee}
                            </td>
                            <td className="border p-2">{f.total_cfp}</td>
                            <td className="border p-2">
                                <button
                                    onClick={() => editFeature(f)}
                                    className="bg-yellow-500 text-white px-3 py-1 mr-2 rounded"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteFeature(f.id)}
                                    className="bg-red-600 text-white px-3 py-1 rounded"
                                >
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </SidebarLayout>
    );
}
