export default function Widget({ children, className = "", title = null }) {
    return (
        // Wrapper utama yang memberikan tampilan Card/Widget
        <div
            className={`
            bg-white 
            shadow-md
            rounded-md 
            overflow-hidden 
            ${className}
        `}
        >
            {/* Opsi: Judul Card (Jika diperlukan untuk Chart/Table) */}
            {title && (
                <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800">
                        {title}
                    </h3>
                </div>
            )}

            {/* Konten Utama (Berupa children, bisa diisi angka, chart, atau tabel) */}
            <div className="p-4">{children}</div>
        </div>
    );
}
