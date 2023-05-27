import React from "react";
import Header from "./Header";
import Featured from "./Featured";
import CardRow from "./CardRow";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { setAllProducts } from "@/slices/productsSlice";

const Landing = () => {
  const dispatch = useDispatch();
  async function fetchProducts() {
    await axios
      .get("/api/products")
      .then((res) => dispatch(setAllProducts(res.data)));
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main>
      <Header />
      <Featured />
      <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
        <CardRow itemsperrow={3} />
      </div>
    </main>
  );
};

export default Landing;
