import React, { useContext } from "react";
import { ProductContext } from "../utils/Context";
import { Link } from "react-router-dom";
import style from "./style.module.css";

function NavBar() {
  const { products } = useContext(ProductContext);
  let distCategory =
    products && products.reduce((acc, cv) => [...acc, cv.category], []);
  // console.log(distCategory);

  distCategory = [...new Set(distCategory)]; // remove duplicates
  // console.log(distCategory);

  const color = () => {
    return `rgba(${(Math.random() * 255).toFixed()}, ${(
      Math.random() * 255
    ).toFixed()}, ${(Math.random() * 255).toFixed()}, 0.6)`;
  };

  return (
    <nav className="w-[15%] h-full bg-zinc-200 flex flex-col items-center pt-5">
      <a className="px-5 py-2 rounded border border-zinc-400" href="/create">
        Add new products
      </a>
      <hr className="w-[80%] my-3 h-[1.2px] bg-zinc-400" />
      <h1 className="mb-3 text-2xl w-[80%] font-semibold">Categorey Filter</h1>

      <div className="mb-3  w-[80%]">
        {distCategory.map((cat, i) => (
          <Link
            key={i}
            to={`/?category=${cat}`}
            className={`mb-5 w-fit flex items-center uppercase relative ${style.a}`}
          >
            <span
              style={{
                backgroundColor: color(),
              }}
              className="rounded-full mr-2 h-[10px] w-[10px] "
            ></span>
            {cat}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default NavBar;
