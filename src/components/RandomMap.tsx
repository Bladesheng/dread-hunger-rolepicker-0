import React, { useState } from "react";

export default function RandomMap() {
  const [randomMap, setRandomMap] = useState("");

  const maps = ["Summit", "Approach", "Expanse"];

  function rollMap() {
    let randomIndex: number;

    do {
      randomIndex = Math.floor(Math.random() * maps.length);
    } while (maps[randomIndex] === randomMap); // prevent same roll twice in a row

    setRandomMap(maps[randomIndex]);
  }

  return (
    <section className="randomMap">
      <h2>Random mapa</h2>
      <button className="roll" onClick={rollMap}>
        Roll
      </button>
      <span className="map">{randomMap}</span>
    </section>
  );
}
