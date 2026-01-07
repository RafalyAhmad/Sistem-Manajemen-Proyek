export default function TimelineBar({ row, range }) {
    const left = ((row.start - 1) / range) * 100;
    const width = ((row.end - row.start + 1) / range) * 100;

    return (
        <div className="relative h-[44px] flex-1">
            <div
                className="absolute top-1/2 -translate-y-1/2 h-5 rounded bg-gray-300"
                style={{
                    left: `${left}%`,
                    width: `${width}%`,
                }}
            >
                <div
                    className="h-full rounded bg-[#db2727]"
                    style={{ width: `${row.progress}%` }}
                />
            </div>
        </div>
    );
}
