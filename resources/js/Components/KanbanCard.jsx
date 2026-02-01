import { Draggable } from "@hello-pangea/dnd";
import { Link } from "@inertiajs/react";

export default function KanbanCard({ feature, index, project_id, onDelete }) {
    return (
        <Draggable
            draggableId={`${feature.feature_id}-${feature.pivot.added_type}`}
            index={index}
        >
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-3 hover:shadow-md transition-shadow group relative"
                >
                    <div className="flex justify-between items-start mb-2">
                        <span
                            className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                                feature.pivot.added_type === "baseline"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-green-100 text-green-700"
                            }`}
                        >
                            {feature.pivot.added_type}
                        </span>

                        <button
                            onClick={() =>
                                onDelete(
                                    feature.feature_id,
                                    feature.pivot.added_type,
                                )
                            }
                            className="text-gray-300 hover:text-red-500 transition-colors p-1"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                            </svg>
                        </button>
                    </div>

                    <h4 className="text-sm font-semibold text-gray-800 mb-3">
                        {feature.feature_name}
                    </h4>

                    <div className="flex justify-end">
                        <Link
                            href={route("project.board.show", {
                                project: project_id,
                                feature: feature.feature_id,
                            })}
                            className="text-xs text-blue-600 hover:underline font-medium"
                        >
                            See Detail →
                        </Link>
                    </div>
                </div>
            )}
        </Draggable>
    );
}
