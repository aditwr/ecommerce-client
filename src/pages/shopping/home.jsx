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
import ContactUs from "@/components/shopping/home/contact-us";
import Footer from "@/components/common/footer";

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
    description: "Comfortable shoes for your daily activities",
  },
];

const LandingSection = ({
  id,
  title,
  description,
  children,
  wrapperClassName,
}) => {
  return (
    <section id={id} className={wrapperClassName}>
      <div className="mx-auto ">
        <div className="flex flex-col items-center justify-center mb-8">
          <h1 className="text-xl font-bold text-center sm:text-2xl 2xl:text-3xl">
            {title}
          </h1>
          <p className="text-base text-center text-gray-500 2xl:text-lg">
            {description}
          </p>
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
    dispatch(
      fetchFilteredProducts({
        filtersParams: {},
        sortParams: "",
        page: 1,
        limit: 12,
      })
    );
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
      <section id="hero" className="w-full mt-12">
        <div className=" relative z-10 w-full h-[70vh] bg-green">
          <div className="container relative z-10 flex items-center w-full h-full px-4 mx-auto xl:px-12">
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
                <Button onClick={() => navigate("/shop/listing")}>
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
                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
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
        wrapperClassName="py-16 bg-gray-100"
      >
        <div className="grid justify-center grid-cols-1 gap-4 px-4 mx-auto xl:container sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {ProductCategoriesArray.map((category) => (
            <div
              key={category.id}
              className="box-content flex flex-col items-center justify-center px-4 py-6 transition duration-300 bg-white border border-white rounded-lg cursor-pointer group hover:bg-neutral-700 hover:text-white hover:border-neutral-200"
              onClick={() => handleSelectProductCategory(category.id)}
            >
              <div className="relative flex justify-center w-full h-20 mb-4">
                <img
                  src={`/img/categories-img/${category.id}.svg`}
                  alt={category.id}
                  className="absolute object-cover w-auto h-full transition-all duration-150 group-hover:-translate-y-10 group-hover:scale-150 group-hover:rotate-12"
                />
              </div>
              <h1 className="text-lg font-semibold">{category.label}</h1>
              <p className="text-sm text-center text-gray-500 group-hover:text-gray-200">
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
        wrapperClassName="py-16 bg-gray-100 "
      >
        <div className="grid grid-cols-1 gap-4 px-4 mx-auto xl:container sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="hover:shadow-2xl hover:cursor-pointer"
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

      {/* Contact Us */}
      <div className="px-4 py-16 bg-gray-100">
        <div className="py-8 bg-white rounded-md sm:w-[600px] mx-auto">
          <LandingSection
            id="contact-us"
            title="Contact Us"
            description="Send us some questions, messages or feedback, we are happy to help you"
            wrapperClassName="bg-white px-8"
          >
            <ContactUs />
          </LandingSection>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </Fragment>
  );
};

export default ShoppingHome;
