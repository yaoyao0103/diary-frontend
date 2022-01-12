import ReactDOM from "react-dom"; // ReactDOM 負責渲染 component
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.js"; // App is a component

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
); // root is in public/index.html
