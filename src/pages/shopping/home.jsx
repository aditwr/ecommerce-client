import { Button } from "@/components/ui/button";
import { MoveRightIcon } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import banner1 from "@/assets/hero-banner/banner1.jpg";
import banner2 from "@/assets/hero-banner/banner2.jpg";
import banner3 from "@/assets/hero-banner/banner3.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/ProductSlice";
import ShoppingProductCard from "@/components/shopping/product-card";
import { useNavigate } from "react-router-dom";

const ProductCategoriesArray = [
  {
    id: "men",
    label: "Men",
    description: "Trendy Man clothes for your daily style",
  },
  {
    id: "women",
    label: "Woman",
    description: "Trendy Woman clothes for your daily style",
  },
  { id: "kids", label: "Kids", description: "Cute clothes for your kids" },
  {
    id: "accessories",
    label: "Accessories",
    description: "Stylish accessories for your daily needs",
  },
  {
    id: "footwear",
    label: "Footwear",
    description: "Comfortable and high quality shoes for your daily activities",
  },
];

const LandingSection = ({ id, title, description, children }) => {
  return (
    <section id={id} className="py-16 bg-gray-100">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center mb-12">
          <h1 className="text-3xl font-bold text-center">{title}</h1>
          <p className="text-lg text-center text-gray-500">{description}</p>
        </div>
        {children}
      </div>
    </section>
  );
};

const ShoppingHome = () => {
  const banners = [banner1, banner2, banner3];
  const [currentBanner, setCurrentBanner] = useState(0);
  const { products } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchFilteredProducts({ filtersParams: {}, sortParams: "" }));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSelectProductCategory = (categoryId) => {
    sessionStorage.removeItem("filters");
    sessionStorage.setItem(
      "filters",
      JSON.stringify({ category: [categoryId] })
    );
    navigate("/shop/listing");
  };

  const handleProductClick = (productId) => {
    dispatch(fetchProductDetails(productId)).then(() => {
      navigate(`/shop/listing`);
    });
  };

  return (
    <Fragment>
      {/* Hero */}
      <section id="hero">
        <div className="relative z-10 w-full h-[70vh] bg-blue-50">
          <div className="container relative z-10 flex items-center w-full h-full mx-auto">
            <div className="">
              <div className="flex flex-col mb-8 gap-y-2">
                <h1 className="text-4xl font-semibold">
                  We Picked The Best Item For You.
                </h1>
                <h1 className="text-4xl font-bold text-white">
                  You Must Love It.
                </h1>
              </div>
              <div className="">
                <Button>
                  See Collections
                  <MoveRightIcon className="w-6 h-6 mr-2" />
                </Button>
              </div>
            </div>
          </div>
          {/* Banner */}
          <div className="absolute top-0 left-0 z-0 flex items-center w-full h-full overflow-hidden">
            {banners.map((banner, index) => (
              <img
                key={index}
                src={banner}
                alt="banner"
                className={`absolute top-0 left-0 w-full h-auto object-cover transition-opacity duration-1000 ${
                  index === currentBanner ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
          {/* End of Banner */}
        </div>
      </section>

      {/* Product Categories */}
      <LandingSection
        id="product-categories"
        title="Product Categories"
        description="Choose your favorite category"
      >
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {ProductCategoriesArray.map((category) => (
            <div
              key={category.id}
              className="box-content flex flex-col items-center justify-center px-4 py-6 bg-white border border-white rounded-lg cursor-pointer hover:border-neutral-200"
              onClick={() => handleSelectProductCategory(category.id)}
            >
              <div className="flex justify-center w-full h-20 mb-4">
                <img
                  src={`/img/categories-img/${category.id}.svg`}
                  alt={category.id}
                  className="object-cover w-auto h-full"
                />
              </div>
              <h1 className="text-lg font-semibold">{category.label}</h1>
              <p className="text-sm text-center text-gray-500">
                {category.description}
              </p>
            </div>
          ))}
        </div>
      </LandingSection>

      {/* Featured Products */}
      <LandingSection
        id="featured-products"
        title="Featured Products"
        description="Check out our featured products"
      >
        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="hover:cursor-pointer"
                onClick={() => handleProductClick(product._id)}
              >
                <ShoppingProductCard product={product} />
              </div>
            ))
          ) : (
            <div className="text-center text-muted-foreground">
              No products found
            </div>
          )}
        </div>
      </LandingSection>
    </Fragment>
  );
};

export default ShoppingHome;
