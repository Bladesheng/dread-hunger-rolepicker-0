import React, { useState } from "react";
import EditableButton from "./EditableButton";

type IPlayers = {
  [playerName: string]: boolean; // false == not selected, true == selected
};

export default function PlayerPicker() {
  const [players, setPlayers] = useState<IPlayers>({});

  function addPlayer(playerName: string) {
    if (playerName in players) return; // abort if name is duplicate

    const playersCopy = structuredClone(players);
    playersCopy[playerName] = false; // player is turned off by default
    setPlayers(playersCopy);

    console.log("Added player: ", playerName);
  }

  function removePlayer(playerName: string) {
    console.log("Removed player: ", playerName);
  }

  return (
    <div className="playerPicker">
      <div className="players">
        <EditableButton saveInput={addPlayer}></EditableButton>
      </div>
      <button>Vylosovat</button>
    </div>
  );
}
