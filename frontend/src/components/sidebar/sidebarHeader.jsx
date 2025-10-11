import logoLight from "@/assets/logo-light.svg";
import logoDark from "@/assets/logo-dark.svg";

export const SidebarHeader = ({ collapsed }) => (
  <div className="flex gap-x-3 p-3 items-center">
    <img src={logoLight} alt="Logo" className="dark:hidden" />
    <img src={logoDark} alt="Logo" className="hidden dark:block" />
    {!collapsed && (
      <p className="text-lg font-medium text-slate-900 dark:text-slate-50">
        Dashboard
      </p>
    )}
  </div>
);
