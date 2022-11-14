import React, { useState } from "react";

export default function RandomSpells() {
  const [randomSpells, setRandomSpells] = useState("");

  const spells = [
    "Cannibals, Doppelganger, Hush",
    "Cannibals, Hush, Spirit Walk",
    "Cannibals, Spirit Walk, Whiteout",
    "Cannibals, Doppelganger, Spirit Walk",
    "Cannibals, Doppelganger, Whiteout",
    "Cannibals, Hush, Whiteout",
    "Doppelganger, Hush, Spirit Walk",
    "Doppelganger, Spirit Walk, Whiteout",
    "Doppelganger, Hush, Whiteout",
    "Hush, Spirit Walk, Whiteout"
  ];

  function rollSpells() {
    let randomIndex: number;

    do {
      randomIndex = Math.floor(Math.random() * spells.length);
    } while (spells[randomIndex] === randomSpells); // prevent same roll twice in a row

    setRandomSpells(spells[randomIndex]);
  }

  return (
    <section className="randomSpells">
      <h2>Random spelly</h2>
      <button className="roll" onClick={rollSpells}>
        Roll
      </button>
      <span className="spells">{randomSpells}</span>
    </section>
  );
}
