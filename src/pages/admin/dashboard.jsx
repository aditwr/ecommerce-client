import { setBreadcrumb } from "@/store/breadcrumbSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminDashboard = () => {
  const { breadcrumb } = useSelector((state) => state.breadcrumb);
  const dispatch = useDispatch();

  useEffect(() => {
    // set breadcrumb
    dispatch(
      setBreadcrumb({ level: 1, label: "Dashboard", path: "/admin/dashboard" })
    );
    console.log("breadcrumb when dashboard loaded : ", breadcrumb);
  }, []);

  return <div>admin dashboard</div>;
};

export default AdminDashboard;
