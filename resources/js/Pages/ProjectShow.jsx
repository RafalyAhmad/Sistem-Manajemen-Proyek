import Widget from "@/Components/Widget";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Show({ project }) {
    const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    });

    return (
        <AuthenticatedLayout>
            <Widget>
                {/* Info Project */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">
                        {project.project_name}
                    </h1>
                    <p className="text-gray-600">{project.description}</p>
                    Estimasi biaya awal:{" "}
                    {formatter.format(project.initial_project_fee)} <br />
                    Estimasi waktu awal: {project.initial_project_time} Jam{" "}
                    <br />
                    Estimasi biaya akhir:{" "}
                    {formatter.format(project.final_project_fee)} <br />
                    Estimasi waktu akhir: {project.final_project_time} Jam{" "}
                    <br />
                    Status: {project.status} <br />
                    Total CFP: {project.total_cfp} <br />
                    Total RCAF: {project.total_rcaf} <br />
                    Total Biaya Fitur: {project.total_feature_fee} <br />
                    Total Waktu Fitur: {project.total_feature_time} <br />
                    Jam Kerja Per Hari: {
                        project.working_hour_per_day
                    } <br /> {project.development_cost_per_day}, Biaya
                    Pengembangan Per Hari: {project.development_cost_per_day}{" "}
                    <br />
                    Jumlah Baris Kode Per Hari: {
                        project.line_of_code_per_day
                    }{" "}
                    <br />
                    Bahasa pemrograman : {project.factor}
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
