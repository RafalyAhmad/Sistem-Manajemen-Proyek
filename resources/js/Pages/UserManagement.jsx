import React from "react";
import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Widget from "@/Components/Widget";

export default function UserManagement({ users, roles }) {
    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        reset,
    } = useForm({
        id: null,
        name: "",
        email: "",
        role: "",
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();

        if (data.id) {
            put(route("users.update", data.id), {
                onSuccess: () => reset(),
            });
        } else {
            post(route("users.store"), {
                onSuccess: () => reset(),
            });
        }
    };

    const editUser = (user) => {
        setData({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.roles?.[0]?.name ?? "",
            password: "",
        });
    };

    const deleteUser = (id) => {
        if (confirm("Yakin ingin menghapus user ini?")) {
            destroy(route("users.destroy", id));
        }
    };

    return (
        <AuthenticatedLayout title="User Management">
            <Widget>
                <h1 className="text-2xl font-bold mb-5">User Management</h1>

                {/* FORM */}
                <form onSubmit={submit} className="space-y-3 mb-10">
                    <input
                        type="text"
                        placeholder="Nama"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="border p-2 w-full rounded"
                        required
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        className="border p-2 w-full rounded"
                        required
                    />

                    {!data.id && (
                        <input
                            type="password"
                            placeholder="Password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="border p-2 w-full rounded"
                            required
                        />
                    )}

                    <select
                        value={data.role}
                        onChange={(e) => setData("role", e.target.value)}
                        className="border p-2 w-full rounded"
                        required
                    >
                        <option value="">-- Pilih Role --</option>
                        {roles.map((r) => (
                            <option key={r} value={r}>
                                {r}
                            </option>
                        ))}
                    </select>

                    <button className="bg-blue-600 text-white px-4 py-2 rounded">
                        {data.id ? "Update" : "Simpan"}
                    </button>
                </form>

                {/* TABLE */}
                <table className="w-full border">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-2 border">Nama</th>
                            <th className="p-2 border">Email</th>
                            <th className="p-2 border">Role</th>
                            <th className="p-2 border">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u.id}>
                                <td className="p-2 border">{u.name}</td>
                                <td className="p-2 border">{u.email}</td>
                                <td className="p-2 border font-semibold">
                                    {u.roles?.[0]?.name ?? "-"}
                                </td>
                                <td className="p-2 border flex gap-2">
                                    <button
                                        onClick={() => editUser(u)}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteUser(u.id)}
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
