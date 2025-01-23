import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logoutUserThunk } from "@/store/auth-slice";
import { SidebarTrigger } from "../ui/sidebar";

const AdminHeader = ({ setOpen }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUserThunk());
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b bg-background">
      <SidebarTrigger />
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
        <AlignJustify size={24} />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex justify-end flex-1">
        <Button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md shadow"
        >
          <LogOut size={24} />
          Logout
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
