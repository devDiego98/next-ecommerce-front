import store from "@/store";
import "@/styles/globals.css";
import { useEffect } from "react";
import axios from "axios";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { useDispatch } from "react-redux";
import { setAllProducts } from "@/slices/productsSlice";
import {
  setAllCategories,
  setAllSubCategories,
} from "@/slices/categoriesSlice";
import { useSession } from "next-auth/react";
import { setFavorites } from "@/slices/userDataSlice";
export function InitialStateManager({ children }) {
  const { data: session, status } = useSession();
  useEffect(() => {
    session?.user?.email && getUserInfo(session);
  }, [session]);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);
  async function getUserInfo(session) {
    await axios
      .get("/api/user", {
        params: {
          email: session?.user?.email,
        },
      })
      .then((res) => {
        dispatch(setFavorites(res.data.user.favorites));
      });
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
  async function fetchProducts() {
    await axios
      .get("/api/products")
      .then((res) => dispatch(setAllProducts(res.data)));
  }
  return <>{children}</>;
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <InitialStateManager>
          <Component {...pageProps} />
        </InitialStateManager>
      </Provider>
    </SessionProvider>
  );
}
