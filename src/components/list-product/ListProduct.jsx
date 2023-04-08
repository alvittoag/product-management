import ItemProduct from "./ItemProduct";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { useState } from "react";
import getProducts from "../../service/api/GetProduct";
import deleteProduct from "../../service/api/deleteProduct";
import Swal from "sweetalert2";
import getProductSubscription from "../../service/api/subscription/getProductSubscription";

const ListProduct = ({ setInput }) => {
  // const { data, loading: loadingData, error } = useQuery(getProducts);

  const {
    data,
    loading: loadingData,
    error,
  } = useSubscription(getProductSubscription);

  const [deleteProductList, { loading: loadingDelete }] = useMutation(
    deleteProduct,
    { refetchQueries: [getProducts] }
  );

  const [trackId, setTrackId] = useState(0);

  const handleDeleteProduct = (id) => {
    if (window.confirm("Apakah anda ingin menghapus product")) {
      if (!loadingDelete) {
        Swal.fire({
          title: "Product Sucessfuly Deleted",
          icon: "success",
          confirmButtonText: "Oke",
        });
      }
      deleteProductList({
        variables: {
          id,
        },
      });
    }
    setTrackId(id);
  };

  const handleEditProduct = (product) => {
    setInput({
      productName: product.product_name,
      productCategory: product.product_category,
      productFreshness: product.product_freshness,
      productDescription: product.aditional_information,
      productPrice: product.price,
      isEdit: true,
      id: product.id,
    });
    window.scrollTo(0, 0);
  };

  return (
    <section className="px-5 mb-14">
      <h1 className="text-4xl text-center font-semibold">List Product</h1>
      <table className="table table-striped w-100 px-5 mt-10">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Product Name</th>
            <th scope="col">Product Category</th>
            <th scope="col">Product Image</th>
            <th scope="col">Product Freshness</th>
            <th scope="col">Product Description</th>
            <th scope="col">Product Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody id="products-list">
          {data?.product.map((product, index) => (
            <ItemProduct
              key={product.id}
              product={product}
              index={index}
              handleDelete={handleDeleteProduct}
              handleEdit={handleEditProduct}
              loadingDelete={loadingDelete}
              trackId={trackId}
            />
          ))}
        </tbody>
      </table>

      {data?.product.length === 0 && (
        <p className="text-center py-5 text-lg font-semibold text-slate-600">
          Data Product Notfound
        </p>
      )}

      {loadingData && (
        <p className="text-center text-lg font-semibold py-3 text-slate-600">
          Loading All Products...
        </p>
      )}

      {error && (
        <p className="text-center text-lg font-semibold py-3 text-red-600">
          ! Error Data
        </p>
      )}
    </section>
  );
};

export default ListProduct;
