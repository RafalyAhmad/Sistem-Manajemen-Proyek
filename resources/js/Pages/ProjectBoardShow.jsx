import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Show({ project, feature }) {
    return (
        <AuthenticatedLayout>
            {/* Daftar Fitur */}
            <div className="bg-white shadow rounded p-4">
                <h2 className="text-xl font-semibold mb-4">Project Board</h2>
                <h2 className="text-xl font-semibold mb-4">Tambah Perubahan</h2>
                Nama Fitur : {feature.feature_name} <br />
                Poin CFP Fitur : {feature.feature_cfp} <br />
                Deskripsi : {feature.description} <br />
                Time Initial : <br />
                Fee Initial : <br />
                Fee Change : <br />
                Time Change : <br />
                Final Fee : <br />
                Final Time <br />
                List Perubahan Fitur <br />
                <table>
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">No</th>
                            <th className="border px-4 py-2">
                                Deskripsi Perubahan
                            </th>
                            <th className="border px-4 py-2">Aksi</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}
