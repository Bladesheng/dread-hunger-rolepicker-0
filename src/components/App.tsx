import React from "react";
import Footer from "./Footer";
import PlayerPicker from "./PlayerPicker";
import PlayerOutput from "./PlayerOutput";

export default function App() {
  return (
    <div className="app">
      <PlayerPicker></PlayerPicker>
      <PlayerOutput></PlayerOutput>
      <Footer></Footer>
    </div>
  );
}
