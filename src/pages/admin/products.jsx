import ProductImageUpload from "@/components/admin/image-upload";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormControls } from "@/config";
import { addNewProduct, fetchAllProducts } from "@/store/admin/products-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const initialFormData = {
  image: "",
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

const AdminProducts = () => {
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [productImage, setProductImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [productList, setProductList] = useState([]);

  const dispath = useDispatch();

  // mount
  useEffect(() => {
    dispath(fetchAllProducts()).then((res) => setProductList(res.payload.data));
  }, []);

  useEffect(() => {
    if (uploadedImageUrl) {
      setFormData({ ...formData, image: uploadedImageUrl });
    }
  }, [uploadedImageUrl]);

  function onSubmit(e) {
    e.preventDefault();
    dispath(addNewProduct(formData));
  }

  return (
    <Fragment>
      <div className="flex justify-end w-full mb-5">
        <Button onClick={() => setOpenCreateProductDialog(true)}>
          Add New Product
        </Button>
      </div>
      {/* display list of products */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList.map((product) => (
          <div key={product._id} className="p-4 bg-white rounded shadow">
            <img
              src={product.image}
              alt={product.title}
              className="object-cover w-full h-48"
            />
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="text-sm text-gray-500">{product.description}</p>
            <div className="mt-2">
              <span className="text-sm font-semibold">
                {product.price}{" "}
                {product.salePrice && <del>{product.salePrice}</del>}
              </span>
              <span className="ml-2 text-sm text-gray-500">
                {product.totalStock} in stock
              </span>
            </div>
          </div>
        ))}
      </div>
      <Sheet
        open={openCreateProductDialog}
        onOpenChange={setOpenCreateProductDialog}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader className="mb-6">
            <SheetTitle>Add New Product</SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            productImage={productImage}
            setProductImage={setProductImage}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
          />
          <div className="py-6">
            <CommonForm
              formControls={addProductFormControls}
              formData={formData}
              setFormData={setFormData}
              onSubmit={onSubmit}
              buttonText={"Create a new Product"}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;
