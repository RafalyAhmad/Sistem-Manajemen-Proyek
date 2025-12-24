import React from "react";

const Table = ({ columns, data, className = "" }) => {
    return (
        <div
            className={`overflow-x-auto bg-white rounded-lg shadow ${className}`}
        >
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                    <tr>
                        {columns.map((col, index) => (
                            <th
                                key={index}
                                scope="col"
                                className="px-6 py-3 font-semibold"
                            >
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((item, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className="bg-white border-b hover:bg-gray-50 transition-colors"
                            >
                                {columns.map((col, colIndex) => (
                                    <td
                                        key={colIndex}
                                        className="px-6 py-4 whitespace-nowrap text-gray-900"
                                    >
                                        {/* Jika ada fungsi render khusus untuk kolom (misal: tombol atau format tanggal) */}
                                        {col.render
                                            ? col.render(item)
                                            : item[col.key]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="px-6 py-10 text-center text-gray-400"
                            >
                                No data available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
