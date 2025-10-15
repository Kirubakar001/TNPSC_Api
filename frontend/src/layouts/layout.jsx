import { Outlet } from "react-router-dom";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useClickOutside } from "@/hooks/use-click-outside";
import { Sidebar } from "../components/sidebar/index";
import { Header } from "../components/header";
import { cn } from "@/utils/cn";
import { useEffect, useRef, useState } from "react";

const Layout = () => {
  const isDesktopDevice = useMediaQuery("(min-width: 768px)");
  const [collapsed, setCollapsed] = useState(!isDesktopDevice);

  const sidebarRef = useRef(null);

  // Update collapsed state when resizing
  useEffect(() => {
    setCollapsed(!isDesktopDevice);
  }, [isDesktopDevice]);

  // Close sidebar on mobile when clicking outside
  useClickOutside([sidebarRef], () => {
    if (!isDesktopDevice && !collapsed) {
      setCollapsed(true);
    }
  });

  return (
    <div className="min-h-screen bg-slate-100 transition-colors dark:bg-slate-950 flex">
      {/* Overlay for mobile sidebar */}
      <div
        className={cn(
          "pointer-events-none fixed inset-0 bg-black opacity-0 transition-opacity duration-300",
          !collapsed && "pointer-events-auto z-40 opacity-30 md:hidden"
        )}
      />

      {/* Sidebar */}
      <Sidebar ref={sidebarRef} collapsed={collapsed} />

      {/* Main Content */}
      <div
        className={cn(
          "flex-1 flex flex-col transition-margin duration-300",
          collapsed ? "md:ml-[70px]" : "md:ml-[240px]"
        )}
      >
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
