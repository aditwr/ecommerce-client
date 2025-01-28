import { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FileIcon, UploadCloud, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({
  productImage,
  setProductImage,
  uploadedImageUrl,
  setUploadedImageUrl,
  imageLoadingState,
  setImageLoadingState,
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (productImage !== null) uploadImageToCloudinary();
  }, [productImage]);

  async function uploadImageToCloudinary() {
    setImageLoadingState(true);
    try {
      // create a new FormData instance
      const formData = new FormData();
      // append the file to the formData instance
      formData.append("my_file", productImage);
      // send the formData instance to the server
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/products/upload-image`,
        formData
      );
      console.log(
        "response upload image to cloudinary",
        response.data.data.url
      );
      if (response?.data?.success) {
        setUploadedImageUrl(response.data.data.url);
        setImageLoadingState(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleImageFileChange(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setProductImage(selectedFile);
    }
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setProductImage(droppedFile);
      console.log(droppedFile);
    }
  }

  function handleRemoveProductImage() {
    //   delete image data from state
    setProductImage(null);
    //   clear the input field
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Label className="block mb-2 text-lg font-semibold">
        Upload Product Image
      </Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="p-4 border-2 border-dashed rounded-lg hover:cursor-pointer"
      >
        {/* hidden input */}
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
        />
        {!productImage ? (
          <Label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center h-32 cursor-pointer"
          >
            <UploadCloud className="w-10 h-10 mb-2 text-muted-foreground" />
            <span className="">Drag & drop or click to upload image</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="flex items-center justify-center w-full h-10 bg-gray-100">
            Uploading...
          </Skeleton>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 h-8 mr-2 text-primary " />
            </div>
            <div className="">
              <p className="text-sm font-medium">{productImage.name}</p>
              <p className="text-xs text-muted-foreground">
                {/* display productImage.size, if size < 1024 (display in B), if size > 1024 (display in KB), etc */}
                {productImage.size < 1024
                  ? `${productImage.size} B`
                  : productImage.size < 1024 * 1024
                  ? `${(productImage.size / 1024).toFixed(2)} KB`
                  : `${(productImage.size / (1024 * 1024)).toFixed(2)} MB`}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveProductImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;
