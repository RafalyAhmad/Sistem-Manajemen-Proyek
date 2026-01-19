import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import NotificationItem from "@/Components/NotificationItem";
import Tabs from "@/Components/Tabs";
import BasicInput from "@/Components/BasicInput";

export default function Notifications({ notifications = [] }) {
    const [activeTab, setActiveTab] = useState("all");
    const [search, setSearch] = useState("");

    const tabs = [
        { id: "all", label: "All" },
        { id: "unread", label: "Unread" },
    ];

    const filteredNotifications = notifications.filter((notification) => {
        const matchTab =
            activeTab === "unread" ? notification.status === "unread" : true;

        const matchSearch = notification.message
            ?.toLowerCase()
            .includes(search.toLowerCase());

        return matchTab && matchSearch;
    });

    const markAsRead = (id) => {
        router.put(`/notifications/${id}/read`);
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-6 w-full">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Notifications
                    </h2>

                    <div className="flex flex-col sm:flex-row gap-4 justify-between">
                        <Tabs
                            tabs={tabs}
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                        />

                        <BasicInput
                            placeholder="Search notification..."
                            className="w-full sm:max-w-sm"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            }
        >
            <Head title="Notifications" />

            <div className="space-y-3">
                {filteredNotifications.length > 0 ? (
                    filteredNotifications.map((notification) => (
                        <NotificationItem
                            key={notification.notification_id}
                            notification={notification}
                            onClick={() =>
                                markAsRead(notification.notification_id)
                            }
                        />
                    ))
                ) : (
                    <div className="text-center py-20 bg-white rounded-lg border border-dashed text-gray-400">
                        No notifications found.
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
