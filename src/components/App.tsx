import React from "react";
import Footer from "./Footer";
import PlayerPicker from "./PlayerPicker";

// @ts-ignore
const icon = require.context("../styles/", false, /\.ico$/); // use webpack to load favicon.ico

export default function App() {
  return (
    <div className="app">
      <PlayerPicker></PlayerPicker>
      <Footer></Footer>
    </div>
  );
}
