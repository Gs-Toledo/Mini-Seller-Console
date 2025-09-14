import { type ReactNode } from "react";

interface TabsProps {
  children: ReactNode;
}
export const Tabs = ({ children }: TabsProps) => (
  <div className="border-b border-gray-700">
    <nav className="-mb-px flex space-x-6" aria-label="Tabs">
      {children}
    </nav>
  </div>
);

interface TabProps {
  children: ReactNode;
  isActive: boolean;
  onClick: () => void;
}
export const Tab = ({ children, isActive, onClick }: TabProps) => {
  const activeClasses = "border-blue-500 text-blue-400";
  const inactiveClasses =
    "border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500";

  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-150 ${
        isActive ? activeClasses : inactiveClasses
      }`}
    >
      {children}
    </button>
  );
};
