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
  const { toast } = useToast();

  const handleAddProductToCart = ({ userId, productId, quantity }) => {
    dispatch(addProductToCartThunk({ userId, productId, quantity }))
      .then(() => {
        toast({
          title: "Product added to cart",
          description: "Check your cart to view the product",
          type: "success",
        });
      })
      .then(() => dispatch(getCartDataThunk(userId)));
  };

  return (
    <Card
      onClick={() => handleGetProductDetails(product._id)}
      className="w-full h-full max-w-sm mz-auto"
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
              onClick={(e) => {
                e.stopPropagation();
                handleAddProductToCart({
                  userId: user.id,
                  productId: product._id,
                  quantity: 1,
                });
              }}
              variant="secondary"
              className="shadow"
              size="sm"
            >
              <ShoppingCartIcon className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <h2 className="mb-2 text-xl font-semibold">{product?.title}</h2>
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
          <div className="flex items-center gap-2 mb-2">
            {product?.salePrice > 0 && (
              <span className="text-2xl font-semibold text-primary">
                ${product?.salePrice}
              </span>
            )}
            <span
              className={`text-lg font-semibold ${
                product?.salePrice > 0
                  ? "line-through text-muted-foreground"
                  : "text-primary"
              }`}
            >
              ${product?.price}
            </span>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

export default ShoppingProductCard;
