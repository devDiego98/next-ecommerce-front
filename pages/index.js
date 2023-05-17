import { useEffect } from "react";
import Featured from "./components/Featured";
import Header from "./components/Header";
import axios from "axios";

async function fetchProducts() {
  await axios.get("/api/products").then(console.log);
}
export default function Home() {
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main>
      <Header />
      <Featured />
    </main>
  );
}
