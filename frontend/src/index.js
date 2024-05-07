import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "antd/dist/reset.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

////////////////////////////////////////////////
import { Provider } from "react-redux";
import store from "./redux/features/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  ///////////////////////////////////// provider added/////////////
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
