import { Routes, Route, Router, Navigate, useNavigate } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin/layout";
import AdminDashboard from "./pages/admin/dashboard";
import AdminProducts from "./pages/admin/products";
import AdminOrders from "./pages/admin/orders";
import AdminFeatures from "./pages/admin/features";
import ShoppingLayout from "./components/shopping/layout";
import NotFound from "./pages/not-found";
import ShoppingHome from "./pages/shopping/home";
import ShoppingListing from "./pages/shopping/listing";
import ShoppingCheckout from "./pages/shopping/checkout";
import ShoppingAccount from "./pages/shopping/account";
import CheckAuth from "./components/common/check-auth";
import UnAuthPage from "./pages/unauth";
import { Toaster } from "./components/ui/toaster";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuthThunk } from "./store/auth-slice";
import { Skeleton } from "./components/ui/skeleton";
import { getCartDataThunk } from "./store/shop/CartSlice";
import { AuthenticatedUserProvider } from "./context/AuthenticatedUserContext";
import PaypalReturnPage from "./pages/shopping/paypal-return";
import PaymentSuccessPage from "./pages/shopping/payment-success";
import AdminSecondLayout from "./components/admin/layout-two";

function App() {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  // Check if user is authenticated with jwt token in cookies
  // If authenticated, decode the token and get user data
  // Store the user authenticated data in redux store
  useEffect(() => {
    dispatch(checkAuthThunk());
  }, []);

  // Get cart data of the user if authenticated from the server
  // store the cart data in redux store
  useEffect(() => {
    if (user?.role === "user") {
      dispatch(getCartDataThunk(user.id)).then((action) => {
        if (action?.payload?.success) {
          console.log(action?.payload?.message);
        } else {
          console.log(action?.payload?.message);
        }
      });
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-[80vh]">
        {/* spinner */}
        <div className="relative w-16 h-16 border rounded-full border-neutral-200">
          <span className="absolute block w-full h-full border-r-2 rounded-r-full border-neutral-400 animate-spin"></span>
        </div>
      </div>
    );
  }

  return (
    <>
      <AuthenticatedUserProvider authenticatedUser={user}>
        <div className="flex flex-col overflow-hidden bg-white">
          <Routes>
            <Route path="/" element={<RootPage />} />
            <Route
              path="/auth"
              element={
                <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                  <AuthLayout />
                </CheckAuth>
              }
            >
              <Route path="login" element={<AuthLogin />} />
              <Route path="register" element={<AuthRegister />} />
            </Route>
            <Route
              path="/admin"
              element={
                <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                  <AdminSecondLayout />
                </CheckAuth>
              }
            >
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="features" element={<AdminFeatures />} />
            </Route>
            <Route
              path="/shop"
              element={
                <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                  <ShoppingLayout />
                </CheckAuth>
              }
            >
              <Route path="home" element={<ShoppingHome />} />
              <Route path="listing" element={<ShoppingListing />} />
              <Route path="checkout" element={<ShoppingCheckout />} />
              <Route path="account" element={<ShoppingAccount />} />
              <Route path="paypal-return" element={<PaypalReturnPage />} />
              <Route path="payment-success" element={<PaymentSuccessPage />} />
            </Route>
            <Route path="unauth" element={<UnAuthPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </AuthenticatedUserProvider>
      <Toaster />
    </>
  );
}

function RootPage() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/shop/home");
      }
    } else {
      navigate("/auth/login");
    }
  }, [isAuthenticated]);

  return <div className="mt-2 mr-2">Redirecting...</div>;
}

export default App;
