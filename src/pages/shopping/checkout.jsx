import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { getAddress } from "@/utils/address-utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

import { Button } from "@/components/ui/button";
import { BoxIcon, PhoneIcon } from "lucide-react";
import { createNewOrder } from "@/store/shop/OrderSlice";
import { useNavigate } from "react-router-dom";

const ShoppingCheckout = () => {
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const [addresses, setAddresses] = useState([]);
  const [openAddressDialog, setOpenAddressDialog] = useState(false);
  const { toast } = useToast();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [total, setTotal] = useState(0);
  const [canOrder, setCanOrder] = useState(false);
  const [isPaymentStarted, setIsPaymentStarted] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [addressShippingIsEmpty, setAddressShippingIsEmpty] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let shippingPrice = 10;

  useEffect(() => {
    try {
      getAddress().then((res) => {
        setAddresses(res.data);
        setAddressShippingIsEmpty(res?.data?.length === 0);
      });
    } catch (error) {
      toast({
        title: error.message,
      });
    }
  }, []);

  useEffect(() => {
    if (selectedAddress !== null) {
      setCanOrder(true);
    } else {
      setCanOrder(false);
    }
  }, [selectedAddress]);

  function calculateSubTotal() {
    let total = 0;
    cart?.products?.forEach((product) => {
      let productDetail = product.productId;
      total += productDetail.salePrice
        ? productDetail.salePrice * product.quantity
        : productDetail.price * product.quantity;
    });
    return total;
  }

  function handleInitialPaypalPayment() {
    setProcessingPayment(true);
    const products = cart.products.map((product) => {
      let productDetail = product.productId;
      return {
        productId: productDetail._id,
        title: productDetail.title,
        image: productDetail.image,
        price: productDetail.salePrice ?? productDetail.price,
        quantity: product.quantity,
        description: productDetail.description,
      };
    });
    const address = {
      address: selectedAddress.address,
      city: selectedAddress.city,
      country: selectedAddress.country,
      postalCode: selectedAddress.postalCode,
      phoneNumber: selectedAddress.phoneNumber,
      deliveryInstructions: selectedAddress.deliveryInstructions ?? "",
    };
    const orderData = {
      user: user,
      products: products,
      cart: cart._id,
      address: address,
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: (calculateSubTotal() + shippingPrice).toFixed(2),
      subTotal: calculateSubTotal().toFixed(2),
      shippingPrice: shippingPrice.toFixed(2),
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "none",
      payerId: "none",
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        setIsPaymentStarted(true);
      } else {
        setIsPaymentStarted(false);
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  if (isPaymentStarted) {
    window.location.href = approvalURL;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="mb-4 text-2xl font-bold">Checkout</h1>
      <div className="container flex justify-center mx-auto mt-20">
        <div className="grid w-[80vw] grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-5">
          <div className="md:col-span-2 xl:col-span-3">
            <div className="p-4 px-6 bg-white border rounded-md">
              <div className="mb-4 ">
                <h1 className="text-xl font-semibold">Checkout Products</h1>
                <div className="py-2">
                  {cart?.products?.map((product) => {
                    let productDetail = product.productId;
                    return (
                      <div
                        key={productDetail._id}
                        className="p-3 my-2 border rounded-md"
                      >
                        <div className="flex justify-between w-full">
                          <div className="flex items-center w-full space-x-4">
                            <div className="w-16 h-16 overflow-hidden bg-red-100 rounded">
                              <img
                                src={productDetail.image}
                                alt={productDetail.title}
                                className="w-full h-full aspect-square"
                              />
                            </div>
                            <div className="space-y-1">
                              <h1 className="text-base font-semibold line-clamp-1">
                                {productDetail.title}
                              </h1>
                              <div className="">
                                <Badge>{product.quantity} pcs</Badge>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center pr-4">
                            <h1 className="text-lg font-semibold">
                              {productDetail.salePrice ??
                                productDetail.price * product.quantity}
                              $
                            </h1>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="">
                <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                  <h1 className="text-xl font-semibold">Shipping Address</h1>
                  <div className="mb-4">
                    <Dialog
                      open={openAddressDialog}
                      onOpenChange={setOpenAddressDialog}
                    >
                      <DialogTrigger>
                        <Button variant="secondary">
                          Select Shipping Address
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Choose Shipping Address</DialogTitle>
                          <DialogDescription>
                            <div className="pt-4 space-y-2 max-h-[80vh] overflow-y-auto">
                              {addresses.map((address) => {
                                return (
                                  <div
                                    key={address._id}
                                    className="p-3 border rounded-md"
                                  >
                                    <div className="flex justify-between w-full">
                                      <div className="space-y-1">
                                        <h1 className="text-base font-semibold">
                                          {address.fullName}
                                        </h1>
                                        <p className="text-sm">
                                          {address.address}, {address.city},{" "}
                                          {address.country}
                                        </p>
                                      </div>
                                      <div>
                                        <Button
                                          onClick={() => {
                                            setSelectedAddress(address);
                                            setOpenAddressDialog(false);
                                          }}
                                        >
                                          Select
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <div className="">
                  <div className="">
                    {selectedAddress !== null ? (
                      <div className="p-3 border rounded-md">
                        <div className="space-y-1">
                          <h1 className="text-base font-semibold">
                            {selectedAddress.address}, {selectedAddress.city},{" "}
                            {selectedAddress.country}
                          </h1>
                          <div className="flex gap-x-4">
                            <div className="flex items-center text-sm gap-x-2">
                              <PhoneIcon className="w-3 h-3" />{" "}
                              {selectedAddress.phoneNumber}
                            </div>
                            <div className="flex items-center text-sm gap-x-2">
                              <BoxIcon className="w-3 h-3" />{" "}
                              {selectedAddress.postalCode}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-1 xl:col-span-2">
            <div className="p-4 px-6 bg-white border rounded-md">
              <h1 className="mb-2 text-xl font-semibold">Order Summary</h1>
              <div className="py-2 space-y-3">
                <div className="">
                  <div className="flex justify-between">
                    <h1 className="text-base">Subtotal</h1>
                    <h1 className="text-base font-medium">
                      {calculateSubTotal()}$
                    </h1>
                  </div>
                  <Separator />
                </div>
                <div className="">
                  <div className="flex justify-between">
                    <h1 className="text-base">Shipping</h1>
                    <h1 className="text-base font-medium">{shippingPrice}$</h1>
                  </div>
                  <Separator />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between">
                  <h1 className="text-lg font-medium">Total</h1>
                  <h1 className="text-xl font-semibold">
                    {calculateSubTotal() + shippingPrice}$
                  </h1>
                </div>
                <Separator />
              </div>
              <div className="flex justify-between mt-6">
                <Button
                  {...{ disabled: !canOrder }}
                  onClick={handleInitialPaypalPayment}
                  className="w-full"
                >
                  {processingPayment ? (
                    <div className="flex items-center justify-center w-full h-full gap-x-3">
                      <span className="block w-5 h-5 border-b-2 border-white rounded-full animate-spin"></span>
                      Processing Payment...
                    </div>
                  ) : (
                    "Pay with Paypal"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Address Shipping Empty Alert Dialog */}
      <AlertDialog open={addressShippingIsEmpty}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Add Your Shipping Address</AlertDialogTitle>
            <AlertDialogDescription>
              Your shipping address is empty. You need to add at least 1
              shipping address to continue purchase.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => navigate("/shop/account?activeTab=address")}
              variant="secondary"
            >
              Go to add address
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ShoppingCheckout;
