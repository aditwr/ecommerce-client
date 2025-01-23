import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  BadgeCheck,
  BadgeCheckIcon,
  ChevronsUpDownIcon,
  LayoutDashboard,
  LayoutDashboardIcon,
  ShoppingBagIcon,
  ShoppingBasket,
  ShoppingBasketIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AvatarFallback, Avatar, AvatarImage } from "../ui/avatar";
import { useSelector } from "react-redux";
import profilePic from "@/assets/common/profile-pic.jpg";

const adminSidebarMenuItems = [
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

function AppSidebar() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-center h-8 gap-2">
          <ShoppingBagIcon size={24} />
          <h1 className="font-semibold">Admin Panel</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminSidebarMenuItems.map((menu) => (
                <SidebarMenuItem key={menu.id} className="hover:cursor-pointer">
                  <SidebarMenuButton
                    onClick={() => navigate(menu.path)}
                    asChild
                  >
                    <span>
                      {menu.icon}
                      {menu.label}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-gray-200 gap-x-2">
                <Avatar className="w-8 h-8 rounded">
                  <AvatarImage
                    src={profilePic}
                    className="object-cover"
                    alt={user.email}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start flex-grow ">
                  <span className="text-sm font-semibold">{user.userName}</span>
                  <span className="text-xs font-medium text-gray-500">
                    {user.email}
                  </span>
                </div>
                <div className="flex items-center">
                  <ChevronsUpDownIcon size={16} />
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" side="right">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Log out
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
