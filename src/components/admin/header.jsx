import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserThunk } from "@/store/auth-slice";
import { SidebarTrigger } from "../ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useNavigate } from "react-router-dom";

const AdminHeader = ({ setOpen }) => {
  const { breadcrumb } = useSelector((state) => state.breadcrumb);
  const navigate = useNavigate();
  return (
    <header className="flex items-center justify-between w-full px-4 py-3 mb-4 border-b bg-background">
      <div className="flex items-center gap-x-4">
        <SidebarTrigger />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumb.map((section, index) => {
              if (index !== breadcrumb.length - 1) {
                return (
                  <div className="flex items-center gap-x-2" key={index}>
                    <BreadcrumbItem className="cursor-pointer">
                      <BreadcrumbLink onClick={() => navigate(section?.path)}>
                        {section?.label}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </div>
                );
              }
            })}
            <BreadcrumbItem>
              <BreadcrumbPage>
                {breadcrumb[breadcrumb.length - 1]?.label}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
        <AlignJustify size={24} />
        <span className="sr-only">Toggle Menu</span>
      </Button>
    </header>
  );
};

export default AdminHeader;
