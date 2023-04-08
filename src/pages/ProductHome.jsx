import { useLazyQuery, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addComments } from "../service/api/addComments";
import { getDetailProductHome } from "../service/api/getDetailProductHome";

const ProductHome = () => {
  const { key } = useParams();
  const [getData, { data, loading: loadingData, refetch }] =
    useLazyQuery(getDetailProductHome);

  const [addComment, { loading: loadingAddComment }] = useMutation(addComments);

  const [comments, setComments] = useState("");

  useEffect(() => {
    getData({
      variables: {
        id: key,
      },
    });
  }, []);

  const handleComments = async (product) => {
    await addComment({
      variables: {
        object: {
          prodcut_id: product.id,
          text: comments,
        },
      },
    });

    setComments("");

    refetch();
  };

  if (loadingData) {
    return (
      <div className="py-14 px-4 ">
        <p className="text-2xl font-semibold text-slate-600 text-center mt-40">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <>
      {data?.product.map((prod) => (
        <div className="py-14 px-16 grid grid-cols-2 gap-20 items-start">
          <div className="space-y-7">
            <h1 className=" text-2xl font-semibold text-slate-600">
              {prod.product_name} | $ {prod.price}
            </h1>
            <img src={prod.product_image} className="rounded-2xl" />
          </div>

          <div>
            <div className="space-y-2 text-center">
              <h3 className=" text-2xl font-semibold text-slate-600">
                Comentar
              </h3>
            </div>
            <div className="mt-10 space-y-5 text-center">
              {prod?.comentars.length === 0 && (
                <p className="text-red-600 font-semibold animate-bounce">
                  Comentar Not Found
                </p>
              )}
              {prod.comentars.map((comentar, index) => (
                <p className="text-lg" key={comentar.id}>
                  <span>{index + 1}. </span>
                  {comentar.text}
                </p>
              ))}
            </div>

            <div className="mt-9 flex justify-center space-x-2">
              <input
                type="text"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="ring-1 ring-gray-200 rounded-md shadow-md px-2 py-1 w-96"
              />
              <button
                onClick={(e) => handleComments(prod)}
                className="bg-[#7C5FF3] px-3 py-1 text-white rounded-md"
              >
                {loadingAddComment ? "Loading..." : " Add Comentar"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductHome;
