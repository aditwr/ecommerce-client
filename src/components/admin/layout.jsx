import { Outlet } from "react-router-dom";
import AdminSidebar from "./sidebar";
import AdminHeader from "./header";
import { useState } from "react";

const AdminLayout = () => {
  const [openMobileSidebar, setOpenMobileSidebar] = useState(false);

  return (
    <div className="flex w-full min-h-screen">
      {/* admin sidebar */}
      <AdminSidebar open={openMobileSidebar} setOpen={setOpenMobileSidebar} />
      <div className="flex flex-col flex-1">
        {/* admin header */}
        <AdminHeader setOpen={setOpenMobileSidebar} />
        <main className="flex flex-1 p-4 bg-muted/40 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
