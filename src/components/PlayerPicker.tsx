import React, { useState } from "react";
import EditableButton from "./EditableButton";
import PlayersShuffled from "./PlayersShuffled";
import Player from "./Player";

export type IPlayers = {
  [playerName: string]: boolean; // false == not selected, true == selected
};

export default function PlayerPicker() {
  const [players, setPlayers] = useState<IPlayers>({});

  function addPlayer(playerName: string) {
    if (playerName in players) return; // abort if name is duplicate

    const playersCopy = structuredClone(players);

    playersCopy[playerName] = false; // unselect new players by default
    setPlayers(playersCopy);

    console.log("Added player: ", playerName);
  }

  function removePlayer(playerName: keyof IPlayers) {
    const playersCopy = structuredClone(players);

    delete playersCopy[playerName];

    setPlayers(playersCopy);

    console.log("Removed player: ", playerName);
  }

  function togglePlayer(playerName: keyof IPlayers) {
    // if player is selected already, deselect him
    if (players[playerName] === true) {
      const playersCopy = structuredClone(players);
      playersCopy[playerName] = false;
      setPlayers(playersCopy);

      console.log("Deselected player: ", playerName);
    }
    // if player is not selected yet, select him
    else {
      // check how many players are already selected
      let selectedPlayers = 0;
      for (const player in players) {
        if (players[player] === true) {
          selectedPlayers++;
        }
      }
      if (selectedPlayers === 8) return; // abort if 8 players are already selected (8 is maximum)

      const playersCopy = structuredClone(players);
      playersCopy[playerName] = true;
      setPlayers(playersCopy);

      console.log("Selected player: ", playerName);
    }
  }

  // create Player element for each entry in "players" state
  const playersElements = [] as JSX.Element[];
  for (const [playerName, selected] of Object.entries(players)) {
    playersElements.push(
      <Player
        key={playerName}
        playerName={playerName}
        selected={selected}
        removePlayer={removePlayer}
        togglePlayer={togglePlayer}
      ></Player>
    );
  }

  return (
    <main className="playerPicker">
      <div className="playersList">
        <div>{playersElements}</div>
        <EditableButton saveInput={addPlayer}></EditableButton>
      </div>
      <button>Vylosovat</button>
      <PlayersShuffled players={players}></PlayersShuffled>
    </main>
  );
}
