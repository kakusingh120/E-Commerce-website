import React, { useContext, useEffect, useState } from "react";
import axios from "../utils/axios";
import NavBar from "./NavBar";
import Loading from "./Loading";
import { Link, useLocation } from "react-router-dom";
import { ProductContext } from "../utils/Context";

function Home() {
  const { products } = useContext(ProductContext);
  const { search } = useLocation();
  const category = new URLSearchParams(search).get("category") || ""; // Safely extract category
  const [filterProducts, setfilterProducts] = useState(null);

  const getProductCategory = async () => {
    try {
      const { data } = await axios.get(`/products/category/${category}`);
      setfilterProducts(data);
    } catch (err) {
      console.error("Error fetching category products:", err);
    }
  };

  // useEffect(() => {
  //   if (category) {
  //     getProductCategory(); // Fetch category-specific products
  //   } else {
  //     setfilterProducts(products); // Show all products when no category is selected
  //   }
  // }, [category, products]);


  useEffect(() => {
    if (products) {
      if (!category) {
        setfilterProducts(products); // Show all products if no category is selected
      } else {
        setfilterProducts(products.filter((p) => p.category === category)); // Filter by category
      }
    }
  }, [category, products]);
  

  return products ? (
    <>
      <NavBar />
      <div className="home w-[85%] p-10 pt-[4%] pl-[8%] flex gap-5 flex-wrap overflow-hidden overflow-y-auto ">
        {filterProducts &&
          filterProducts.map((p) => (
            <Link
              key={p.id} // Ensure unique key
              to={`/details/${p.id}`}
              className="card w-[21%] h-[38vh] bg-white mb-3 mr-3 p-3 rounded border-[1px] border-zinc-400 shadow-md flex flex-col items-center justify-center"
            >
              <div
                className="w-full h-[80%] mb-3 bg-contain bg-no-repeat bg-center hover:scale-105 transition-all ease-in-out"
                style={{
                  backgroundImage: `url(${p.image})`,
                }}
              ></div>
              <h1>{p.title}</h1>
            </Link>
          ))}
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default Home;
