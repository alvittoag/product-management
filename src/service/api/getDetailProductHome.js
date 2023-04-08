import { gql } from "@apollo/client";

export const getDetailProductHome = gql`
  query MyQuery($id: Int) {
    product(where: { id: { _eq: $id } }) {
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
