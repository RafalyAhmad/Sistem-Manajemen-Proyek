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
                    href={route("profile.edit")}
                    active={route().current("profile.edit")}
                    icon={<ProjectsIcon />}
                >
                    Projects
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
                    href={route("profile.edit")}
                    active={route().current("profile.edit")}
                    icon={<ProjectsIcon />}
                >
                    Projects
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
                    href={route("profile.edit")}
                    active={route().current("profile.edit")}
                    icon={<ProjectsIcon />}
                >
                    Projects
                </SidebarItem>
            </SidebarSection>
        </div>
    );
}
