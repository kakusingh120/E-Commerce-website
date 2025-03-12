import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../utils/Context";
import { nanoid } from "nanoid";
import { useNavigate, useParams } from "react-router-dom";

function Edits() {
  const { products, setProducts } = useContext(ProductContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({
    title: "",
    image: "",
    price: "",
    category: "",
    description: "",
  });

  const changeHandler = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // useEffect(() => {
  //   setProduct(product.filter((p) => p.id == id)[0]);
  // }, [id]);

  useEffect(() => {
    console.log("Products:", products); // Ensure products array is populated
  console.log("ID from params:", id);
    const foundProduct = products.find((p) => p.id === id); // Find the product by id
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id, products]);

  // useEffect(() => {
  //   const numericId = Number(id); // Convert id to number if necessary
  //   const foundProduct = products.find((p) => p.id === numericId);
  //   if (foundProduct) {
  //     setProduct(foundProduct);
  //   }
  // }, [id, products]);

  const addProductHandler = (e) => {
    e.preventDefault();
    if (
      product.title.trim().length < 5 ||
      product.image.trim().length < 5 ||
      product.price.trim().length < 1 ||
      product.category.trim().length < 5 ||
      product.description.trim().length < 5
    ) {
      alert("Please fill all fields with valid data");
      return;
    }

    const pi = products.findIndex((p) => p.id == id);
    const copyData = [...products];
    copyData[pi] = { ...products[pi], ...product };

    // console.log(product);
    // console.log(copyData);

    setProducts(copyData);
    localStorage.setItem("products", JSON.stringify(copyData));
    navigate(-1);
    // toast.success("New product added!!");
  };

  return (
    <form
      onSubmit={addProductHandler}
      className="p-[5%] h-screen w-screen flex flex-col items-center "
      action=""
    >
      <h1 className="mb-5 text-3xl w-1/2">Edit Product</h1>

      <input
        type="url"
        placeholder="image link"
        name="image"
        className="text-lg mb-3 py-1 pl-1 border-2 border-zinc-300 bg-zinc-100 rounded w-1/2"
        onChange={changeHandler}
        // value={product && product.image}
        value={product?.image || ""}
      />

      <input
        type="text"
        placeholder="title"
        name="title"
        className="text-lg mb-3 py-1 pl-1 border-2 border-zinc-300 bg-zinc-100 rounded w-1/2"
        onChange={changeHandler}
        // value={product && product.title}
        value={product?.title || ""}
      />

      <div className="w-1/2 flex justify-between">
        <input
          type="text"
          placeholder="categories"
          name="category"
          className="text-lg mb-3 py-1 pl-1 border-2 border-zinc-300 bg-zinc-100 rounded w-[48%]"
          onChange={changeHandler}
          // value={product && product.category}
          value={product?.category || ""}
        />

        <input
          type="number"
          placeholder="price"
          name="price"
          className="text-lg mb-3 py-1 pl-1 border-2 border-zinc-300 bg-zinc-100 rounded w-[48%]"
          onChange={changeHandler}
          // value={product && product.price}
          value={product?.price || ""}
        />
      </div>
      <textarea
        className="text-lg mb-3 py-1 pl-1 border-2 border-zinc-300 bg-zinc-100 rounded w-1/2"
        placeholder="Enter product description here..."
        name="description"
        rows="8"
        onChange={changeHandler}
        // value={product && product.description}
        value={product?.description || ""}
      ></textarea>

      <div className="w-1/2">
        <button className="px-5 py-2 rounded border border-zinc-400">
          Edit product
        </button>
      </div>
    </form>
  );
}

export default Edits;
