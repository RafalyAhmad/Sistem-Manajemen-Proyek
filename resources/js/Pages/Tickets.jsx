import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import TicketCard from "@/Components/TicketCard";
import BasicInput from "@/Components/BasicInput";

export default function Tickets() {
    const ticketData = {
        live: [
            {
                id: 1,
                title: "+ Fitur Z",
                sender: "Client A",
                date: "1 day left",
                description:
                    "Pengajuan penambahan modul pembayaran otomatis menggunakan gateway lokal untuk mempercepat proses transaksi.",
            },
        ],
        approved: [
            {
                id: 2,
                title: "- Fitur X",
                sender: "Manager B",
                date: "2 days ago",
                description:
                    "Penghapusan fitur legacy chat karena sudah digantikan oleh integrasi Slack yang baru.",
            },
        ],
        declined: [
            {
                id: 3,
                title: "+ Fitur Y",
                sender: "Dev C",
                date: "5 days ago",
                description:
                    "Pengajuan fitur dark mode otomatis berdasarkan waktu sistem user.",
            },
        ],
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row items-start justify-between w-full gap-4">
                    <h2 className="text-2xl font-semibold leading-tight text-gray-800">
                        Tickets
                    </h2>
                    <BasicInput
                        placeholder="Cari Project..."
                        className="w-full sm:max-w-xs"
                    />
                </div>
            }
        >
            <Head title="Tickets" />

            <div className="space-y-6">
                {/* Section Live */}
                <section>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        <span className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></span>
                        Live Tickets
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {ticketData.live.map((t) => (
                            <TicketCard
                                key={t.id}
                                ticket={t}
                                statusType="live"
                            />
                        ))}
                    </div>
                </section>

                {/* Section Approved */}
                <section>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        Approved Tickets
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-80">
                        {ticketData.approved.map((t) => (
                            <TicketCard
                                key={t.id}
                                ticket={t}
                                statusType="approved"
                            />
                        ))}
                    </div>
                </section>

                {/* Section Declined */}
                <section>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        Declined Tickets
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-80">
                        {ticketData.declined.map((t) => (
                            <TicketCard
                                key={t.id}
                                ticket={t}
                                statusType="declined"
                            />
                        ))}
                    </div>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
