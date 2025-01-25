import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { Button } from "../ui/button";
import { ShoppingCartIcon, StarIcon } from "lucide-react";
import RiviewProduct from "./riview";

function ProductDetailsDialog({ isOpen, setOpen, productDetails }) {
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="flex w-full gap-8 max-w-[90vw] sm:max-w-[90vw] lg:max-w-[700px]">
        <div className="grid basis-6/12">
          <DialogHeader className={`flex flex-col gap-2`}>
            <div className="w-full h-64 overflow-hidden rounded-md">
              <img
                src={productDetails?.image}
                alt={productDetails?.title}
                className="object-cover w-full h-full"
                width={600}
                height={600}
              />
            </div>
            <DialogTitle className="text-xl font-bold">
              {productDetails?.title}
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              {productDetails?.description}
            </DialogDescription>
            <div className="">
              <div className="flex flex-col gap-y-2">
                {/* rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-4 h-4 fill-primary" />
                    <StarIcon className="w-4 h-4 fill-primary" />
                    <StarIcon className="w-4 h-4 fill-primary" />
                    <StarIcon className="w-4 h-4 fill-primary" />
                    <StarIcon className="w-4 h-4 fill-secondary" />
                  </div>
                  <span className="font-medium text-md text-muted-foreground">
                    (4.5)
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
                    variant="secondary"
                    className="flex w-full basis-4/12"
                  >
                    <ShoppingCartIcon className="w-6 h-6" />
                    Add to Cart
                  </Button>
                  <Button className="w-full basis-8/12">Checkout</Button>
                </div>
              </div>
            </div>
          </DialogHeader>
        </div>
        <RiviewProduct
          productId={productDetails?._id}
          wrapperClass="relative h-[80vh] flex flex-col rounded-lg basis-6/12"
        />
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
