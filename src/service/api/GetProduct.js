import { gql } from "@apollo/client";

const getProducts = gql`
  query MyQuery($limit: Int) {
    product(limit: $limit) {
      product_name
      comentars {
        text
        id
      }
      id
      price
      product_freshness
      product_category
      product_image
      aditional_information
    }
  }
`;

export default getProducts;
