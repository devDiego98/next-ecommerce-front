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
  return (
    <main>
      <Featured />
      <LandingFirstSection />
    </main>
  );
};

export default Landing;
