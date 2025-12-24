export default function NotificationItem({ notification }) {
    const { title, message, sender, time, isUnread } = notification;

    return (
        <div className="relative bg-white border border-gray-200 rounded-lg p-5 shadow-sm mb-4 flex gap-4 transition-all hover:shadow-md">
            {/* Indikator Unread (Titik Oranye) */}
            {isUnread && (
                <div className="absolute top-2 left-2 w-3 h-3 bg-orange-500 rounded-full border-2 border-white shadow-sm" />
            )}

            {/* Placeholder untuk Gambar/Icon Notifikasi */}
            <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-md overflow-hidden border border-gray-200">
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                    {/* Kamu bisa ganti dengan <img> jika ada foto pengirim */}
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                </div>
            </div>

            {/* Konten Teks */}
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                    <h4
                        className={`text-lg font-bold ${
                            isUnread ? "text-gray-900" : "text-gray-700"
                        }`}
                    >
                        {title}
                    </h4>
                    {isUnread && (
                        <span className="bg-orange-100 text-orange-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                            Unread
                        </span>
                    )}
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                    {message}
                </p>
                <p className="text-xs text-gray-400 font-medium">
                    By {sender} • {time}
                </p>
            </div>
        </div>
    );
}
