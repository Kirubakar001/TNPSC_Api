import { cn } from "@/utils/cn";
import { SidebarLink } from "./SidebarLink";

export const SidebarGroup = ({ group, collapsed }) => (
  <nav
    className={cn("sidebar-group", collapsed && "md:items-center")}
  >
    <p className={cn("sidebar-group-title", collapsed && "md:w-[45px]")}>
      {group.title}
    </p>

    {group.links.map((link) => (
      <SidebarLink key={link.label} link={link} collapsed={collapsed} />
    ))}
  </nav>
);
