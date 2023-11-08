import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import ListPage from "./src/screens/ListPage";

export default function App() {
  return (
    <Provider store={store}>
      <ListPage />
    </Provider>
  );
}
