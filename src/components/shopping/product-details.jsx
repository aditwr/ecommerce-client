import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { ShoppingCartIcon, StarIcon } from "lucide-react";
import { Input } from "../ui/input";

function ProductDetailsDialog({ isOpen, setOpen, productDetails }) {
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="flex gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[60vw]">
        <div className="relative overflow-hidden bg-red-200 rounded-lg basis-6/12">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            className="object-cover w-full h-full"
            width={600}
            height={600}
          />
          <DialogTitle></DialogTitle>
        </div>
        <div className="grid gap-6 basis-6/12">
          <DialogHeader>
            <DialogTitle className="text-3xl font-extrabold">
              {productDetails?.title}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground ">
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
              <Separator className="my-5" />
              <div className="max-h-[300px] overflow-auto">
                <h2 className="mb-4 text-xl font-bold">Riviews</h2>
                <div className="grid gap-6">
                  {/* single riview */}
                  <div className="flex gap-4">
                    <Avatar className="w-8 h-8 border">
                      <AvatarFallback className="text-sm font-medium">
                        SM
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">Andrew Tate</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarIcon className="w-4 h-4 fill-primary" />
                        <StarIcon className="w-4 h-4 fill-primary" />
                        <StarIcon className="w-4 h-4 fill-primary" />
                        <StarIcon className="w-4 h-4 fill-primary" />
                        <StarIcon className="w-4 h-4 fill-primary" />
                      </div>
                      <p className="text-muted-foreground">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Praesentium ducimus iste neque repellendus veniam, unde
                        quos atque sint veritatis tempore?
                      </p>
                    </div>
                  </div>
                  {/* single riview */}
                  <div className="flex gap-4">
                    <Avatar className="w-8 h-8 border">
                      <AvatarFallback className="text-sm font-medium">
                        SM
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">Andrew Tate</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarIcon className="w-4 h-4 fill-primary" />
                        <StarIcon className="w-4 h-4 fill-primary" />
                        <StarIcon className="w-4 h-4 fill-primary" />
                        <StarIcon className="w-4 h-4 fill-seconary" />
                        <StarIcon className="w-4 h-4 fill-seconary" />
                      </div>
                      <p className="text-muted-foreground">
                        Lorem ipsum dolor sit amet consectetur.
                      </p>
                    </div>
                  </div>
                  {/* single riview */}
                  <div className="flex gap-4">
                    <Avatar className="w-8 h-8 border">
                      <AvatarFallback className="text-sm font-medium">
                        SM
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">Andrew Tate</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarIcon className="w-4 h-4 fill-primary" />
                        <StarIcon className="w-4 h-4 fill-primary" />
                        <StarIcon className="w-4 h-4 fill-primary" />
                        <StarIcon className="w-4 h-4 fill-primary" />
                        <StarIcon className="w-4 h-4 fill-secondary" />
                      </div>
                      <p className="text-muted-foreground">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Velit neque aliquam voluptatem!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="flex gap-2 mt-6">
                <Input type="text" placeholder="Write a review" />
                <Button>Submit</Button>
              </div> */}
            </div>
          </DialogHeader>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
