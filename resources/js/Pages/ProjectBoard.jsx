import Widget from "@/Components/Widget";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import KanbanCard from "@/Components/KanbanCard";
import { useState, useEffect } from "react";
import { router, Head } from "@inertiajs/react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

export default function ProjectBoard({ project, projects, features }) {
    const [showForm, setShowForm] = useState(false);
    const [featureId, setFeatureId] = useState("");

    const columnConfig = [
        { id: "to_do", title: "To Do", color: "#EF4444" },
        { id: "in_progress", title: "In Progress", color: "#F59E0B" },
        { id: "done", title: "Done", color: "#10B981" },
    ];

    const handleChangeProject = (e) => {
        router.get(
            route("project.board"),
            { project_id: e.target.value },
            { preserveState: true },
        );
    };

    const submit = () => {
        router.post(
            route("project.board.add", project.project_id),
            { feature_id: featureId },
            {
                onSuccess: () => {
                    setShowForm(false);
                    setFeatureId("");
                },
            },
        );
    };

    const onDragEnd = (result) => {
        const { destination, draggableId } = result;
        if (!destination) return;

        // Cek apakah kolom berubah
        if (destination.droppableId !== result.source.droppableId) {
            updateStatus(draggableId, destination.droppableId);
        }
    };

    const updateStatus = (fId, status) => {
        router.patch(
            route("project.board.update-status", {
                project: project.project_id,
                feature: fId,
            }),
            { status },
            { preserveScroll: true },
        );
    };

    const deleteFeature = (fId) => {
        if (confirm("Yakin ingin menghapus fitur ini?")) {
            router.delete(
                route("project.board.destroy", {
                    project: project.project_id,
                    feature: fId,
                }),
                { preserveScroll: true },
            );
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Project Board" />
            <Widget>
                {/* Header & Filter Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Pilih Project
                        </label>
                        <select
                            className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 w-full md:w-64"
                            value={project?.project_id || ""}
                            onChange={handleChangeProject}
                        >
                            {projects.map((p) => (
                                <option key={p.project_id} value={p.project_id}>
                                    {p.project_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                        {showForm ? "× Batal" : "+ Tambah Fitur"}
                    </button>
                </div>

                {showForm && (
                    <div className="mb-6 p-4 bg-blue-50 rounded-lg flex gap-2 animate-in fade-in slide-in-from-top-2">
                        <select
                            className="border-gray-300 rounded-md flex-1"
                            value={featureId}
                            onChange={(e) => setFeatureId(e.target.value)}
                        >
                            <option value="">-- Pilih Fitur Baru --</option>
                            {features?.map((f) => (
                                <option key={f.feature_id} value={f.feature_id}>
                                    {f.feature_name}
                                </option>
                            ))}
                        </select>
                        <button
                            onClick={submit}
                            className="bg-green-600 text-white px-6 py-2 rounded-md disabled:opacity-50"
                            disabled={!featureId}
                        >
                            Simpan
                        </button>
                    </div>
                )}

                {/* Project Info Panel */}
                {project && (
                    <div className="bg-gray-50 p-6 rounded-xl mb-8 border border-gray-100">
                        <h1 className="text-2xl font-bold text-gray-900">
                            {project.project_name}
                        </h1>
                        <p className="text-gray-600 mt-1 mb-4">
                            {project.description}
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            <StatBox
                                label="Initial Fee"
                                value={project.initial_project_fee}
                            />
                            <StatBox
                                label="Final Fee"
                                value={project.final_project_fee}
                            />
                            <StatBox
                                label="Initial Time"
                                value={project.initial_project_time}
                            />
                            <StatBox
                                label="Total CFP"
                                value={project.total_cfp}
                            />
                            <StatBox
                                label="Status"
                                value={project.status}
                                isBadge
                            />
                        </div>
                    </div>
                )}

                {/* Kanban Board Section */}
                <div className="mt-8">
                    <div className="overflow-x-auto pb-6">
                        <DragDropContext onDragEnd={onDragEnd}>
                            <div className="flex gap-4 w-max">
                                {columnConfig.map((col) => (
                                    <div
                                        key={col.id}
                                        className="w-[280px] sm:w-[320px] md:w-[350px] flex-shrink-0 bg-gray-100/60 rounded-xl p-4 border border-gray-200 flex flex-col min-h-[500px]"
                                    >
                                        {/* Header Kolom */}
                                        <div className="flex items-center gap-2 mb-4">
                                            <div
                                                className="h-3 w-3 rounded-full"
                                                style={{
                                                    backgroundColor: col.color,
                                                }}
                                            />
                                            <h3 className="font-bold text-gray-700 uppercase text-xs tracking-wider">
                                                {col.title}
                                            </h3>
                                            <span className="ml-auto bg-gray-200 text-gray-600 text-[10px] px-2 py-0.5 rounded-full font-bold">
                                                {project?.features?.filter(
                                                    (f) =>
                                                        f.pivot.status ===
                                                        col.id,
                                                ).length || 0}
                                            </span>
                                        </div>

                                        {/* Droppable Area */}
                                        <Droppable droppableId={col.id}>
                                            {(provided, snapshot) => (
                                                <div
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                    className={`flex-1 transition-colors rounded-lg ${snapshot.isDraggingOver ? "bg-blue-50/50" : ""}`}
                                                >
                                                    {project?.features
                                                        ?.filter(
                                                            (f) =>
                                                                f.pivot
                                                                    .status ===
                                                                col.id,
                                                        )
                                                        .map(
                                                            (
                                                                feature,
                                                                index,
                                                            ) => (
                                                                <KanbanCard
                                                                    key={
                                                                        feature.feature_id
                                                                    }
                                                                    feature={
                                                                        feature
                                                                    }
                                                                    index={
                                                                        index
                                                                    }
                                                                    project_id={
                                                                        project.project_id
                                                                    }
                                                                    onDelete={
                                                                        deleteFeature
                                                                    }
                                                                />
                                                            ),
                                                        )}
                                                    {provided.placeholder}
                                                </div>
                                            )}
                                        </Droppable>
                                    </div>
                                ))}
                            </div>
                        </DragDropContext>
                    </div>
                </div>
            </Widget>
        </AuthenticatedLayout>
    );
}

// Sub-komponen kecil untuk info project agar rapi
function StatBox({ label, value, isBadge }) {
    return (
        <div>
            <div className="text-[10px] uppercase font-bold text-gray-400">
                {label}
            </div>
            <div
                className={`text-sm font-semibold ${isBadge ? "text-blue-600" : "text-gray-700"}`}
            >
                {value || "-"}
            </div>
        </div>
    );
}
