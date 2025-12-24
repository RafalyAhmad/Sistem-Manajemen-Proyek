import Buttons from "@/Components/Buttons";

export default function TicketCard({ ticket, statusType }) {
    const { title, description, sender, date } = ticket;

    // Icon status berdasarkan tipe
    const StatusIcon = () => {
        if (statusType === "live")
            return (
                <div className="bg-blue-100 p-3 rounded-full">
                    <svg
                        className="w-8 h-8 text-blue-600"
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
        if (statusType === "approved")
            return (
                <div className="bg-green-100 p-3 rounded-full">
                    <svg
                        className="w-8 h-8 text-green-600"
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
            // declined
            <div className="bg-red-100 p-3 rounded-full">
                <svg
                    className="w-8 h-8 text-red-600"
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
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col h-full">
            <div className="flex items-start gap-4 mb-4">
                <StatusIcon />
                <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900 leading-tight">
                        {title}
                    </h4>
                    <p className="text-xs text-gray-400 mt-1">
                        {sender} • {date}
                    </p>
                </div>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                    </svg>
                </a>
            </div>

            <div className="flex-1">
                <p className="text-sm text-gray-600 mb-6 line-clamp-3">
                    {description}
                </p>
            </div>

            {/* Aksi hanya muncul untuk Live Tickets */}
            {statusType === "live" ? (
                <div className="flex gap-2 mt-auto">
                    <Buttons variant="success" className="flex-1 text-sm py-2">
                        Approve
                    </Buttons>
                    <Buttons variant="primary" className="flex-1 text-sm py-2">
                        Decline
                    </Buttons>
                </div>
            ) : (
                <div
                    className={`mt-auto text-center py-2 rounded-lg font-bold uppercase text-xs tracking-widest ${
                        statusType === "approved"
                            ? "bg-green-50 text-green-600"
                            : "bg-red-50 text-red-600"
                    }`}
                >
                    {statusType}
                </div>
            )}
        </div>
    );
}
