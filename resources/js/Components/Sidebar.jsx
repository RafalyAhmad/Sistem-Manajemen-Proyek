import NavLink from "@/Components/NavLink";

// Komponen untuk Item dengan counter/badge
const SidebarItem = ({ href, active, children, count, icon }) => (
    <NavLink
        href={href}
        active={active}
        className={`flex items-center justify-between w-full pt-1 pb-1 text-sm rounded-sm 
                    ${
                        active
                            ? "text-[#db2727] font-semibold" // Styling jika aktif
                            : "text-gray-500 hover:text-gray-800 hover:bg-gray-200" // Styling jika tidak aktif
                    }`}
    >
        <div className="flex items-center space-x-2">
            {icon}
            <span>{children}</span>
        </div>
        {count && (
            <span className="bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                {count}
            </span>
        )}
    </NavLink>
);

// Komponen untuk Header Menu (Settings, Project Management)
const SidebarSection = ({ title, children }) => (
    <div className="mb-6">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            {title}
        </h3>
        <div className="space-y-1">{children}</div>
    </div>
);

export default function Sidebar({ showing, toggle }) {
    const HomeIcon = (props) => (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.44.75-.44 1.19 0L21.75 12M4.5 9.75v10.5h15v-10.5"
            />
        </svg>
    );
    const ProjectsIcon = (props) => (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m7.875 14.25 1.214 1.942a2.25 2.25 0 0 0 1.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 0 1 1.872 1.002l.164.246a2.25 2.25 0 0 0 1.872 1.002h2.092a2.25 2.25 0 0 0 1.872-1.002l.164-.246A2.25 2.25 0 0 1 16.954 9h4.636M2.41 9a2.25 2.25 0 0 0-.16.832V12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 0 1 .382-.632l3.285-3.832a2.25 2.25 0 0 1 1.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0 0 21.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 0 0 2.25 2.25Z"
            />
        </svg>
    );
    const NotificationsIcon = (props) => (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
            />
        </svg>
    );
    const UsersIcon = (props) => (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
            />
        </svg>
    );
    const GeneralSettingsIcon = (props) => (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
            />
        </svg>
    );
    const TicketsIcon = (props) => (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
            />
        </svg>
    );

    return (
        // Default (Mobile): Geser ke kiri (-translate-x-full)
        // Desktop (sm ke atas): Selalu tampil (translate-x-0)
        // Mobile (jika showing=true): Tampil (translate-x-0)
        <div
            className={`fixed top-16 bottom-0 w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto z-20 transition-transform duration-300 ease-in-out -translate-x-full sm:translate-x-0 ${
                showing ? "translate-x-0" : ""
            }
        `}
        >
            {/* Menu Utama */}
            <SidebarSection title="General">
                <SidebarItem
                    href={route("dashboard")}
                    active={route().current("dashboard")}
                    icon={<HomeIcon />}
                >
                    Dashboard
                </SidebarItem>
                <SidebarItem
                    href={route("profile.edit")}
                    active={route().current("profile.edit")}
                    icon={<ProjectsIcon />}
                >
                    Projects
                </SidebarItem>
                <SidebarItem
                    href={route("notifications")}
                    active={route().current("notifications")}
                    icon={<NotificationsIcon />}
                >
                    Notifications
                </SidebarItem>
            </SidebarSection>

            {/* Bagian Settings */}
            <SidebarSection title="Settings">
                <SidebarItem
                    href={route("profile.edit")}
                    active={route().current("profile.edit")}
                    icon={<ProjectsIcon />}
                >
                    Projects
                </SidebarItem>
                <SidebarItem
                    href={route("users")}
                    active={route().current("users")}
                    icon={<UsersIcon />}
                >
                    Users
                </SidebarItem>
                <SidebarItem
                    href={route("settings")}
                    active={route().current("settings")}
                    icon={<GeneralSettingsIcon />}
                >
                    General Settings
                </SidebarItem>
            </SidebarSection>

            {/* Bagian Project Management */}
            <SidebarSection title="Project Management">
                <SidebarItem
                    href={route("profile.edit")}
                    active={route().current("profile.edit")}
                    icon={<ProjectsIcon />}
                >
                    Projects
                </SidebarItem>
                <SidebarItem
                    href={route("tickets")}
                    active={route().current("tickets")}
                    icon={<TicketsIcon />}
                >
                    Tickets
                </SidebarItem>
            </SidebarSection>
        </div>
    );
}
