import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Fragment, useEffect, useState } from "react";
import { addNewAddressFormControls } from "@/config/shop-form";
import CustomForm from "@/components/common/custom-form";
import { addAddress, deleteAddress, getAddress } from "@/utils/address-utils";
import { useToast } from "@/hooks/use-toast";
import { TrashIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import noDataImg from "@/assets/common/no-data.svg";
import { useSelector } from "react-redux";

function AddressSection() {
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    userId: user?.id || "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phoneNumber: "",
    deliveryInstructions: "",
  });
  const [addressList, setAddressList] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    getAddress(user?.id)
      .then((res) => {
        if (res.success) {
          setAddressList(res.data);
        }
      })
      .catch((error) => {
        console.log("getAddress error: ", error);
      });
  }, [user]);

  useEffect(() => {
    // Check if all fields are filled
    const inputsFilled = Object.values(formData).every((val) => val !== "");
    if (inputsFilled) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [formData]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await addAddress({ ...formData });
      if (result?.success) {
        setDialogOpen(false);
        setFormData({
          address: "",
          city: "",
          postalCode: "",
          country: "",
          phoneNumber: "",
          deliveryInstructions: "",
        });
        toast({
          title: result.message,
        });

        const addresses = await getAddress(user?.id);
        if (addresses?.success) {
          setAddressList(addresses.data);
        }
      }
    } catch (error) {
      console.log("addNewAddress Error front-end: ", error);
      toast({
        title: error.message,
        variant: "destructive",
      });
    }
  }

  async function handleDelete(addressId) {
    try {
      const result = await deleteAddress({ addressId, userId: user?.id });
      if (result?.success) {
        const addresses = await getAddress(user?.id);
        if (addresses?.success) {
          setAddressList(addresses.data);
        }
        toast({
          title: result.message,
        });
      }
    } catch (error) {
      console.log("deleteAddress Error front-end: ", error);
      toast({
        title: error.message,
        variant: "destructive",
      });
    }
  }

  return (
    <Fragment>
      <div className="p-4 border rounded-md">
        <div className="flex items-baseline w-full jusitfy-center">
          <div className="order-2">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="text-xs">
                  Add New Address
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-base">
                    Add New Address
                  </DialogTitle>
                  <DialogDescription>
                    Add a new address for delivery
                  </DialogDescription>
                </DialogHeader>
                <div className="">
                  <CustomForm
                    formControls={addNewAddressFormControls}
                    formData={formData}
                    setFormData={setFormData}
                    handleSubmit={handleSubmit}
                    buttonText="Save Address"
                    canSubmit={canSubmit}
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="order-1 w-full">
            <h2 className="text-lg font-semibold">Saved Addresses</h2>
          </div>
        </div>
        <div className="">
          {addressList.length > 0 ? (
            <div className="">
              {addressList.map((address) => (
                <div
                  key={address._id}
                  className="flex justify-between w-full p-4 my-2 border rounded-md"
                >
                  <div className="">
                    <span className="block font-medium">{address.address}</span>
                    <div className="grid items-center grid-cols-4">
                      <span className="col-span-2">
                        {address.city}, {address.postalCode}, {address.country}
                      </span>
                      <span>{address.phoneNumber}</span>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <TrashIcon size={16} />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Address</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this address?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(address._id)}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-[400px] flex justify-center items-center">
              <div className="space-y-3">
                <div className="flex justify-center w-full h-28">
                  <img
                    src={noDataImg}
                    alt="no data image"
                    className="object-contain h-full"
                  />
                </div>
                <h3 className="text-sm font-medium text-neutral-600">
                  Your shipping address is empty!
                </h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default AddressSection;
