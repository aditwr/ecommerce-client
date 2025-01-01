import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon, ShoppingCartIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "../ui/skeleton";
import { Separator } from "../ui/separator";
import { useToast } from "@/hooks/use-toast";
import { increaseCartProductQuantityThunk } from "@/store/shop/CartSlice";

function ShoppingCart() {
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();
  const dispatch = useDispatch();

  function handleIncreaseQuantity({ productId, quantity }) {
    dispatch(
      increaseCartProductQuantityThunk({
        userId: user.id,
        productId,
        quantity,
      }).then((response) => {
        console.log(response);
      })
    );
  }

  // Calculate subtotal price of products in cart
  let subtotal = 0;
  if (cart.products) {
    cart.products.map((product) => {
      subtotal += product.quantity * product.productId.salePrice;
    });
  }
  let shippingCost = 0;
  let total = subtotal + shippingCost;

  return (
    <Sheet className="w-full h-full">
      <SheetTrigger asChild>
        <Button className="relative" variant="outline" size="icon">
          <ShoppingCartIcon className="w-6 h-6" />
          <span className="sr-only">View cart</span>
          {cart.products?.length > 0 && (
            <span className="absolute w-5 h-5 text-white rounded-full bg-rose-600 -top-2 -right-2">
              {cart.products?.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetTitle className="flex items-center gap-3 mb-4">
          <span className="block p-3 rounded-full bg-secondary">
            <ShoppingCartIcon className="w-4 h-4" />
          </span>
          Shopping Cart
        </SheetTitle>
        <p className="mb-1 font-normal text-secondary-foreground text-md">
          {cart?.products?.length > 0
            ? `You have ${cart.products.length} items in your cart`
            : "Your cart is empty"}
        </p>
        <Separator />
        <div className="">
          <div className="h-[50vh] overflow-y-auto">
            {cart.products?.length > 0 ? (
              <ul className="grid gap-4 py-4">
                {cart.products.map((product, i) => (
                  <li
                    className="flex items-center justify-between gap-2"
                    key={product.productId._id ? product.productId._id : i}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={product.productId.image}
                        alt={product.productId.title}
                        className="object-cover rounded-lg w-14 h-14"
                      />
                      <div className="">
                        <h4 className="text-sm font-semibold line-clamp-1">
                          {product.productId.title}
                        </h4>
                        <p className="flex items-baseline text-sm text-gray-500">
                          {product.quantity} x $
                          {product.productId.salePrice ??
                            product.productId.price}{" "}
                          : &nbsp;
                          <span className="text-sm font-medium">
                            $
                            {product.quantity *
                              (product.productId.salePrice ??
                                product.productId.price)}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button className="w-8 h-8" variant="outline" size="icon">
                        <MinusIcon className="w-2 h-2" />
                      </Button>
                      <span>{product.quantity}</span>
                      <Button
                        className="w-8 h-8"
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          handleIncreaseQuantity({
                            productId: product.productId._id,
                            quantity: 1,
                          })
                        }
                      >
                        <PlusIcon className="w-2 h-2" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <Skeleton>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                    <div>
                      <div className="w-24 h-4 bg-gray-200 rounded"></div>
                      <div className="w-16 h-3 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                    <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                    <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                  </div>
                </div>
              </Skeleton>
            )}
          </div>
          <Separator className="mb-4" />
          <div className="relative overflow-hidden">
            <div className="flex flex-col w-full h-auto px-8 py-4 rounded-lg gap-y-2 bg-secondary">
              <div className="grid items-center justify-between grid-cols-3 gap-2">
                <span className="text-sm font-medium text-primary/70">
                  Subtotal
                </span>
                <span className="w-auto overflow-hidden text-muted-foreground">
                  ........................................
                </span>
                <span className="font-medium text-md text-primary/80">
                  {subtotal > 0 ? (
                    <span>
                      {subtotal.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </span>
                  ) : (
                    0
                  )}
                </span>
              </div>
              <div className="grid items-center justify-between grid-cols-3 gap-2">
                <span className="text-sm font-medium text-primary/70">
                  Shipping
                </span>
                <span className="w-auto overflow-hidden text-muted-foreground">
                  ........................................
                </span>
                <span className="font-medium text-md text-primary/80">
                  <span>
                    {shippingCost.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </span>
                </span>
              </div>
              <Separator className="" />
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-primary/70">
                  TOTAL
                </span>
                <span className="text-lg font-semibold">
                  {total > 0 ? (
                    <span>
                      {subtotal.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </span>
                  ) : (
                    0
                  )}
                </span>
              </div>
            </div>

            {/* decorative */}
            <span className="absolute left-0 block w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 bg-background"></span>
            <span className="absolute right-0 block w-8 h-8 translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 bg-background"></span>
          </div>
        </div>
        <SheetFooter className="flex flex-col gap-4 mt-4">
          <SheetClose asChild>
            <Button className="w-full">Checkout</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default ShoppingCart;
