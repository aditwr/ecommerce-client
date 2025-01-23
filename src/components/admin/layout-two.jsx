import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import AppSidebar from "./app-sidebar";
import AdminHeader from "./header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setBreadcrumb } from "@/store/breadcrumbSlice";

function AdminSecondLayout() {
  const { breadcrumb } = useSelector((state) => state.breadcrumb);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setBreadcrumb({
        level: 0,
        label: "Admin Panel",
        path: "/admin/dashboard",
      })
    );
  }, []);
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <div className="w-full">
            <AdminHeader setOpen={true} />
          </div>
          <div className="px-4">
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}

export default AdminSecondLayout;
