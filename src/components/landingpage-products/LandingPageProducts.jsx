import { useQuery } from "@apollo/client";
import React from "react";
import getProducts from "../../service/api/GetProduct";
import ListProductsLandingPage from "./ListProductsLandingPage";

const LandingPageProducts = ({ searchProduct, loadingSearch, dataProduct }) => {
  const { data, loading: loadingData } = useQuery(getProducts);

  if (loadingSearch || loadingData) {
    return (
      <p className="text-center font-semibold text-slate-700 text-2xl">
        Loading...
      </p>
    );
  }

  const renderProduct = (products) => {
    return products?.map((product) => (
      <ListProductsLandingPage product={product} key={product.id} />
    ));
  };

  return (
    <div className="grid grid-cols-3 items-start gap-10">
      {renderProduct(searchProduct || dataProduct)}
    </div>
  );
};

export default LandingPageProducts;
