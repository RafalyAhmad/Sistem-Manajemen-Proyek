import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Show({ project, feature, fpAdjustments }) {
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
                <table className="w-full border-collapse border mt-4">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2">No</th>
                            <th className="border px-4 py-2">
                                Deskripsi Perubahan
                            </th>
                            <th className="border px-4 py-2">Δ FP</th>
                            <th className="border px-4 py-2">Tanggal</th>
                            <th className="border px-4 py-2">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fpAdjustments.length > 0 ? (
                            fpAdjustments.map((item, index) => (
                                <tr key={item.fp_adjustment_id}>
                                    <td className="border px-4 py-2 text-center">
                                        {index + 1}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {item.description}
                                    </td>
                                    <td className="border px-4 py-2 text-center">
                                        {item.fp_delta > 0
                                            ? `+${item.fp_delta}`
                                            : item.fp_delta}
                                    </td>
                                    <td className="border px-4 py-2 text-center">
                                        {new Date(
                                            item.created_at
                                        ).toLocaleDateString("id-ID")}
                                    </td>
                                    <td className="border px-4 py-2 text-center">
                                        <button className="text-red-600 hover:underline">
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="border px-4 py-2 text-center text-gray-500"
                                >
                                    Belum ada perubahan fitur
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}
