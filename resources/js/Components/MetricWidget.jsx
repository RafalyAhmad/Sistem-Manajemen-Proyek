import Widget from "./Widget";

export default function MetricWidget({ title, value, icon, className = "" }) {
    return (
        <Widget className={className}>
            <div className="flex flex-col justify-between h-full">
                {/* Judul dan Ikon (Jika ada) */}
                <div className="flex justify-between items-start">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                        {title}
                    </h3>
                    {icon}
                </div>

                {/* Nilai Metrik */}
                <p className="mt-4 text-3xl font-bold text-gray-900">{value}</p>
            </div>
        </Widget>
    );
}
