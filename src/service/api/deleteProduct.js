import { gql } from "@apollo/client";

const deleteProduct = gql`
  mutation MyMutation($id: Int!) {
    delete_product_by_pk(id: $id) {
      id
    }
  }
`;

export default deleteProduct;
