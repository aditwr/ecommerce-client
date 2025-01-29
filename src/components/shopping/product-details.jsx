import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { ShoppingCartIcon, StarIcon } from "lucide-react";
import RiviewProduct from "./riview";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRiviews } from "@/store/shop/RiviewSlice";
import {
  addProductToCartThunk,
  getCartDataThunk,
} from "@/store/shop/CartSlice";
import { useToast } from "@/hooks/use-toast";

function ProductDetailsDialog({ isOpen, setOpen, productDetails }) {
  const { product, isLoading } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const [productRiviews, setProductRiviews] = useState([]);
  const dispatch = useDispatch();
  const [averateRating, setAverageRating] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    setAverageRating(0);
    if (productDetails?._id) {
      dispatch(fetchRiviews({ productId: productDetails?._id })).then(
        (action) => {
          if (action?.payload?.success) {
            setProductRiviews(action.payload.riviews);
          }
        }
      );
    }
  }, [productDetails]);

  useEffect(() => {
    if (productRiviews.length > 0) {
      const totalRating = productRiviews.reduce((acc, item) => {
        return acc + item.rating;
      }, 0);
      setAverageRating(totalRating / productRiviews.length);
    }
  }, [productRiviews]);

  const handleAddProductToCart = ({
    userId,
    productId,
    quantity,
    totalStock,
  }) => {
    // cart.products & productId
    if (cart?.products && cart?.products.length > 0) {
      let productInCart = cart.products.find(
        (product) => product.productId._id === productId
      );
      if (productInCart) {
        const currentQtyInCart = productInCart?.quantity;
        if (currentQtyInCart === totalStock) {
          toast({
            title: `Only ${totalStock} Pcs in stock, you can't add more`,
          });
          return; // Exit the function
        }
      }
    }

    dispatch(addProductToCartThunk({ userId, productId, quantity }))
      .then(() => {
        toast({
          title: "Product added to cart",
          description: "Check your cart to view the product",
        });
      })
      .then(() => dispatch(getCartDataThunk(userId)));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="flex w-full gap-8 max-w-[90vw] sm:max-w-[90vw] lg:max-w-[700px]">
        <div className="grid basis-6/12">
          <DialogHeader className={`flex flex-col gap-2`}>
            <div className="h-64 overflow-hidden rounded-md aspect-square">
              <img
                src={productDetails?.image}
                alt={productDetails?.title}
                className="object-cover w-full h-full aspect-square"
                width={600}
                height={600}
              />
            </div>
            <DialogTitle className="text-xl font-bold">
              {productDetails?.title}
            </DialogTitle>
            <DialogDescription className="text-sm text-neutral-800">
              {productDetails?.description}
            </DialogDescription>
            <div className="">
              <div className="flex flex-col gap-y-2">
                {/* rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <StarIcon
                        key={index}
                        className={`w-4 h-4 ${
                          index <= Math.floor(averateRating) - 1
                            ? "fill-primary"
                            : ""
                        }`}
                      />
                    ))}
                  </div>
                  <span className=" text-md text-neutral-900">
                    <span className="font-medium">
                      {averateRating.toFixed(1)}
                    </span>{" "}
                    <span className="text-sm text-neutral-700">
                      ({productRiviews.length} reviews)
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-6">
                  {productDetails?.salePrice > 0 && (
                    <span className="text-2xl font-semibold text-primary">
                      ${productDetails?.salePrice}
                    </span>
                  )}
                  <span
                    className={`text-2xl font-semibold ${
                      productDetails?.salePrice > 0
                        ? "line-through text-muted-foreground"
                        : "text-primary"
                    }`}
                  >
                    {productDetails?.salePrice > 0 ? (
                      <span className="text-xl italic font-normal">
                        ${productDetails?.price}
                      </span>
                    ) : (
                      <span>${productDetails?.price}</span>
                    )}
                  </span>
                </div>

                <div className="flex gap-x-2">
                  <Button
                    {...{ disabled: product?.totalStock === 0 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddProductToCart({
                        userId: user.id,
                        productId: product?._id,
                        quantity: 1,
                        totalStock: product?.totalStock,
                      });
                    }}
                    className="flex w-full"
                  >
                    <ShoppingCartIcon className="w-6 h-6" />
                    Add to Shopping Cart
                  </Button>
                </div>
              </div>
            </div>
          </DialogHeader>
        </div>
        <RiviewProduct
          productId={productDetails?._id}
          wrapperClass="relative h-[600px] flex flex-col rounded-lg basis-6/12"
        />
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
