import React from "react";
import Header from "./Header";
import Featured from "./Featured";
import CardRow from "./CardRow";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { setAllProducts } from "@/slices/productsSlice";
import LandingFirstSection from "./LandingFirstSection";

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
      <LandingFirstSection />
      {/* <CardRow itemsperrow={3} /> */}
    </main>
  );
};

export default Landing;
