import { NavLink } from "react-router-dom";
import { cn } from "@/utils/cn";

export const SidebarSubmenu = ({ submenu }) => (
  <div className="ml-6 flex flex-col gap-1 pt-1">
    {submenu.map((child) => (
      <NavLink
        key={child.label}
        to={child.path}
        className={({ isActive }) =>
          cn(
            "sidebar-item flex items-center rounded px-3 py-1 text-sm transition-colors",
            "hover:text-slate-900 dark:hover:text-white",
            isActive
              ? "bg-slate-100 font-medium text-slate-900 dark:bg-slate-800 dark:text-white"
              : "text-slate-600 dark:text-slate-300"
          )
        }
      >
        {child.icon && <child.icon size={18} className="mr-2" />}
        {child.label}
      </NavLink>
    ))}
  </div>
);
