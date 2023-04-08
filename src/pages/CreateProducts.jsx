import { useState } from "react";
import { FormProduct, Hero, ListProduct } from "../components";
import { inputValue } from "../components/data/inputValue";

const CreateProducts = () => {
  const [dataInputForm, setDataInputForm] = useState(inputValue);

  return (
    <>
      <Hero />
      <FormProduct input={dataInputForm} setInput={setDataInputForm} />
      <ListProduct setInput={setDataInputForm} />
    </>
  );
};

export default CreateProducts;
