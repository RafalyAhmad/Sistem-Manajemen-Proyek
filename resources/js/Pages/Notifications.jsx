import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import NotificationItem from "@/Components/NotificationItem";
import Tabs from "@/Components/Tabs";
import BasicInput from "@/Components/BasicInput";

export default function Notifications() {
    const [activeTab, setActiveTab] = useState("all");

    const tabs = [
        { id: "all", label: "All" },
        { id: "unread", label: "Unread" },
    ];

    const dummyNotifications = [
        {
            id: 1,
            title: "Notification 1",
            message:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus euismod euismod nunc, in consequat magna...",
            sender: "X",
            time: "1 day ago",
            isUnread: true,
        },
        {
            id: 2,
            title: "Notification 1",
            message:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus euismod euismod nunc, in consequat magna...",
            sender: "X",
            time: "1 day ago",
            isUnread: true,
        },
        {
            id: 3,
            title: "Notification 1",
            message:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus euismod euismod nunc, in consequat magna...",
            sender: "X",
            time: "1 day ago",
            isUnread: false,
        },
        {
            id: 4,
            title: "Notification 1",
            message:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus euismod euismod nunc, in consequat magna...",
            sender: "X",
            time: "1 day ago",
            isUnread: false,
        },
        {
            id: 5,
            title: "Notification 1",
            message:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus euismod euismod nunc, in consequat magna...",
            sender: "X",
            time: "1 day ago",
            isUnread: false,
        },
    ];

    // Filter notifikasi berdasarkan Tab
    const filteredNotifications =
        activeTab === "unread"
            ? dummyNotifications.filter((n) => n.isUnread)
            : dummyNotifications;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-6 w-full">
                    <h2 className="text-2xl font-semibold leading-tight text-gray-800">
                        Notifications
                    </h2>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                        <Tabs
                            tabs={tabs}
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                        />
                        <BasicInput
                            placeholder="Search notification..."
                            className="w-full sm:max-w-sm"
                        />
                    </div>
                </div>
            }
        >
            <Head title="Notifications" />

            <div className="">
                {filteredNotifications.length > 0 ? (
                    filteredNotifications.map((notification) => (
                        <NotificationItem
                            key={notification.id}
                            notification={notification}
                        />
                    ))
                ) : (
                    <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300 text-gray-400">
                        No notifications found.
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
