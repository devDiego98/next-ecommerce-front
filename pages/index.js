import { Provider } from "react-redux";
import store from "@/store";
import Landing from "./components/Landing";
import Layout from "./components/Layout";

export default function Home() {
  return (
    <Provider store={store}>
      <Layout>
        <Landing />
      </Layout>
    </Provider>
  );
}
