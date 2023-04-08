import { gql } from "@apollo/client";

export const addComments = gql`
  mutation MyMutation($object: comentar_insert_input!) {
    insert_comentar_one(object: $object) {
      id
    }
  }
`;
