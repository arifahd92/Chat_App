import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//import 'bootstrap/dist/js/bootstrap.min.js';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import PopupExample from "./components/chat/ChatUI";
//In summary, if your project requires Popper.js for certain components (e.g., tooltips, popovers), it's advisable to
// use bootstrap.bundle.min.js. If your project doesn't use these components,
//you can use bootstrap.min.js to include only Bootstrap's core JavaScript, potentially resulting in a smaller file size.

//Choose the one that fits your project's requirements. If you're uncertain, using bootstrap.bundle.min.js is a safe option as
//it includes everything needed for most Bootstrap components.

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </>
);
