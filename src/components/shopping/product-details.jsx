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
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";

function ProductDetailsDialog({ isOpen, setOpen, productDetails }) {
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            className="object-cover w-full aspect-square"
            width={600}
            height={600}
          />
        </div>
        <DialogTitle></DialogTitle>
        <div className="grid gap-6">
          <DialogHeader>
            <DialogTitle className="text-3xl font-extrabold">
              {productDetails?.title}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground ">
              {productDetails?.description}
            </DialogDescription>
            <div className="flex items-center justify-between mb-6">
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
                ${productDetails?.price}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                <StarIcon className="w-4 h-4 fill-primary" />
                <StarIcon className="w-4 h-4 fill-primary" />
                <StarIcon className="w-4 h-4 fill-primary" />
                <StarIcon className="w-4 h-4 fill-primary" />
                <StarIcon className="w-4 h-4 fill-primary" />
              </div>
              <span className="text-lg font-medium text-muted-foreground">
                (4.5)
              </span>
            </div>
            <div className="mt-5">
              <Button className="w-full">Add to Cart</Button>
            </div>
            <Separator />
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
                      This is an awesome products
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
                      <StarIcon className="w-4 h-4 fill-primary" />
                    </div>
                    <p className="text-muted-foreground">
                      This is an awesome products
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
                      <StarIcon className="w-4 h-4 fill-primary" />
                    </div>
                    <p className="text-muted-foreground">
                      This is an awesome products
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <Input type="text" placeholder="Write a review" />
                <Button>Submit</Button>
              </div>
            </div>
          </DialogHeader>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
