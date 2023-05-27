import { Provider } from "react-redux";
import store from "@/store";
import Landing from "./components/Landing";

export default function Home() {
  return (
    <Provider store={store}>
      <Landing />
    </Provider>
  );
}
