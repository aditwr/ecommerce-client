import ProductFilter from "@/components/shopping/filter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { shoppingProductSortOptions } from "@/config";
import {
  closeProductDetailsDialog,
  fetchFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/ProductSlice";
import { DropdownMenuRadioGroup } from "@radix-ui/react-dropdown-menu";
import { ArrowUpDownIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ShoppingProductCard from "@/components/shopping/product-card";
import { useSearchParams } from "react-router-dom";
import ProductDetailsDialog from "@/components/shopping/product-details";
import Pagination from "@/components/common/pagination";
import { setFiltersToQuery } from "@/utils/shop-utils";
import { Checkbox } from "@/components/ui/checkbox";

function ShoppingListing() {
  const { products, product } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
  const [filters, setFilters] = useState(
    JSON.parse(sessionStorage.getItem("filters")) || {}
  );
  const [sort, setSort] = useState(
    sessionStorage.getItem("sort") || shoppingProductSortOptions[0].id
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) ||
      parseInt(sessionStorage.getItem("page")) ||
      1
  );
  const [totalPages, setTotalPages] = useState(1);
  const limitProductsPerPage = 10;

  // update url based on filters and sort state changes
  useEffect(() => {
    let params = new URLSearchParams();
    params = setFiltersToQuery(params, filters);
    params.set("sort", sort);
    params.set("page", currentPage);
    setSearchParams(params.toString());

    // save filters and sort in session storage
    sessionStorage.setItem("filters", JSON.stringify(filters));
    sessionStorage.setItem("sort", sort);
    sessionStorage.setItem("page", currentPage);
  }, [filters, sort, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sort]);

  // fetch products based on filters and sort
  useEffect(() => {
    dispatch(
      fetchFilteredProducts({
        filtersParams: filters,
        sortParams: sort,
        page: currentPage,
        limit: limitProductsPerPage,
      })
    ).then((response) => {
      if (response.payload) {
        setTotalPages(
          Math.ceil(response.payload.totalProducts / limitProductsPerPage)
        );
      }
    });
  }, [dispatch, filters, sort, currentPage]);

  // Show product details dialog
  useEffect(() => {
    if (product) setOpenDetailsDialog(true);
  }, [product]);

  function handleSort(value) {
    setSort(value);
  }

  function handlePageChange(page) {
    setCurrentPage(page);
  }

  function handleFilter(section, optionValue) {
    // section : category, brand // optionValue: men, woman, adidas, etc
    let nextFilters = { ...filters };
    if (nextFilters[section] && nextFilters[section].includes(optionValue)) {
      nextFilters[section] = nextFilters[section].filter(
        (value) => value !== optionValue
      );
    } else {
      nextFilters[section] = [...(nextFilters[section] || []), optionValue];
    }
    setFilters(nextFilters);
  }

  function handleGetProductDetails(productId) {
    dispatch(fetchProductDetails(productId));
  }

  function handleProductDetailsDialogClose() {
    setOpenDetailsDialog(false);
    dispatch(closeProductDetailsDialog());
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6 mt-12">
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className="w-full rounded-lg shadow-sm bg-background">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {products.length} products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="w-4 h-4" />
                  <span className="">
                    {shoppingProductSortOptions.map(
                      (sortItem) => sortItem.id === sort && sortItem.label
                    )}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup
                  value={sort}
                  onValueChange={(value) => handleSort(value)}
                >
                  {shoppingProductSortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="pb-6">
          <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {products.length > 0 ? (
              products.map((product) => (
                <ShoppingProductCard
                  key={product._id}
                  product={product}
                  handleGetProductDetails={handleGetProductDetails}
                />
              ))
            ) : (
              <div className="text-center text-muted-foreground">
                No products found
              </div>
            )}
          </div>
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      <ProductDetailsDialog
        isOpen={openDetailsDialog}
        setOpen={handleProductDetailsDialogClose}
        productDetails={product}
      />
    </div>
  );
}

export default ShoppingListing;
