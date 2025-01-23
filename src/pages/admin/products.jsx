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
import Pagination from "@/components/common/pagination";
import { BadgePlusIcon } from "lucide-react";
import { setBreadcrumb } from "@/store/breadcrumbSlice";

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

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limitProductsPerPage = 5;

  // mount
  useEffect(() => {
    dispatch(
      fetchAllProducts({ page: currentPage, limit: limitProductsPerPage })
    ).then((response) => {
      if (response?.payload?.success) {
        setTotalPages(
          Math.ceil(response.payload.totalDocuments / limitProductsPerPage)
        );
      }
    });
  }, [currentPage]);

  useEffect(() => {
    if (uploadedImageUrl) {
      setFormData({ ...formData, image: uploadedImageUrl });
    }
  }, [uploadedImageUrl]);

  useEffect(() => {
    dispatch(
      setBreadcrumb({
        level: 1,
        label: "Products",
        path: "/admin/products",
      })
    );
  }, []);

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
          <div className="flex items-center justify-between w-full mb-5">
            <div className="">
              <h1 className="text-lg font-semibold lg:text-xl">Products</h1>
            </div>
            <Button
              className="flex gap-x-2"
              onClick={() => setOpenCreateProductDialog(true)}
            >
              <BadgePlusIcon className="w-5 h-5" />
              Add Product
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

        <div className="min-h-0 overflow-y-auto">
          <div className="">
            {isLoading ? (
              <p>Loading...</p>
            ) : productList.length !== 0 ? (
              <div className="grid h-full gap-4 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
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
          <div className="mt-6">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminProducts;
