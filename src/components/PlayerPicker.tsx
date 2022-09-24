import React from "react";
import EditableButton from "./EditableButton";

export default function PlayerPicker() {
  function addPlayer(playerName: string) {
    console.log("Added player: ", playerName);
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
