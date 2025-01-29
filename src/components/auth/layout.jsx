import { Outlet } from "react-router-dom";
import banner1 from "@/assets/hero-banner/banner1.jpg";
import banner2 from "@/assets/hero-banner/banner2.jpg";
import banner3 from "@/assets/hero-banner/banner3.jpg";
import { useEffect, useState } from "react";

const AuthLayout = () => {
  const banners = [banner1, banner2, banner3];
  const [currentBanner, setCurrentBanner] = useState(0);

  // Change banner every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      <div className="flex w-full min-h-screen">
        <div className="relative items-center justify-center hidden w-1/2 px-12 bg-black lg:flex">
          <div className="absolute z-20 max-w-md space-y-6 text-center text-primary-foreground">
            <h1 className="text-4xl font-extrabold tracking-tight">
              Welcome to{" "}
              <span className="text-neutral-950 font-pattaya">Lunora</span>{" "}
              Fashion Store
            </h1>
          </div>

          {/* banner */}
          <div className="absolute w-full h-full">
            {banners.map((banner, index) => (
              <div
                key={index}
                className="absolute top-0 left-0 flex justify-center w-full h-full "
              >
                <img
                  src={banner}
                  alt={`banner-${index}`}
                  className={`object-cover w-full h-full transition-opacity duration-1000 ${
                    index === currentBanner ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center flex-1 px-4 py-12 bg-background sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
