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
import { Button } from "@/components/ui/button";
import {
  ArrowUpDownIcon,
  BoxIcon,
  PhoneIcon,
  SquareArrowOutUpRightIcon,
} from "lucide-react";
import ShoppingOrderDetails from "@/components/shopping/account/order-details";
import Pagination from "@/components/common/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
} from "@/components/ui/dropdown-menu";
import noDataImg from "@/assets/common/no-data.svg";
import { orderListSortOptions } from "@/config";

function ShoppingOrdersIndex() {
  const { user } = useSelector((state) => state.auth);
  const { orders } = useSelector((state) => state.shopOrder);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [sort, setSort] = useState("newest");

  // get the orders of this user
  useEffect(() => {
    if (user) {
      dispatch(getOrdersByUserId({ userId: user.id, page, limit, sort })).then(
        (action) => {
          if (action?.payload?.success) {
            let totalPages = Math.ceil(action?.payload?.countDocuments / limit);
            setTotalPages(totalPages);
          }
        }
      );
    }
  }, [dispatch, user, page, sort, totalPages, limit]);

  function handleSort(value) {
    setSort(value);
  }

  return (
    <div className="p-4 border rounded-md">
      <div className="flex items-baseline w-full jusitfy-center">
        <h2 className="text-lg font-semibold">Orders</h2>
        <div className="ml-auto text-sm text-primary">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <ArrowUpDownIcon className="w-4 h-4" />
                <span className="">
                  {orderListSortOptions.map(
                    (sortItem) => sortItem.id === sort && sortItem.label
                  )}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuRadioGroup
                value={sort}
                onValueChange={(value) => handleSort(value)}
              >
                {orderListSortOptions.map((sortItem) => (
                  <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>
                    {sortItem.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="">
        {orders.length > 0 ? (
          <div className="" key={orders._id}>
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
                      <Badge
                        {...(order?.orderStatus === "delivered"
                          ? {
                              className:
                                "text-green-900 bg-green-300 hover:bg-green-300",
                            }
                          : order?.orderStatus === "cancelled"
                          ? {
                              className:
                                "text-red-900 bg-red-300 hover:bg-red-300",
                            }
                          : { variant: "secondary" })}
                      >
                        {order?.orderStatus}
                      </Badge>
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
                      <ShoppingOrderDetails order={order} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* pagination */}
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(page) => setPage(page)}
            />
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
                Your orders is empty!
              </h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShoppingOrdersIndex;
