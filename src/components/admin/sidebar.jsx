import { ChartNoAxesCombined } from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { BadgeCheck, LayoutDashboard, ShoppingBasket } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

export const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard size={24} />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket size={24} />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck size={24} />,
  },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();
  return (
    <nav className="flex flex-col gap-2 mt-8">
      {adminSidebarMenuItems.map((menu) => {
        return (
          <div
            key={menu.id}
            onClick={() => {
              navigate(menu.path);
              // setOpen(false);
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            {menu.icon}
            <h1>{menu.label}</h1>
          </div>
        );
      })}
    </nav>
  );
}

const AdminSidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mb-5">
                <ChartNoAxesCombined size={28} />
                <span className="font-extrabold text-md">Admin Panel</span>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="flex-col hidden w-64 p-6 border-r bg-background lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <ChartNoAxesCombined size={28} />
          <span className="text-xl font-extrabold">Admin Panel</span>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
};

export default AdminSidebar;
