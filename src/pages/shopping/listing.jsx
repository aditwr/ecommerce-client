import ProductFilter from "@/components/shopping/filter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
} from "@/components/ui/dropdown-menu";
import { shoppingProductSortOptions } from "@/config";
import {
  closeProductDetailsDialog,
  fetchFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/ProductSlice";
import { ArrowUpDownIcon, SearchIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ShoppingProductCard from "@/components/shopping/product-card";
import { useSearchParams } from "react-router-dom";
import ProductDetailsDialog from "@/components/shopping/product-details";
import Pagination from "@/components/common/pagination";
import { setFiltersToQuery } from "@/utils/shop-utils";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

function ShoppingListing() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, product } = useSelector((state) => state.shopProducts);
  const [search, setSearch] = useState(
    searchParams.get("search") || sessionStorage.getItem("search") || ""
  );
  const [filters, setFilters] = useState(
    JSON.parse(sessionStorage.getItem("filters")) || {}
  );
  const [sort, setSort] = useState(
    sessionStorage.getItem("sort") || shoppingProductSortOptions[0].id
  );
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) ||
      parseInt(sessionStorage.getItem("page")) ||
      1
  );
  const [totalPages, setTotalPages] = useState(1);
  const limitProductsPerPage = 5;

  // Update url based on related state changes
  useEffect(() => {
    let params = new URLSearchParams();
    params = setFiltersToQuery(params, filters);
    if (sort) params.set("sort", sort);
    if (currentPage) params.set("page", currentPage);
    if (search.length > 0) params.set("search", search);

    setSearchParams(params.toString());

    // save filters and sort in session storage
    sessionStorage.setItem("filters", JSON.stringify(filters));
    sessionStorage.setItem("sort", sort);
    sessionStorage.setItem("page", currentPage);
    sessionStorage.setItem("search", search);
  }, [filters, sort, currentPage, search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sort]);

  useEffect(() => {}, [search]);

  // fetch products based on filters and sort
  useEffect(() => {
    setLoading(true);
    dispatch(
      fetchFilteredProducts({
        filtersParams: filters,
        sortParams: sort,
        page: currentPage,
        limit: limitProductsPerPage,
        search: search,
      })
    ).then((response) => {
      if (response.payload) {
        setTotalPages(
          Math.ceil(response.payload.totalProducts / limitProductsPerPage)
        );
      }
      setLoading(false);
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

  function handleSearch() {
    setLoading(true);
    dispatch(
      fetchFilteredProducts({
        filtersParams: filters,
        sortParams: sort,
        page: 1,
        limit: limitProductsPerPage,
        search: search,
      })
    ).then((response) => {
      if (response.payload) {
        setCurrentPage(1);
        setTotalPages(
          Math.ceil(response.payload.totalProducts / limitProductsPerPage)
        );
      }
      setLoading(false);
    });
  }

  return (
    <div className="grid relative grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6 mt-12">
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className="w-full rounded-lg shadow-sm bg-background">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold">All Products</h2>
          {/* Search */}
          <div className="">
            <div className="flex items-center w-full sm:w-[400px] lg:w-[500px] space-x-2">
              <Input
                type="text"
                placeholder="Search Collections"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
              <Button
                type="submit"
                className="flex space-x-2"
                onClick={handleSearch}
              >
                <SearchIcon /> Search
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-3">
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
            {loading ? (
              Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="w-full h-full max-w-sm mz-auto">
                  <Skeleton className="w-full aspect-square" />
                  <Skeleton className="w-full h-4 mt-2" />
                  <Skeleton className="w-1/2 h-4 mt-2" />
                  <Skeleton className="w-1/3 h-6 mt-2" />
                </div>
              ))
            ) : products?.length > 0 ? (
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
