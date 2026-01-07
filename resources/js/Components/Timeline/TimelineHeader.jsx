export default function TimelineHeader({ title, range, unitLabel }) {
    return (
        <div className="border-b bg-gray-50">
            <div className="px-4 py-2 font-semibold">{title}</div>

            <div className="overflow-x-auto">
                <div
                    className="flex min-w-max"
                    style={{ width: 320 + range * 100 }}
                >
                    <div className="w-[320px] shrink-0 border-r px-4 py-2 text-sm font-medium">
                        Feature / Status / Duration
                    </div>

                    {Array.from({ length: range }).map((_, i) => (
                        <div
                            key={i}
                            className="w-[100px] text-center text-xs border-l py-2"
                        >
                            {unitLabel} {i + 1}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
