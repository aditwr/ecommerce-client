import fakeProfilePic from "@/assets/common/profile-pic.jpg";
import profileBanner from "@/assets/common/profile-banner.jpg";
import { useAuthenticatedUser } from "@/context/AuthenticatedUserContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPinIcon, ShoppingBagIcon, UserRoundCogIcon } from "lucide-react";
import AccountProfile from "@/components/shopping/account/account-profile";
import AddressSection from "@/components/shopping/address/address";
import ShoppingOrdersIndex from "./orders";

const ShoppingAccount = () => {
  const user = useAuthenticatedUser();
  // console.log(user);

  return (
    <div className="container px-4 pb-20 mx-auto mt-20">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Account</h1>
      </div>
      {/* Banner */}
      <div className="absolute left-0 z-0 w-full h-[200px] bg-red-300">
        <img
          src={profileBanner}
          alt="Profile Banner"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Profile */}
      <div className="relative z-10 flex items-center justify-center h-[200px]">
        <div className="flex flex-col items-center w-full gap-1">
          <div className="relative z-10 w-32 h-32 overflow-hidden border-4 border-white rounded-full">
            <img
              src={fakeProfilePic}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="space-y-1 text-center text-white">
            <h2 className="px-2 text-xl font-bold rounded-full bg-foreground/50">
              {user?.userName}
            </h2>
            <h5 className="px-2 text-sm font-medium rounded-full bg-foreground/50 text-background/100">
              {user?.email}
            </h5>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-8">
        <Tabs defaultValue="orders" className="w-[800px] mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="orders" className="space-x-2">
              <ShoppingBagIcon size={16} className="text-primary" />
              <span className="">Orders</span>
            </TabsTrigger>
            <TabsTrigger value="address" className="space-x-2">
              <MapPinIcon size={16} className="text-primary" />
              <span className="">Address</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="space-x-2">
              <UserRoundCogIcon size={16} className="text-primary" />
              <span className="">Profile</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="orders">
            <ShoppingOrdersIndex />
          </TabsContent>
          <TabsContent value="address">
            <AddressSection />
          </TabsContent>
          <TabsContent value="profile">
            <div className="p-4 border rounded-md">
              <AccountProfile user={user} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ShoppingAccount;
