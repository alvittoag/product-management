import { gql } from "@apollo/client";

export const getProductsByName = gql`
  query MyQuery($match: String!) {
    product(where: { product_name: { _like: $match } }) {
      aditional_information
      id
      price
      product_category
      product_freshness
      product_image
      product_name
    }
  }
`;
