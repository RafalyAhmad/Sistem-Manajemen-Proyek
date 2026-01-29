import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";

export default function Show({ project, feature }) {
    const storageKey = `fp_changes_feature_${feature.feature_id}`;
    const [changes, setChanges] = useState(() => {
        const saved = localStorage.getItem(storageKey);
        return saved ? JSON.parse(saved) : [];
    });
    const [form, setForm] = useState({
        description: "",
        fp_delta: "",
        date: "",
    });
    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(changes));
    }, [changes]);
    const [fpAdjustment, setFpAdjustment] = useState(
        feature.pivot.fp_adjustment,
    );
    //kalkulasi
    const {
        working_hour_per_day,
        total_rcaf,
        line_of_code_per_day,
        development_cost_per_day,
    } = project;
    const factor = 53;

    const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    });

    const timeInitial = Math.round(
        working_hour_per_day *
            ((factor * (feature.feature_cfp * (0.65 + 0.01 * total_rcaf))) /
                line_of_code_per_day),
    );

    const feeInitial = formatter.format(
        Math.round(timeInitial * development_cost_per_day),
    );

    const timeChange = Math.round(
        working_hour_per_day *
            ((factor *
                (feature.pivot.fp_adjustment * (0.65 + 0.01 * total_rcaf))) /
                line_of_code_per_day),
    );

    const feeChange = formatter.format(
        Math.round(timeChange * development_cost_per_day),
    );

    const finalTime = timeInitial + timeChange;
    const finalFee = formatter.format(
        Math.round(finalTime * development_cost_per_day),
    );

    return (
        <AuthenticatedLayout>
            <div className="bg-white shadow rounded p-4">
                <h2 className="text-xl font -semibold mb-4">Project Board</h2>
                Nama Fitur : {feature.feature_name} <br />
                Poin CFP Fitur : {feature.feature_cfp} <br />
                Deskripsi : {feature.description} <br />
                Time Initial : {timeInitial} Jam <br />
                Fee Initial : {feeInitial} <br />
                Time Change : {timeChange} Jam <br />
                Fee Change : {feeChange} <br />
                Final Time :{finalTime} Jam <br />
                Final Fee : {finalFee} <br />
                FP perubahan fitur : {feature.pivot.fp_adjustment} <br />
                <div className="mt-4 p-4 border rounded">
                    <h3 className="font-semibold mb-2">
                        Edit FP Perubahan Fitur
                    </h3>

                    <input
                        type="number"
                        className="border p-2 w-32 mr-2"
                        value={fpAdjustment}
                        onChange={(e) => setFpAdjustment(e.target.value)}
                    />

                    <button
                        type="button"
                        className="bg-green-600 text-white px-4 py-2"
                        onClick={() => {
                            router.put(
                                route("project.board.update-fp-adjustment", {
                                    project: project.project_id,
                                    feature: feature.feature_id,
                                }),
                                {
                                    fp_adjustment: Number(fpAdjustment),
                                },
                                {
                                    preserveScroll: true,
                                },
                            );
                        }}
                    >
                        Simpan
                    </button>
                </div>
                <hr className="my-4" />
                <h3 className="font-semibold mb-2">Tambah Perubahan</h3>
                {/* FORM INPUT */}
                <div className="mb-4 grid grid-cols-4 gap-2">
                    <input
                        type="text"
                        placeholder="Deskripsi perubahan"
                        className="border p-2 col-span-2"
                        value={form.description}
                        onChange={(e) =>
                            setForm({ ...form, description: e.target.value })
                        }
                    />

                    <input
                        type="number"
                        placeholder="Δ FP"
                        className="border p-2"
                        value={form.fp_delta}
                        onChange={(e) =>
                            setForm({ ...form, fp_delta: e.target.value })
                        }
                    />

                    <input
                        type="date"
                        className="border p-2"
                        value={form.date}
                        onChange={(e) =>
                            setForm({ ...form, date: e.target.value })
                        }
                    />

                    <button
                        className="bg-blue-600 text-white px-4 py-2 col-span-4"
                        onClick={() => {
                            if (
                                !form.description ||
                                !form.fp_delta ||
                                !form.date
                            )
                                return;

                            setChanges([
                                ...changes,
                                {
                                    id: Date.now(),
                                    description: form.description,
                                    fp_delta: Number(form.fp_delta),
                                    date: form.date,
                                },
                            ]);

                            setForm({
                                description: "",
                                fp_delta: "",
                                date: "",
                            });
                        }}
                    >
                        Tambah Perubahan
                    </button>
                </div>
                {/* TABEL */}
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
                        {changes.length > 0 ? (
                            changes.map((item, index) => (
                                <tr key={item.id}>
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
                                        {item.date}
                                    </td>
                                    <td className="border px-4 py-2 text-center">
                                        <button
                                            className="text-red-600 hover:underline"
                                            onClick={() =>
                                                setChanges(
                                                    changes.filter(
                                                        (c) => c.id !== item.id,
                                                    ),
                                                )
                                            }
                                        >
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
