import TimelineHeader from "./TimelineHeader";
import TimelineRow from "./TimelineRow";
import TimelineBar from "./TimelineBar";

export default function TimelineContainer({ data }) {
    return (
        <div className="w-full bg-white border rounded overflow-hidden">
            <TimelineHeader
                title={data.title}
                range={data.range}
                unitLabel={data.unitLabel}
            />

            <div className="overflow-x-auto">
                <div
                    className="min-w-max"
                    style={{ width: 320 + data.range * 100 }}
                >
                    {data.rows.map((row) => (
                        <div
                            key={row.id}
                            className="flex border-b last:border-b-0"
                        >
                            <TimelineRow row={row} />
                            <TimelineBar row={row} range={data.range} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
