import React, { useContext, useState } from "react";
import { ProductContext } from "../utils/Context";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Create() {
  const navigate = useNavigate();
  const { products, setProducts } = useContext(ProductContext);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const addProductHandler = (e) => {
    e.preventDefault();
    if (
      title.trim().length < 5 ||
      image.trim().length < 5 ||
      price.trim().length < 1 ||
      category.trim().length < 5 ||
      description.trim().length < 5
    ) {
      alert("Please fill all fields with valid data");
      return;
    }

    const product = {
      id: nanoid(),
      title,
      image,
      price,
      category,
      description,
    };
    setProducts([...products, product]);
    localStorage.setItem("products", JSON.stringify([...products, product]));
    navigate("/");
    toast.success("Product Added Successfully!");
  };

  return (
    <form
      onSubmit={addProductHandler}
      className="p-[5%] h-screen w-screen flex flex-col items-center "
      action=""
    >
      <h1 className="mb-5 text-3xl w-1/2">Add new products</h1>

      <input
        type="url"
        placeholder="image link"
        className="text-lg mb-3 py-1 pl-1 border-2 border-zinc-300 bg-zinc-100 rounded w-1/2"
        onChange={(e) => setImage(e.target.value)}
        value={image}
      />

      <input
        type="text"
        placeholder="title"
        className="text-lg mb-3 py-1 pl-1 border-2 border-zinc-300 bg-zinc-100 rounded w-1/2"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <div className="w-1/2 flex justify-between">
        <input
          type="text"
          placeholder="categories"
          className="text-lg mb-3 py-1 pl-1 border-2 border-zinc-300 bg-zinc-100 rounded w-[48%]"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        />

        <input
          type="number"
          placeholder="price"
          className="text-lg mb-3 py-1 pl-1 border-2 border-zinc-300 bg-zinc-100 rounded w-[48%]"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
      </div>
      <textarea
        className="text-lg mb-3 py-1 pl-1 border-2 border-zinc-300 bg-zinc-100 rounded w-1/2"
        placeholder="Enter product description here..."
        rows="8"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      ></textarea>

      <div className="w-1/2">
        <button className="px-5 py-2 rounded border border-zinc-400">
          Add new products
        </button>
      </div>
    </form>
  );
}

export default Create;
