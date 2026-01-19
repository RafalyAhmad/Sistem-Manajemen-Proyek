import Buttons from "@/Components/Buttons";

export default function TicketCard({ ticket, statusType, onAction }) {
    // Sesuaikan dengan struktur data backend Anda
    const { ticket_id, title, description, user, created_at } = ticket;

    const formatTanggal = (dateString) => {
        return new Date(dateString).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const StatusIcon = () => {
        if (statusType === "live")
            return (
                <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                    </svg>
                </div>
            );
        if (statusType === "approve")
            return (
                <div className="bg-green-100 p-3 rounded-full text-green-600">
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>
            );
        return (
            <div className="bg-red-100 p-3 rounded-full text-red-600">
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </div>
        );
    };

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col h-full">
            <div className="flex items-start gap-4 mb-4">
                <StatusIcon />
                <div className="flex-1 min-w-0">
                    <h4
                        className="text-lg font-bold text-gray-900 truncate"
                        title={title}
                    >
                        {title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                        {user?.name || "Unknown"} • {formatTanggal(created_at)}
                    </p>
                </div>
            </div>

            <div className="flex-1">
                <p className="text-sm text-gray-600 mb-6 line-clamp-3">
                    {description}
                </p>
            </div>

            <div className="mt-auto pt-4 border-t border-gray-50">
                {statusType === "live" ? (
                    <div className="flex gap-2">
                        <Buttons
                            onClick={() => onAction(ticket_id, "approve")}
                            variant="success"
                            className="flex-1 text-xs py-2 justify-center"
                        >
                            Terima
                        </Buttons>
                        <Buttons
                            onClick={() => onAction(ticket_id, "decline")}
                            variant="primary"
                            className="flex-1 text-xs py-2 justify-center bg-red-600 hover:bg-red-700 border-none"
                        >
                            Tolak
                        </Buttons>
                    </div>
                ) : (
                    <div
                        className={`text-center py-2 rounded-lg font-bold uppercase text-[10px] tracking-widest ${
                            statusType === "approve"
                                ? "bg-green-50 text-green-600"
                                : "bg-red-50 text-red-600"
                        }`}
                    >
                        {statusType === "approve" ? "Diterima" : "Ditolak"}
                    </div>
                )}
            </div>
        </div>
    );
}
