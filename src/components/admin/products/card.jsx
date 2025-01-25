import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { Fragment } from "react";
import { EllipsisIcon, PencilIcon, TrashIcon } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function AdminProductCard({
  _id,
  image,
  title,
  description,
  price,
  salePrice,
  totalStock,
  setCurrentEditedId,
  setOpenCreateProductDialog,
  setFormData,
  handleDeleteProduct,
}) {
  const dispatch = useDispatch();
  const { toast } = useToast();

  return (
    <div>
      <Card key={_id} className="h-full ">
        <CardHeader className="my-0">
          <div className="relative w-full h-48 overflow-hidden rounded-sm">
            <img
              src={image}
              alt={title}
              className="object-cover w-full h-full"
            />
            {/* more action button */}
            <div className="absolute top-2 right-2">
              <Popover>
                <PopoverTrigger>
                  <div className="p-2 bg-white rounded shadow">
                    <EllipsisIcon className="w-5 h-5" />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="flex w-auto gap-x-2">
                  <div className="">
                    {/* edit button */}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            onClick={() => {
                              setOpenCreateProductDialog(true);
                              setCurrentEditedId(_id);
                              setFormData({
                                image,
                                title,
                                description,
                                price,
                                salePrice,
                                totalStock,
                              });
                            }}
                            variant="outline"
                            size="icon"
                            className=""
                          >
                            <PencilIcon className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="p-2 text-white bg-gray-800 rounded-md">
                          <p>Edit product information</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="">
                    {/* delete button */}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          {/* alert-dialog */}
                          <AlertDialog>
                            <AlertDialogTrigger>
                              <Button
                                variant="destructive"
                                size="icon"
                                className=""
                              >
                                <TrashIcon className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you sure you want to delete this product?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  (Product) : {title}
                                  <p className="">
                                    This action cannot be undone. This will
                                    permanently delete your account and remove
                                    your data from our servers.
                                  </p>
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  className="text-white bg-rose-600 hover:bg-rose-700"
                                  onClick={() => handleDeleteProduct(_id)}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TooltipTrigger>
                        <TooltipContent className="p-2 text-white bg-gray-800 rounded-md">
                          <p>Delete product from database</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            {/* end of more action button */}
          </div>
          <CardTitle className="font-semibold text-md">{title}</CardTitle>
          <CardDescription className="text-xs text-gray-500 line-clamp-2">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="my-0">
          <div>
            <span className="text-sm font-semibold">
              {salePrice ? (
                <Fragment>
                  <span className="text-lg">${salePrice}</span>{" "}
                  <span className="text-gray-500 line-through">${price}</span>{" "}
                </Fragment>
              ) : (
                <span className="text-lg">${price}</span>
              )}
            </span>
            <span className="ml-2 text-sm text-gray-500">
              <span className="font-medium">{totalStock}</span> in stock
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminProductCard;
