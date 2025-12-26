import Widget from "@/Components/Widget";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import { router } from "@inertiajs/react";

export default function ProjectBoard({ project, projects, features }) {
    const [showForm, setShowForm] = useState(false);
    const [featureId, setFeatureId] = useState("");

    const handleChangeProject = (e) => {
        router.get(
            route("project.board"),
            { project_id: e.target.value },
            { preserveState: true }
        );
    };

    const submit = () => {
        router.post(
            route("project.board.add", project.project_id),
            { feature_id: featureId },
            {
                onSuccess: () => {
                    setShowForm(false);
                    setFeatureId("");
                },
            }
        );
    };

    const updateStatus = (featureId, status) => {
        router.patch(
            route("project.board.update-status", {
                project: project.project_id,
                feature: featureId,
            }),
            { status }
        );
    };

    const deleteFeature = (featureId) => {
        if (!confirm("Yakin ingin menghapus fitur ini dari project?")) return;

        router.delete(
            route("project.board.destroy", {
                project: project.project_id,
                feature: featureId,
            })
        );
    };

    return (
        <AuthenticatedLayout>
            <Widget>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-blue-600 text-white px-3 py-1 rounded mb-3"
                >
                    + Tambah Fitur
                </button>

                {showForm && (
                    <div className="mb-4 flex gap-2">
                        <select
                            className="border p-2 rounded"
                            value={featureId}
                            onChange={(e) => setFeatureId(e.target.value)}
                        >
                            <option value="">-- Pilih Fitur --</option>
                            {features?.map((feature) => (
                                <option
                                    key={feature.feature_id}
                                    value={feature.feature_id}
                                >
                                    {feature.feature_name}
                                </option>
                            ))}
                        </select>

                        <button
                            onClick={submit}
                            className="bg-green-600 text-white px-3 py-1 rounded"
                            disabled={!featureId}
                        >
                            Simpan
                        </button>
                    </div>
                )}

                {/* Dropdown Project */}
                <div className="mb-6">
                    <label className="block font-semibold mb-2">
                        Pilih Project
                    </label>
                    <select
                        className="border rounded p-2 w-64"
                        value={project?.project_id || ""}
                        onChange={handleChangeProject}
                    >
                        {projects.map((p) => (
                            <option key={p.project_id} value={p.project_id}>
                                {p.project_name}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Info Project */}
                {project && (
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold">
                            {project.project_name}
                        </h1>
                        <p className="text-gray-600 mb-2">
                            {project.description}
                        </p>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                Initial Fee: {project.initial_project_fee}
                            </div>
                            <div>Final Fee: {project.final_project_fee}</div>
                            <div>
                                Initial Time: {project.initial_project_time}
                            </div>
                            <div>Final Time: {project.final_project_time}</div>
                            <div>Status: {project.status}</div>
                            <div>Total CFP: {project.total_cfp}</div>
                            <div>Total RCAF: {project.total_rcaf}</div>
                            <div>
                                Total Feature Fee: {project.total_feature_fee}
                            </div>
                            <div>
                                Total Feature Time: {project.total_feature_time}
                            </div>
                        </div>
                    </div>
                )}

                {/* Daftar Fitur */}
                <div className="bg-white shadow rounded p-4">
                    <h2 className="text-xl font-semibold mb-4">Daftar Fitur</h2>

                    {project?.features?.length === 0 ? (
                        <p className="text-gray-500">Belum ada fitur</p>
                    ) : (
                        <table className="w-full border">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border p-2">No</th>
                                    <th className="border p-2">Nama Fitur</th>
                                    <th className="border p-2">Status</th>
                                    <th className="border p-2">Tipe fitur</th>
                                    <th className="border p-2">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {project.features.map((feature, index) => (
                                    <tr key={feature.feature_id}>
                                        <td className="border p-2">
                                            {index + 1}
                                        </td>
                                        <td className="border p-2">
                                            {feature.feature_name}
                                        </td>
                                        <td className="border p-2">
                                            {feature.pivot.status ===
                                                "to_do" && (
                                                <span className="text-red-600 font-semibold">
                                                    To Do
                                                </span>
                                            )}
                                            {feature.pivot.status ===
                                                "in_progress" && (
                                                <span className="text-yellow-600 font-semibold">
                                                    In Progress
                                                </span>
                                            )}

                                            {feature.pivot.status ===
                                                "done" && (
                                                <span className="text-green-600 font-semibold">
                                                    Done
                                                </span>
                                            )}
                                        </td>
                                        <td className="border p-2">
                                            {feature.pivot.added_type ===
                                                "baseline" && (
                                                <span className="text-blue-600 px-2 rounded">
                                                    Baseline
                                                </span>
                                            )}

                                            {feature.pivot.added_type ===
                                                "change" && (
                                                <span className="text-green-600 px-2 rounded">
                                                    Change
                                                </span>
                                            )}
                                        </td>
                                        <td>
                                            <button
                                                className="bg-red-400 mx-1 px-2 py-1 rounded"
                                                onClick={() =>
                                                    updateStatus(
                                                        feature.feature_id,
                                                        "to_do"
                                                    )
                                                }
                                            >
                                                Tandai belum dikerjakan
                                            </button>

                                            <button
                                                className="bg-yellow-400 mx-1 px-2 py-1 rounded"
                                                onClick={() =>
                                                    updateStatus(
                                                        feature.feature_id,
                                                        "in_progress"
                                                    )
                                                }
                                            >
                                                Tandai dalam proses
                                            </button>

                                            <button
                                                className="bg-green-400 mx-1 px-2 py-1 rounded"
                                                onClick={() =>
                                                    updateStatus(
                                                        feature.feature_id,
                                                        "done"
                                                    )
                                                }
                                            >
                                                Tandai Selesai
                                            </button>
                                            <button
                                                className="bg-red-500 text-white mx-1 px-2 py-1 rounded"
                                                onClick={() =>
                                                    deleteFeature(
                                                        feature.feature_id
                                                    )
                                                }
                                            >
                                                Hapus Fitur
                                            </button>

                                            <button className="bg-blue-400 mx-1">
                                                detail
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </Widget>
        </AuthenticatedLayout>
    );
}
