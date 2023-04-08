import { useNavigate } from "react-router-dom";

const ListProductsLandingPage = ({ product }) => {
  const navigate = useNavigate();

  const handleDetailProduct = () => {
    navigate(`/product-home/${product.id}`, {
      state: { product },
    });
  };

  return (
    <div
      onClick={handleDetailProduct}
      className="space-y-5 -w-[350px] mx-auto ring-1 ring-gray-100 shadow-md px-10 py-4 rounded-2xl cursor-pointer"
    >
      <h1 className="text-xl text-slate-600 font-semibold">
        {product.product_name}
      </h1>
      <img src={product.product_image} className="rounded-md" alt="product" />
      <p className="max-w-[250px] text-justify ">
        {product.aditional_information}
      </p>
      <div className="flex justify-between items-center">
        <button className="ring-1 shadow-md px-4 py-1 font-semibold text-slate-600 ring-gray-200 rounded-lg">
          # {product.id}
        </button>
        <p>$ {product.price}</p>
      </div>
    </div>
  );
};

export default ListProductsLandingPage;
