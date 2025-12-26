import Widget from "@/Components/Widget";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router } from "@inertiajs/react";

export default function ProjectBoard({ project, projects }) {
    const handleChangeProject = (e) => {
        router.get(
            route("project.board"),
            { project_id: e.target.value },
            { preserveState: true }
        );
    };

    return (
        <AuthenticatedLayout>
            <Widget>
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
                                        <td className="border p-2 capitalize">
                                            {feature.pivot.status}
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
