import React from "react";
import { useForm, usePage } from "@inertiajs/react";
import SidebarLayout from "@/Layouts/SidebarLayout";

export default function ContractManagement() {
    const { contracts, user, project } = usePage().props;

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        reset,
    } = useForm({
        contract_id: "",
        user_id: "",
        project_id: "",
        contract_number: "",
        contract_date: "",
    });

    const submit = (e) => {
        e.preventDefault();

        if (data.contract_id) {
            put(`/contracts/${data.contract_id}`, {
                onSuccess: () => reset(),
            });
        } else {
            post("/contracts", {
                onSuccess: () => reset(),
            });
        }
    };

    const editContract = (contract) => {
        setData({
            contract_id: contract.contract_id,
            user_id: contract.user_id,
            project_id: contract.project_id,
            contract_number: contract.contract_number,
            contract_date: contract.contract_date,
        });
    };

    const deleteContract = (contract_id) => {
        if (confirm("Yakin ingin menghapus kontrak ini?")) {
            destroy(`/contracts/${contract_id}`);
        }
    };

    return (
        <SidebarLayout>
            <h1 className="text-2xl font-bold mb-6">Contract Management</h1>

            {/* FORM */}
            <form onSubmit={submit} className="grid grid-cols-2 gap-4 mb-10">
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
                        onChange={(e) => setData("project_id", e.target.value)}
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
                        Nomor Kontrak
                    </label>
                    <input
                        type="text"
                        className="border rounded px-3 py-2 w-full"
                        value={data.contract_number}
                        onChange={(e) =>
                            setData("contract_number", e.target.value)
                        }
                    />
                </div>

                <div>
                    <label className="font-semibold mb-1 block">
                        Waktu Kontrak
                    </label>
                    <input
                        type="datetime-local"
                        className="border rounded px-3 py-2 w-full"
                        value={data.contract_date}
                        onChange={(e) =>
                            setData("contract_date", e.target.value)
                        }
                    />
                </div>

                <div className="col-span-2">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
                    >
                        {data.contract_id ? "Update Kontrak" : "Tambah Kontrak"}
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
                            <th className="p-2 border">Nomor Kontrak</th>
                            <th className="p-2 border">Waktu Kontrak</th>
                            <th className="p-2 border">Aksi</th>
                        </tr>
                    </thead>

                    <tbody>
                        {contracts.map((m) => (
                            <tr
                                key={m.contract_id}
                                className="hover:bg-gray-50"
                            >
                                <td className="border p-2">{m.user?.name}</td>
                                <td className="border p-2">
                                    {m.project?.project_name}
                                </td>
                                <td className="border p-2">
                                    {m.contract_number}
                                </td>
                                <td className="border p-2">
                                    {m.contract_date}
                                </td>

                                <td className="border p-2 space-x-2">
                                    <button
                                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                                        onClick={() => editContract(m)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="bg-red-600 text-white px-3 py-1 rounded"
                                        onClick={() =>
                                            deleteContract(m.contract_id)
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
        </SidebarLayout>
    );
}
