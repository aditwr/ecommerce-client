import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import AppSidebar from "./app-sidebar";
import AdminHeader from "./header";

function AdminSecondLayout() {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <main>
          <div className="">
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
