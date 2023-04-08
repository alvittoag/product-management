import { gql } from "@apollo/client";

const addProduct = gql`
  mutation MyMutation($object: product_insert_input!) {
    insert_product_one(object: $object) {
      id
    }
  }
`;

export default addProduct;
