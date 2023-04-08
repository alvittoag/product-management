import { gql } from "@apollo/client";

// ** Kak alvin subscription nya dipake di component List Product Ya, jadi nanti tabel create product nya akan live update data, cara test nya coba buka web nya di dua browser yang satu  terus coba tambah/update/delete

const getProductSubscription = gql`
  subscription MySubscription($limit: Int) {
    product(limit: $limit) {
      id
      price
      product_category
      product_freshness
      product_image
      product_name
      aditional_information
    }
  }
`;

export default getProductSubscription;
