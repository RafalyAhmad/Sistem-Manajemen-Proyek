import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import SidebarLayout from "@/Layouts/SidebarLayout";

export default function UserManagement({ users }) {
    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        reset,
    } = useForm({
        id: "",
        name: "",
        email: "",
        role: "user",
    });

    const submit = (e) => {
        e.preventDefault();

        if (data.id) {
            put(`/users/${data.id}`, {
                onSuccess: () => reset(),
            });
        } else {
            post("/users", {
                onSuccess: () => reset(),
            });
        }
    };

    const editUser = (user) => {
        setData({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    };

    const deleteUser = (id) => {
        if (confirm("Yakin ingin menghapus user ini?")) {
            destroy(`/users/${id}`);
        }
    };

    return (
        <div style={{ padding: "30px" }}>
            <SidebarLayout>
                <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
                    User Management
                </h1>

                {/* FORM */}
                <form onSubmit={submit} style={{ margin: "20px 0" }}>
                    <input
                        type="text"
                        placeholder="Nama"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                    />

                    <select
                        value={data.role}
                        onChange={(e) => setData("role", e.target.value)}
                    >
                        <option value="Project Manager">Project Manager</option>
                        <option value="Developer">Developer</option>
                        <option value="Client">Client</option>
                    </select>

                    <button type="submit">
                        {data.id ? "Update" : "Simpan"}
                    </button>
                </form>

                {/* TABLE */}
                <table border="1" cellPadding="8">
                    <thead>
                        <tr>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u.id}>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.role}</td>
                                <td>
                                    <button onClick={() => editUser(u)}>
                                        Edit
                                    </button>
                                    <button onClick={() => deleteUser(u.id)}>
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </SidebarLayout>
        </div>
    );
}
