import React from "react";
import Home from "./components/Home";
import Create from "./components/Create";
import Edits from "./components/Edits";
import Details from "./components/Details";
import { Routes, Route, Link, useLocation } from "react-router-dom";
function App() {
  const { search, pathname } = useLocation();
  return (
    <div className="h-screen w-screen bg-zinc-100 flex ">
      {(pathname != "/" || search.length > 0) && (
        <Link
          to="/"
          className="h-fit w-fit bg-zinc-100 border border-zinc-400 px-2 py-1 mb-4 text-black-600 text-sm absolute left-[16.5%] top-[3%]"
        >
          Home
        </Link>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/edit/:id" element={<Edits />} />
      </Routes>
    </div>
  );
}

export default App;
