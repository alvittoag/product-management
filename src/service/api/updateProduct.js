import { gql } from "@apollo/client";

const updateProduct = gql`
  mutation MyMutation(
    $id: Int!
    $price: String
    $product_category: String
    $product_freshness: String
    $product_name: String
    $aditional_information: String
  ) {
    update_product_by_pk(
      _set: {
        price: $price
        product_category: $product_category
        product_freshness: $product_freshness
        product_name: $product_name
        aditional_information: $aditional_information
      }
      pk_columns: { id: $id }
    ) {
      id
    }
  }
`;

export default updateProduct;
