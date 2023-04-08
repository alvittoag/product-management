import { useNavigate } from "react-router-dom";
const ItemProduct = ({
  product,
  index,
  handleDelete,
  handleEdit,
  loadingDelete,
  trackId,
}) => {
  const navigate = useNavigate();

  const handleDetailProduct = () => {
    navigate(`/product/${index + 1}`, {
      state: { product },
    });
  };

  return (
    <tr>
      <th
        onClick={handleDetailProduct}
        style={{ cursor: "pointer" }}
        scope="row"
      >
        {index + 1}
      </th>
      <td>{product.product_name}</td>
      <td>{product.product_category}</td>
      <td>
        <img width={200} src={product.product_image} alt="" />
      </td>
      <td>{product.product_freshness}</td>
      <td>{product.aditional_information}</td>
      <td>{product.price}</td>
      <td className="space-x-3">
        <button
          className="btn btn-danger"
          disabled={loadingDelete}
          onClick={() => handleDelete(product.id)}
        >
          {trackId === product.id && loadingDelete ? "Deleteting..." : "Delete"}
        </button>
        <button className="btn btn-success" onClick={() => handleEdit(product)}>
          Edit
        </button>
      </td>
    </tr>
  );
};

export default ItemProduct;
