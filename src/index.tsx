import "./styles/style.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";

// @ts-ignore
const icon = require.context("./styles/", false, /\.ico$/); // use webpack to load favicon.ico

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App></App>);
