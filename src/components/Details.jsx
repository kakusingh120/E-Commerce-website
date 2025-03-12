import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axios";
import Loading from "./Loading";
import { ProductContext } from "../utils/Context";

function Details() {
  const navigate = useNavigate();
  const { products, setProducts } = useContext(ProductContext);

  const [product, setProduct] = useState(null);
  const { id } = useParams();

  // const getSingleProduct = async () => {
  //   try {
  //     const { data } = await axios.get(`/products/${id}`);
  //     setProduct(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   if(!product) {
  //     setProducts(products.filter((p) => p.id == id)[0]);
  //   }
  // }, []);

  useEffect(() => {
    const singleProduct = products.find((p) => p.id == id);
    if (singleProduct) {
      setProduct(singleProduct);
    } else {
      console.error("Product not found!");
    }
  }, [products, id]);

  const productDeleteHandler = (id) => {
    // Filter out the product with the given id
    const filterProducts = products.filter((p) => p.id != id);

    // Update the products context
    setProducts(filterProducts);

    // Persist the updated list to localStorage
    localStorage.setItem("products", JSON.stringify(filterProducts)); // Fix localStorage.setItem

    // Navigate back to the home page
    navigate("/");
  };

  return product ? (
    <div className="w-[70%] bg-white h-full justify-between items-center m-auto flex py-[10%] ">
      <img
        className="object-contain h-[80%] w-[40%] ml-[6%]"
        src={`${product.image}`}
        alt=""
      />
      <div className="content w-[50%] pr-12">
        <h1 className="text-4xl ">{product.title}</h1>
        <h3 className="text-zinc-500 mt-5 mb-3">{product.category}</h3>
        <h1 className="text-red-400 mb-3">$ {product.price}</h1>
        <p className="mb-[5%]">{product.description}</p>
        <Link
          to={`/edit/${product.id}`}
          className="px-3 py-1 mr-5 rounded border-2 border-blue-400 text-blue-600"
        >
          Edit
        </Link>
        <button
          onClick={() => productDeleteHandler(product.id)}
          className="px-3 py-1 rounded border-2 border-red-400 text-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default Details;
