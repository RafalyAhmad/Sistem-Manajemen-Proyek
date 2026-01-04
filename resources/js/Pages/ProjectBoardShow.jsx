import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Show({ project, feature }) {
    const {
        working_hour_per_day,
        total_rcaf,
        line_of_code_per_day,
        development_cost_per_day,
    } = project;
    const factor = 123;

    const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    });

    const timeInitial = Math.round(
        working_hour_per_day *
            ((factor * (feature.feature_cfp * (0.65 + 0.01 * total_rcaf))) /
                line_of_code_per_day)
    );

    const feeInitial = formatter.format(
        Math.round(timeInitial * development_cost_per_day)
    );

    return (
        <AuthenticatedLayout>
            {/* Daftar Fitur */}
            <div className="bg-white shadow rounded p-4">
                <h2 className="text-xl font -semibold mb-4">Project Board</h2>
                <h2 className="text-xl font-semibold mb-4">Tambah Perubahan</h2>
                Nama Fitur : {feature.feature_name} <br />
                Poin CFP Fitur : {feature.feature_cfp} <br />
                Deskripsi : {feature.description} <br />
                Time Initial : {timeInitial} Jam <br />
                Fee Initial : {feeInitial} <br />
                Fee Change : <br />
                Time Change : <br />
                Final Fee : <br />
                Final Time :<br />
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
