import AutoSearch from "./autoSearch";
import { Metadata } from "next";
import LazyProductList from "./lazyProductList";

export const metadata: Metadata = {
  title: "Heo map",
  description: "dan map u",
};

const ProductList: React.FC = () => {
  return (
    <div className="w-full items-center">
      <h1>Product List</h1>
      <AutoSearch />
      <LazyProductList />
    </div>
  );
};

export default ProductList;
