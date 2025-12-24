export default function Tabs({ tabs, activeTab, onTabChange }) {
    return (
        <div className="flex gap-4 mb-2 border-b border-gray-100">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`pb-4 text-md font-medium transition-all relative ${
                        activeTab === tab.id
                            ? "text-gray-900"
                            : "text-gray-400 hover:text-gray-600"
                    }`}
                >
                    {tab.label}
                    {activeTab === tab.id && (
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-[#db2727] rounded-b-full" />
                    )}
                </button>
            ))}
        </div>
    );
}
