import { useEffect, useState } from "react";
import Featured from "./components/Featured";
import Header from "./components/Header";
import axios from "axios";
import { Provider } from "react-redux";
import store from "@/store";
import ProductCard from "./components/ProductCard";
import CardRow from "./components/CardRow";

export default function Home() {
  const [products, setProducts] = useState([]);
  async function fetchProducts() {
    await axios.get("/api/products").then((res) => setProducts(res.data));
  }
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Provider store={store}>
      <main>
        <Header />
        <Featured />
        <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
          <CardRow itemsPerRow={3} cards={products} />
          {/* <ProductCard cardInfo={products && products[0]} />
          <ProductCard cardInfo={products && products[1]} />
          <ProductCard cardInfo={products && products[2]} /> */}
        </div>
      </main>
    </Provider>
  );
}
