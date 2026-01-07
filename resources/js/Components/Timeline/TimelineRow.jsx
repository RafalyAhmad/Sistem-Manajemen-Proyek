export default function TimelineRow({ row }) {
    return (
        <div className="w-[320px] shrink-0 border-r px-4 h-[44px] flex items-center text-sm">
            <div className="grid grid-cols-3 gap-2 w-full">
                <div className="font-medium truncate">{row.name}</div>
                <div className="text-gray-600 truncate">{row.status}</div>
                <div className="text-gray-500 truncate text-right">
                    {row.duration}
                </div>
            </div>
        </div>
    );
}
