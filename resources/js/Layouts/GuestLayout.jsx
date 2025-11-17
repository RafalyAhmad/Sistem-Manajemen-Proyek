export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            {/* Menghapus semua div logo, shadow, dan max-width. 
                 GuestLayout HANYA untuk background dan center screen.
             */}
            {children}
        </div>
    );
}
