import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";

const DetailProduct = () => {
  const { key } = useParams();

  const location = useLocation();
  const { name, category, freshness, price } = location.state.product;

  return (
    <div className="card mt-5 mx-auto" style={{ maxWidth: 600 }}>
      <h5 className="card-header text-3xl text-white font-semibold bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-rose-500 to-indigo-700">
        Detail Product {key}
      </h5>
      <div className="card-body">
        <h5 className="card-title text-2xl font-bold text-slate-600">
          Nama Produk : {name}
        </h5>
        <div className="card-text fs-5 fw-fw-semibold mb-3 space-y-2">
          <p>Category Produk : {category}</p>
          <p> Keterangan Kondisi Barang : {freshness}</p>
          <p> Harga Barang : ${price}</p>
        </div>
        <Link to="/create-product">
          <button className="btn btn-primary">Back To Create Product</button>
        </Link>
      </div>
    </div>
  );
};

export default DetailProduct;
