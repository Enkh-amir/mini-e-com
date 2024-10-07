"use client";

import { useState } from "react";

export const CreateModal = ({ setProducts }) => {
  const [product, setProduct] = useState({});

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      };
      const response = await fetch(`${BACKEND_ENDPOINT}/product`, options);
      const data = await response.json();
      setProducts((prevProducts) => [...prevProducts, data.product]);
    } catch {
      console.log("error");
    }

    setProduct({
      productName: "",
      category: "",
      price: "",
    });
    document.getElementById("my_modal_1").close();
  };

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setProduct((prevProduct) => {
      return {
        ...prevProduct,
        [name]: value,
      };
    });
  };

  return (
    <>
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        Create product
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Create product</h3>
          <div className="flex flex-col gap-3 mt-4">
            <input
              name="productName"
              onChange={handleInputChange}
              type="text"
              placeholder="name"
              className="w-full input input-bordered"
              value={product?.productName}
            />
            <input
              name="category"
              onChange={handleInputChange}
              type="text"
              placeholder="Description"
              className="w-full input input-bordered"
              value={product?.category}
            />
            <input
              name="price"
              onChange={handleInputChange}
              type="text"
              placeholder="price"
              className="w-full input input-bordered"
              value={product?.price}
            />
            <input
              name="price"
              onChange={handleInputChange}
              type="text"
              placeholder="image url"
              className="w-full input input-bordered"
              value={product?.price}
            />
          </div>

          <button className="mt-4 btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </dialog>
    </>
  );
};
