import "./form.css";
import Input from "./Input";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import addProduct from "../../service/api/addProduct";
import getProducts from "../../service/api/GetProduct";
import updateProduct from "../../service/api/updateProduct";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../config/firebaseConfig";
import Swal from "sweetalert2";

const FormProduct = ({ input, setInput }) => {
  const handleClick = () => {
    console.log(Math.random());
  };

  const [updateProductList, { loading: loadingUpdateProduct }] = useMutation(
    updateProduct,
    {
      refetchQueries: [getProducts],
    }
  );

  const [addProductList, { loading: loadingAddProduct }] = useMutation(
    addProduct,
    {
      refetchQueries: [getProducts],
    }
  );

  let loading;

  if (loadingAddProduct) {
    loading = loadingAddProduct;
  } else if (loadingUpdateProduct) {
    loading = loadingUpdateProduct;
  }

  // ** Region
  const [errMsg, setErrMsg] = useState("");
  const [productImage, setProductImage] = useState(null);

  const regex = /^[A-Za-z 0-9 ]*$/;
  const regexOnlyNumber = /^[0-9]/;
  // ** End Region

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (
      name === "productName" ||
      name === "productCategory" ||
      name === "productFreshness"
    ) {
      if (regex.test(value)) {
        setErrMsg("");
      } else {
        setErrMsg("* Nama Harus Berupa Huruf dan Angka");
      }
    }

    if (name === "productPrice") {
      if (regexOnlyNumber.test(value)) {
        setErrMsg("");
      } else {
        setErrMsg("* Price Harus Berupa Agnka");
      }
    }

    if (name === "productDescription") {
      if (regex.test(value)) {
        setErrMsg("");
      } else {
        setErrMsg("* Description Harus Berupa Huruf dan Angka");
      }
    }

    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleProductImage = (e) => {
    const image = e.target.files[0];
    if (!image.name.match(/\.(jpg|jpeg|png|gif|PNG)$/)) {
      setErrMsg("Format Gambar Tidak Sesuai");
    } else {
      setErrMsg("");
      setProductImage(image);
    }
  };

  useEffect(() => {
    if (input.productName.length >= 10) {
      setErrMsg("Nama Tidak Boleh Lebih Dari 10 Character");
    }
  }, [input.productName]);

  const finalAddProduct = () => {
    const storageRef = ref(storage, `/files/${productImage?.name}`);

    const uploadTask = uploadBytesResumable(storageRef, productImage);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },

      (error) => {
        console.log(error);
      },

      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);

        loading = loadingAddProduct;

        if (!loadingAddProduct) {
          await Swal.fire({
            title: "Product Sucessfuly Added",
            icon: "success",
            confirmButtonText: "Oke",
          });
        }

        addProductList({
          variables: {
            object: {
              id: input.id,
              price: input.productPrice,
              product_category: input.productCategory,
              product_freshness: input.productFreshness,
              product_image: url,
              product_name: input.productName,
              aditional_information: input.productDescription,
            },
          },
        });
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (errMsg !== "") {
      alert("Terdapat data yang tidak sesuai");
    } else {
      finalAddProduct();

      setInput({
        productName: "",
        productCategory: "Tshirt",
        productFreshness: "Branch New",
        productDescription: "",
        productPrice: "",
      });
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();

    updateProductList({
      variables: {
        id: input.id,
        price: input.productPrice,
        product_category: input.productCategory,
        product_freshness: input.productFreshness,
        product_name: input.productName,
        aditional_information: input.productDescription,
      },
    });

    setInput({
      productName: "",
      productCategory: "Tshirt",
      productFreshness: "Branch New",
      productDescription: "",
      productPrice: "",
      isEdit: false,
    });
  };

  return (
    <section className="mx-auto mt-5" style={{ maxWidth: 520 }}>
      <div className="row">
        <div className="col">
          <h1 className="fw-semibold fs-4 mb-4">Detail Product</h1>
          <div id="liveAlertPlaceholder" />
          <form onSubmit={input.id ? handleEdit : handleSubmit}>
            <div className="mb-3">
              <Input
                classLabel={"form-label fs-5"}
                title={"Product name"}
                type={"text"}
                nameInput={"productName"}
                valueName={input.productName}
                handleChange={handleInput}
                style={{ maxWidth: 320 }}
                classInput={`form-control ${
                  errMsg.includes("Nama") && "border-danger"
                }`}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="product-category" className="form-label fs-5">
                Product Category
              </label>
              <select
                className="form-select form-select-lg mb-3 fs-6"
                onChange={handleInput}
                name="productCategory"
                value={input.productCategory}
                style={{ maxWidth: 280 }}
              >
                <option value="Tshirt">Tshirt</option>
                <option value="Gadget">Gadget</option>
                <option value="Shoes">Shoes</option>
              </select>
            </div>

            {!input.isEdit && (
              <div className="mb-3">
                <Input
                  classLabel={"form-label fs-5"}
                  title={"Image of Product"}
                  handleChange={handleProductImage}
                  type={"file"}
                  classInput={`form-control border ${
                    errMsg.includes("Format")
                      ? "border-danger"
                      : "border-primary"
                  }  text-primary`}
                  style={{ maxWidth: 235 }}
                />
              </div>
            )}

            <div className="mb-3 mt-4">
              <label htmlFor="product-freshness" className="fs-5">
                Product Freshness
              </label>
              <div className="form-check">
                <Input
                  classLabel={"form-check-label fs-5"}
                  title={"Branch New"}
                  classInput={"form-check-input"}
                  type={"radio"}
                  valueName={"Branch New"}
                  handleChange={handleInput}
                  nameInput={"productFreshness"}
                  checkedName={input.productFreshness === "Branch New"}
                />
              </div>
              <div className="form-check">
                <Input
                  title={"Seccond Hand"}
                  classLabel={"form-check-label fs-5"}
                  classInput={"form-check-input"}
                  type={"radio"}
                  valueName={"Seccond Hand"}
                  handleChange={handleInput}
                  nameInput={"productFreshness"}
                  checkedName={input.productFreshness === "Seccond Hand"}
                />
              </div>
              <div className="form-check">
                <Input
                  title={"Refurbished"}
                  classLabel={"form-check-label fs-5"}
                  classInput={"form-check-input"}
                  type={"radio"}
                  valueName={"Refurbished"}
                  handleChange={handleInput}
                  nameInput={"productFreshness"}
                  checkedName={input.productFreshness === "Refurbished"}
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label fs-5">Additional Description</label>
              <textarea
                className={`form-control w-100 ${
                  errMsg.includes("Description") && "border-danger"
                }`}
                rows={5}
                name="productDescription"
                value={input.productDescription}
                onChange={handleInput}
              />
            </div>
            <div className="mb-3 ">
              <Input
                title={"Product Price"}
                classLabel={"form-label fs-5"}
                classInput={`form-control w-100 py-2 px-4  ${
                  errMsg.includes("Price") && "border-danger"
                }`}
                type={"text"}
                valueName={input.productPrice}
                nameInput={"productPrice"}
                handleChange={handleInput}
                placeHolder={"$ 1"}
              />
            </div>
            <div className="py-2 mb-14">
              <p className="fw-semibold text-danger">{errMsg}</p>
              <button
                disabled={loading}
                id="button-submit"
                onClick={handleClick}
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-100 py-2 text-white font-semibold rounded-lg"
              >
                {loading ? "Loading..." : input.isEdit ? "Edit" : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FormProduct;
