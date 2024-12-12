import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();

  // if user is not authenticated and try to access any page other than login or register
  // redirect to login page
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  // if user is authenticated and try to access login or register page
  if (isAuthenticated && location.pathname.includes("/auth")) {
    return user?.role === "admin" ? (
      // if user is admin then redirect to admin dashboard
      <Navigate to="/admin/dashboard" />
    ) : (
      // if user is not admin then redirect to shop home page
      <Navigate to="/shop/home" />
    );
  }

  // if user is authenticated (not admin) and try to access admin pages
  // redirect to unauthorized page
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("/admin")
  ) {
    return <Navigate to="/unauth" />;
  }

  // if user is authenticated and admin and try to access shop pages
  // redirect to admin dashboard
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("/shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return children;
};

export default CheckAuth;
