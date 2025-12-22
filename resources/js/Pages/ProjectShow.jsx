import SidebarLayout from "@/Layouts/SidebarLayout";

export default function Show({ project }) {
    return (
        <SidebarLayout>
            {/* Info Project */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold">{project.project_name}</h1>
                <p className="text-gray-600">{project.description}</p>
                {project.initial_project_fee}, {project.final_project_fee},
                {project.initial_project_time}, {project.final_project_time},
                {project.status}, {project.total_cfp}, {project.description},
                {project.total_rcaf}, {project.total_feature_fee},
                {project.total_feature_time}, {project.working_hour_per_day},
                {project.development_cost_per_day},
                {project.line_of_code_per_day},
            </div>

            {/* Daftar Fitur */}
            <div className="bg-white shadow rounded p-4">
                <h2 className="text-xl font-semibold mb-4">Daftar Fitur</h2>

                {project.features.length === 0 ? (
                    <p className="text-gray-500">Belum ada fitur</p>
                ) : (
                    <table className="w-full border">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2">No</th>
                                <th className="border p-2">Nama Fitur</th>
                                <th className="border p-2">Status Fitur</th>
                                <th className="border p-2">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {project.features.map((feature, index) => (
                                <tr key={feature.feature_id}>
                                    <td className="border p-2">{index + 1}</td>
                                    <td className="border p-2">
                                        {feature.feature_name}
                                    </td>
                                    <td className="border p-2">
                                        {feature.pivot.status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </SidebarLayout>
    );
}
