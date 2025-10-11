import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/utils/cn";
import { SidebarSubmenu } from "./sidebarSubmenu";

export const SidebarLink = ({ link, collapsed }) => {
  const location = useLocation();
  const hasSubmenu = Array.isArray(link.submenu) && link.submenu.length > 0;
  const isAnySubActive =
    hasSubmenu && link.submenu.some((child) => location.pathname === child.path);

  return (
    <div className="w-full">
      <NavLink
        to={link.path}
        className={cn(
          "sidebar-item",
          collapsed && "md:w-[45px]",
          isAnySubActive &&
            !collapsed &&
            "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white"
        )}
        onClick={(e) => {
          if (hasSubmenu && (!link.path || link.path === "#")) e.preventDefault();
          if (link.onClick) link.onClick();
        }}
      >
        {link.icon && <link.icon size={22} className="flex-shrink-0" />}
        {!collapsed && <p className="whitespace-nowrap">{link.label}</p>}
      </NavLink>

      {!collapsed && hasSubmenu && <SidebarSubmenu submenu={link.submenu} />}
    </div>
  );
};
