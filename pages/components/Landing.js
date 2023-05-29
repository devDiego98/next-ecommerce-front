import React from "react";
import Featured from "./Featured";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { setAllProducts } from "@/slices/productsSlice";
import {
  setAllCategories,
  setAllSubCategories,
} from "@/slices/categoriesSlice";
import LandingFirstSection from "./LandingFirstSection";

const Landing = () => {
  const dispatch = useDispatch();
  async function fetchProducts() {
    await axios
      .get("/api/products")
      .then((res) => dispatch(setAllProducts(res.data)));
  }
  async function fetchCategories() {
    await axios.get("/api/categories").then((res) => {
      let category = [];
      let subCategory = [];
      res.data.forEach((cat) => {
        cat.parentCategory._id ? subCategory.push(cat) : category.push(cat);
      });
      dispatch(setAllCategories(category));
      dispatch(setAllSubCategories(subCategory));
    });
  }

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <main>
      <Featured />
      <LandingFirstSection />
    </main>
  );
};

export default Landing;
