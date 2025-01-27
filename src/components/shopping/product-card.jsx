import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { shoppingProductFilterOptions } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToCartThunk,
  getCartDataThunk,
} from "@/store/shop/CartSlice";
import { Button } from "../ui/button";
import { ShoppingCartIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function ShoppingProductCard({ product, handleGetProductDetails = () => {} }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const { toast } = useToast();

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
    <Card
      onClick={() => handleGetProductDetails(product._id)}
      className="w-full h-full max-w-sm p-0 mz-auto"
    >
      <div className="">
        <CardHeader className="relative p-0">
          <img
            src={product?.image}
            alt={product?.title}
            className="object-cover w-full h-auto rounded-t-lg aspect-square"
          />
          {product?.salePrice > 0 && (
            <Badge className="absolute bg-red-500 top-2 left-2 hover:bg-red-600">
              Sale
            </Badge>
          )}
          <div className="absolute top-2 right-2">
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
              variant="secondary"
              className="shadow hover:bg-gray-800 hover:text-white transtition"
              size="sm"
            >
              <ShoppingCartIcon className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-3 lg:p-4">
          <h2 className="mb-2 text-base font-semibold 2xl:text-lg">
            {product?.title}
          </h2>
          <div className="flex items-center justify-start gap-2 mb-2">
            <span className="text-sm text-muted-foreground">
              <Badge>
                {shoppingProductFilterOptions.category.map((category) => {
                  if (category.id === product?.category) {
                    return category.label;
                  }
                })}
              </Badge>
            </span>
            <span className="text-sm text-muted-foreground">
              <Badge variant="secondary">
                {shoppingProductFilterOptions.brand.map((brand) => {
                  if (brand.id === product?.brand) {
                    return brand.label;
                  }
                })}
              </Badge>
            </span>
          </div>
          <div className="flex items-center gap-x-4">
            {product?.salePrice > 0 ? (
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl font-semibold 2xl:text-2xl text-primary">
                  ${product?.salePrice}
                </span>
                <span
                  className={`text-md font-normal line-through text-muted-foreground`}
                >
                  ${product?.price}
                </span>
              </div>
            ) : (
              <span className="text-xl font-semibold 2xl:text-2xl text-primary">
                ${product?.price}
              </span>
            )}
            <div className="flex items-center">
              {product?.totalStock > 0 ? (
                <Badge variant="outline" className="line-clamp-1">
                  {product?.totalStock} Pcs in stock
                </Badge>
              ) : (
                <Badge variant="destructive">Out of stock</Badge>
              )}
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

export default ShoppingProductCard;
