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
      <Card key={_id}>
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
            className="w-full"
          >
            {" "}
            Edit{" "}
          </Button>
          <Button
            onClick={() => handleDeleteProduct(_id)}
            variant="destructive"
            className="w-full"
          >
            {" "}
            Delete{" "}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default AdminProductCard;
