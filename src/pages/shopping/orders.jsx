import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getOrdersByUserId } from "@/store/shop/OrderSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BoxIcon, PhoneIcon, SquareArrowOutUpRightIcon } from "lucide-react";

function ShoppingOrdersIndex() {
  const { user } = useSelector((state) => state.auth);
  const { orders } = useSelector((state) => state.shopOrder);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // get the orders of this user
  useEffect(() => {
    if (user) {
      dispatch(getOrdersByUserId(user.id)).then((action) => {
        // console.log("action", action);
      });
    }
  }, []);

  return (
    <div className="p-4 border rounded-md">
      <div className="flex items-baseline w-full jusitfy-center">
        <h2 className="text-lg font-semibold">Orders</h2>
        <span className="ml-auto text-sm text-primary">View All</span>
      </div>
      <div className="">
        {orders.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Order ID</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Order Status</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>See Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell className="text-xs font-medium">
                    {order._id}
                  </TableCell>
                  <TableCell className="flex gap-y-0.5 flex-col text-sm text-foreground/70">
                    <span className="">
                      {new Date(order.orderDate).toDateString()}
                    </span>
                    <span className="text-xs font-medium">
                      {new Date(order.orderDate).toLocaleTimeString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    {order.orderStatus == "confirmed" ? (
                      <Badge className="text-green-900 bg-green-300 hover:bg-green-300">
                        Confirmed
                      </Badge>
                    ) : order.orderStatus == "pending" ? (
                      <Badge className="text-yellow-900 bg-yellow-300 hover:bg-yellow-300">
                        Pending
                      </Badge>
                    ) : order.orderStatus == "cancelled" ? (
                      <Badge className="text-red-900 bg-red-300 hover:bg-red-300">
                        Cancelled
                      </Badge>
                    ) : null}
                  </TableCell>
                  <TableCell>
                    {order.paymentStatus == "paid" ? (
                      <Badge className="text-green-900 bg-green-300 hover:bg-green-300">
                        Paid
                      </Badge>
                    ) : order.paymentStatus == "pending" ? (
                      <Badge className="text-yellow-900 bg-yellow-300 hover:bg-yellow-300">
                        Pending
                      </Badge>
                    ) : order.paymentStatus == "cancelled" ? (
                      <Badge className="text-red-900 bg-red-300 hover:bg-red-300">
                        Cancelled
                      </Badge>
                    ) : null}
                  </TableCell>
                  <TableCell className="font-semibold text-right">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(order.totalAmount)}
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger>
                        <Button size="icon">
                          <SquareArrowOutUpRightIcon size={16} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Order Details</DialogTitle>
                          <DialogDescription>
                            <div className=""></div>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="w-full h-[50vh] flex justify-center items-center">
            <h2 className="text-lg font-semibold text-gray-500">
              No Orders Found
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShoppingOrdersIndex;
