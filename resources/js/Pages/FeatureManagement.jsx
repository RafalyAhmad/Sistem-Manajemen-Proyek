import React from "react";
import { useForm, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Widget from "@/Components/Widget";

export default function FeatureManagement() {
    const { features, projects } = usePage().props;

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        reset,
    } = useForm({
        feature_id: "",
        project_id: "",
        feature_name: "",
        description: "",
        status: "in_progress",
        external_input: "",
        external_output: "",
        logical_internal_file: "",
        external_interface_file: "",
        external_inquiry: "",
        feature_cfp: "",
        // initial_feature_fee: "",
        // final_feature_fee: "",
        // initial_feature_time: "",
        // final_feature_time: "",
        // change_feature_fee: "",
        // change_feature_time: "",
        // total_change_feature_fee: "",
        // total_change_feature_time: "",
    });

    const [weightEI, setWeightEI] = React.useState("");
    const [levelEI, setLevelEI] = React.useState("");
    const calculateExternalInput = (weight, level) => {
        const w = parseInt(weight) || 0;
        const l = parseInt(level) || 0;
        const result = w * l;
        setData("external_input", result);
        handleInputChange("external_input", result);
    };

    const [weightEO, setWeightEO] = React.useState("");
    const [levelEO, setLevelEO] = React.useState("");
    const calculateExternalOutput = (weight, level) => {
        const w = parseInt(weight) || 0;
        const l = parseInt(level) || 0;
        const result = w * l;
        setData("external_output", result);
        handleInputChange("external_output", result);
    };

    const [weightLIF, setWeightLIF] = React.useState("");
    const [levelLIF, setLevelLIF] = React.useState("");
    const calculateLogicalInternalFile = (weight, level) => {
        const w = parseInt(weight) || 0;
        const l = parseInt(level) || 0;
        const result = w * l;
        setData("logical_internal_file", result);
        handleInputChange("logical_internal_file", result);
    };

    const [weightEIF, setWeightEIF] = React.useState("");
    const [levelEIF, setLevelEIF] = React.useState("");
    const calculateExternalInterfaceFile = (weight, level) => {
        const w = parseInt(weight) || 0;
        const l = parseInt(level) || 0;
        const result = w * l;
        setData("external_interface_file", result);
        handleInputChange("external_interface_file", result);
    };

    const [weightEQ, setWeightEQ] = React.useState("");
    const [levelEQ, setLevelEQ] = React.useState("");
    const calculateExternalInquiry = (weight, level) => {
        const w = parseInt(weight) || 0;
        const l = parseInt(level) || 0;
        const result = w * l;
        setData("external_inquiry", result);
        handleInputChange("external_inquiry", result);
    };

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

        const total = input + output + database + api + inquiry;
        setData("feature_cfp", total);
    };

    const submit = (e) => {
        e.preventDefault();

        if (data.feature_id) {
            put(`/features/${data.feature_id}`, { onSuccess: () => reset() });
        } else {
            post("/features", { onSuccess: () => reset() });
        }
    };

    const editFeature = (feature) => {
        setData({
            feature_id: feature.feature_id,
            project_id: feature.project_id,
            feature_name: feature.feature_name,
            description: feature.description,
            status: feature.status,
            external_input: feature.external_input,
            external_output: feature.external_output,
            logical_internal_file: feature.logical_internal_file,
            external_interface_file: feature.external_interface_file,
            external_inquiry: feature.external_inquiry,
            feature_cfp: feature.feature_cfp,
            // initial_feature_fee: feature.initial_feature_fee,
            // final_feature_fee: feature.final_feature_fee,
            // initial_feature_time: feature.initial_feature_time,
            // final_feature_time: feature.final_feature_time,
            // change_feature_fee: feature.change_feature_fee,
            // change_feature_time: feature.change_feature_time,
            // total_change_feature_fee: feature.total_change_feature_fee,
            // total_change_feature_time: feature.total_change_feature_time,
        });
    };

    const deleteFeature = (feature_id) => {
        if (confirm("Yakin ingin menghapus Fitur ini?")) {
            destroy(`/features/${feature_id}`);
        }
    };

    return (
        <AuthenticatedLayout>
            <Widget>
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
                        placeholder="Nama Fitur"
                        value={data.feature_name}
                        onChange={(e) =>
                            setData("feature_name", e.target.value)
                        }
                        className="border p-2 rounded col-span-2"
                    />

                    <input
                        type="text"
                        placeholder="Deskripsi"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className="border p-2 rounded col-span-2"
                    />

                    <input
                        type="number"
                        placeholder="Bobot External Input"
                        value={weightEI}
                        onChange={(e) => {
                            setWeightEI(e.target.value);
                            calculateExternalInput(e.target.value, levelEI);
                        }}
                        className="border p-2 rounded"
                    />

                    <select
                        value={levelEI}
                        onChange={(e) => {
                            setLevelEI(e.target.value);
                            calculateExternalInput(weightEI, e.target.value);
                        }}
                        className="border p-2 rounded"
                    >
                        <option value="">-- Pilih Kompleksitas --</option>
                        <option value="3">Mudah</option>
                        <option value="4">Medium</option>
                        <option value="6">Sulit</option>
                    </select>

                    <input
                        type="number"
                        placeholder="Bobot External Output"
                        value={weightEO}
                        onChange={(e) => {
                            setWeightEO(e.target.value);
                            calculateExternalOutput(e.target.value, levelEO);
                        }}
                        className="border p-2 rounded"
                    />

                    <select
                        value={levelEO}
                        onChange={(e) => {
                            setLevelEO(e.target.value);
                            calculateExternalOutput(weightEO, e.target.value);
                        }}
                        className="border p-2 rounded"
                    >
                        <option value="">-- Pilih Kompleksitas --</option>
                        <option value="4">Mudah</option>
                        <option value="5">Medium</option>
                        <option value="7">Sulit</option>
                    </select>

                    <input
                        type="number"
                        placeholder="Bobot LIF"
                        value={weightLIF}
                        onChange={(e) => {
                            setWeightLIF(e.target.value);
                            calculateLogicalInternalFile(
                                e.target.value,
                                levelLIF
                            );
                        }}
                        className="border p-2 rounded"
                    />

                    <select
                        value={levelLIF}
                        onChange={(e) => {
                            setLevelLIF(e.target.value);
                            calculateLogicalInternalFile(
                                weightLIF,
                                e.target.value
                            );
                        }}
                        className="border p-2 rounded"
                    >
                        <option value="">-- Pilih Kompleksitas --</option>
                        <option value="7">Mudah</option>
                        <option value="10">Medium</option>
                        <option value="15">Sulit</option>
                    </select>

                    <input
                        type="number"
                        placeholder="Bobot EIF"
                        value={weightEIF}
                        onChange={(e) => {
                            setWeightEIF(e.target.value);
                            calculateExternalInterfaceFile(
                                e.target.value,
                                levelEIF
                            );
                        }}
                        className="border p-2 rounded"
                    />

                    <select
                        value={levelEIF}
                        onChange={(e) => {
                            setLevelEIF(e.target.value);
                            calculateExternalInterfaceFile(
                                weightEIF,
                                e.target.value
                            );
                        }}
                        className="border p-2 rounded"
                    >
                        <option value="">-- Pilih Kompleksitas --</option>
                        <option value="5">Mudah</option>
                        <option value="7">Medium</option>
                        <option value="10">Sulit</option>
                    </select>

                    <input
                        type="number"
                        placeholder="Bobot External Inquiry"
                        value={weightEQ}
                        onChange={(e) => {
                            setWeightEQ(e.target.value);
                            calculateExternalInquiry(e.target.value, levelEQ);
                        }}
                        className="border p-2 rounded"
                    />

                    <select
                        value={levelEQ}
                        onChange={(e) => {
                            setLevelEQ(e.target.value);
                            calculateExternalInquiry(weightEQ, e.target.value);
                        }}
                        className="border p-2 rounded"
                    >
                        <option value="">-- Pilih Kompleksitas --</option>
                        <option value="3">Mudah</option>
                        <option value="4">Medium</option>
                        <option value="6">Sulit</option>
                    </select>

                    <input
                        type="number"
                        placeholder="CFP Fitur"
                        value={data.feature_cfp}
                        readOnly
                        className="border p-2 rounded"
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

                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 px-4 rounded col-span-2"
                    >
                        {data.feature_id ? "Update Feature" : "Simpan Feature"}
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
                            <tr key={f.feature_id}>
                                <td className="border p-2">{f.feature_name}</td>
                                <td className="border p-2">
                                    {f.initial_feature_fee}
                                </td>
                                <td className="border p-2">{f.feature_cfp}</td>
                                <td className="border p-2">
                                    <button
                                        onClick={() => editFeature(f)}
                                        className="bg-yellow-500 text-white px-3 py-1 mr-2 rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() =>
                                            deleteFeature(f.feature_id)
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
            </Widget>
        </AuthenticatedLayout>
    );
}
