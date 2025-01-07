import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { deleteProduct } from "@/store/admin/products-slice";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { Fragment } from "react";
import { PencilIcon, TrashIcon } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
      <Card key={_id} className="h-full">
        <CardHeader className="my-0">
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-48 rounded-sm"
          />
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <CardDescription className="text-sm text-gray-500">
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
        <CardFooter className="flex gap-x-3">
          <div className="">
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
                    className=""
                  >
                    <PencilIcon className="w-5 h-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="p-2 text-white bg-gray-800 rounded-md">
                  <p>Edit product information</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  {/* alert-dialog */}
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Button variant="destructive" className="">
                        <TrashIcon className="w-5 h-5" />
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
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
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
        </CardFooter>
      </Card>
    </div>
  );
}

export default AdminProductCard;
