import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  PhoneIcon,
  Signpost,
  SignpostIcon,
  SquareArrowOutUpRightIcon,
} from "lucide-react";

function AdminOrderDetails({ order }) {
  return (
    <Dialog className="text-foreground">
      <DialogTrigger>
        <Button size="icon">
          <SquareArrowOutUpRightIcon size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
          <DialogDescription className="overflow-y-auto">
            <div className="text-foreground">
              {/* product list */}
              <div className="mt-4">
                <h2 className="mb-2 text-sm font-semibold text-foreground/90">
                  Ordered Products
                </h2>
                <div className="p-4 border border-gray-400 rounded-md">
                  <div className="flex flex-col overflow-y-auto max-h-40 gap-y-4">
                    {order.products.map((product) => (
                      <div
                        key={product?._id}
                        className="grid items-center grid-cols-8 gap-x-3"
                      >
                        <div className="col-span-1">
                          <div className="h-full overflow-hidden border border-gray-400 rounded-md aspect-square">
                            <img
                              src={product?.image}
                              alt={product?.title}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        </div>
                        <div className="flex items-center justify-between col-span-6">
                          <div className="w-full space-y-2">
                            <h3 className="text-xs font-medium text-foreground">
                              {product?.title}
                            </h3>
                            <div className="flex justify-between w-full">
                              <div className="flex gap-x-2">
                                <Badge
                                  variant="secondary"
                                  size="icon"
                                  className={"text-xs font-medium"}
                                >
                                  ${product?.price}
                                </Badge>
                                <Badge variant="outline" size="icon">
                                  {product?.quantity + " Pcs"}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <span>
                            <Badge>${product?.quantity * product?.price}</Badge>
                          </span>
                        </div>
                        <div className="col-span-1">
                          <Button variant="secondary" size="icon">
                            <SquareArrowOutUpRightIcon size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <h2 className="mb-2 text-sm font-semibold text-foreground/90">
                  Order Info
                </h2>
                <div className="p-4 border border-gray-400 rounded-md ">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2">
                    <div className="col-span-1">
                      <table className="">
                        <tr className="h-8 align-middle">
                          <td className="w-32 text-xs font-medium">
                            Ordered by
                          </td>
                          <td>:</td>
                          <td className="px-1 text-xs font-medium rounded">
                            <span className="line-clamp-1">
                              {order?.user?.email}
                            </span>
                          </td>
                        </tr>
                        <tr className="h-8 align-middle">
                          <td className="w-32 text-xs font-medium">Order ID</td>
                          <td>:</td>
                          <td className="px-1 text-xs font-medium rounded">
                            <span className="line-clamp-1">{order?._id}</span>
                          </td>
                        </tr>
                        <tr className="h-8 align-middle">
                          <td className="w-32 text-xs font-medium">
                            Order Status
                          </td>
                          <td>:</td>
                          <td className="px-1 text-xs font-medium rounded">
                            <Badge className="bg-green-200 text-green-950 hover:bg-green-200">
                              {order?.orderStatus}
                            </Badge>
                          </td>
                        </tr>
                        <tr className="h-8 align-middle">
                          <td className="w-32 text-xs font-medium">
                            Total Amount
                          </td>
                          <td>:</td>
                          <td className="px-1 text-xs font-medium rounded">
                            <Badge>${order?.totalAmount.toFixed(2)}</Badge>
                          </td>
                        </tr>
                        <tr className="h-8 align-middle">
                          <td className="w-32 text-xs font-medium">Pay Via</td>
                          <td>:</td>
                          <td className="px-1 text-xs font-medium rounded">
                            Paypal
                          </td>
                        </tr>
                        <tr className="h-8 align-middle">
                          <td className="w-32 text-xs font-medium">Status</td>
                          <td>:</td>
                          <td className="px-1 text-xs font-medium rounded">
                            <Badge className="bg-green-200 text-green-950 hover:bg-green-200">
                              {order?.paymentStatus}
                            </Badge>
                          </td>
                        </tr>
                      </table>
                    </div>
                    <div className="col-span-1 pl-2 border-l border-gray-300">
                      <table className="w-full ">
                        <tr className="w-full h-8 align-middle">
                          <td width={180} className="text-xs font-medium">
                            Order Date
                          </td>
                          <td>:</td>
                          <td className="px-1 text-xs font-medium rounded">
                            {/* date format Monday, 12 Jan 2024 */}
                            {new Date(order?.orderDate).toDateString()}
                          </td>
                        </tr>
                        <tr className="w-full h-8 align-middle">
                          <td className="text-xs font-medium">Payment ID</td>
                          <td>:</td>
                          <td className="px-1 text-xs font-medium rounded">
                            <p className="line-clamp-1">{order?.paymentId}</p>
                          </td>
                        </tr>
                        <tr className="w-full h-8 align-middle">
                          <td className="text-xs font-medium">Payer ID</td>
                          <td>:</td>
                          <td className="px-1 text-xs font-medium rounded">
                            {order?.payerId}
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <h2 className="mb-2 text-sm font-semibold text-foreground/90">
                  Shipping Address
                </h2>
                <div className="p-4 border border-gray-400 rounded-md ">
                  <div className="space-y-2">
                    <p className="">
                      {`${order?.address?.address}, ${order?.address?.city}, ${order?.address?.country}`}
                    </p>
                    <div className="flex">
                      <p className="text-foreground">
                        <Badge
                          className="flex items-center text-xs gap-x-2 "
                          variant="secondary"
                          size="icon"
                        >
                          <PhoneIcon size={12} />
                          {order?.address?.phoneNumber}
                        </Badge>
                      </p>
                      <p className="flex text-xs gap-x-2 ">
                        <Badge
                          className="flex items-center gap-x-2"
                          variant="outline"
                          size="icon"
                        >
                          <SignpostIcon size={12} />
                          <span>{order?.address?.postalCode}</span>
                        </Badge>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default AdminOrderDetails;
