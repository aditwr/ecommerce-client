import ProductImageUpload from "@/components/admin/image-upload";
import CommonForm from "@/components/common/form";
import AdminProductCard from "@/components/admin/products/card";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
  const { productList, isLoading } = useSelector(
    (state) => state.adminProducts
  ); // get state from redux store
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { toast } = useToast();

  const dispatch = useDispatch();

  // mount
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (uploadedImageUrl) {
      setFormData({ ...formData, image: uploadedImageUrl });
    }
  }, [uploadedImageUrl]);

  function isFormValid() {
    return Object.values(formData).every((value) => value !== "");
  }
  isFormValid();

  function onSubmit(e) {
    e.preventDefault();
    if (currentEditedId === null) {
      dispatch(addNewProduct(formData)).then((response) => {
        if (response.payload.success) {
          // reset state
          setOpenCreateProductDialog(false);
          setFormData(initialFormData);
          setProductImage(null);
          setUploadedImageUrl("");
          toast({
            title: "Product Added Successfully",
          });
          dispatch(fetchAllProducts());
        }
      });
    } else {
      dispatch(editProduct({ id: currentEditedId, formData })).then(
        (response) => {
          if (response.payload.success) {
            // reset state
            setOpenCreateProductDialog(false);
            setFormData(initialFormData);
            setProductImage(null);
            setUploadedImageUrl("");
            dispatch(fetchAllProducts());
            toast({
              title: response.payload.message,
            });
          }
        }
      );
    }
  }

  function handleDeleteProduct(id) {
    dispatch(deleteProduct(id)).then((response) => {
      if (response.payload.success) {
        dispatch(fetchAllProducts());
        toast({
          title: response.payload.message,
        });
      }
    });
  }

  return (
    <Fragment>
      <div className="w-full">
        <div className="w-full">
          <div className="flex justify-end w-full mb-5">
            <Button onClick={() => setOpenCreateProductDialog(true)}>
              Add New Product
            </Button>
          </div>
          <Sheet
            open={openCreateProductDialog}
            onOpenChange={() => {
              setOpenCreateProductDialog(false);
              setCurrentEditedId(null);
              setFormData(initialFormData);
              setProductImage(null);
              setUploadedImageUrl("");
            }}
          >
            <SheetContent side="right" className="overflow-auto">
              <SheetHeader className="mb-6">
                <SheetTitle>
                  {currentEditedId === null
                    ? "Add New Product"
                    : "Edit Product Information"}
                </SheetTitle>
              </SheetHeader>
              {currentEditedId === null ? (
                <ProductImageUpload
                  productImage={productImage}
                  setProductImage={setProductImage}
                  uploadedImageUrl={uploadedImageUrl}
                  setUploadedImageUrl={setUploadedImageUrl}
                  imageLoadingState={imageLoadingState}
                  setImageLoadingState={setImageLoadingState}
                />
              ) : (
                <div className="w-full">
                  <img
                    src={formData.image}
                    alt="product image"
                    className="flex object-cover w-full"
                  />
                </div>
              )}
              <div className="py-6">
                <CommonForm
                  formControls={addProductFormControls}
                  formData={formData}
                  setFormData={setFormData}
                  onSubmit={onSubmit}
                  buttonText={
                    currentEditedId === null
                      ? "Add New Product"
                      : "Edit Product Information"
                  }
                  isFormValid={isFormValid()}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="">
          {isLoading ? (
            <p>Loading...</p>
          ) : productList.length !== 0 ? (
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
              {productList.map((product) => (
                <AdminProductCard
                  key={product._id}
                  {...product}
                  setCurrentEditedId={setCurrentEditedId}
                  setOpenCreateProductDialog={setOpenCreateProductDialog}
                  setFormData={setFormData}
                  handleDeleteProduct={handleDeleteProduct}
                />
              ))}
            </div>
          ) : (
            <p>No products found</p>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default AdminProducts;
