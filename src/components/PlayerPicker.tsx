import React, { useEffect, useState } from "react";
import EditableButton from "./EditableButton";
import PlayersShuffled from "./PlayersShuffled";
import Player from "./Player";
import { Storage } from "./Storage";

Storage.init();

export default function PlayerPicker() {
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>(Storage.selectedPlayers);
  const [unselectedPlayers, setUnselectedPlayers] = useState<string[]>(Storage.unselectedPlayers);

  // update local storage when either state changes
  useEffect(() => {
    Storage.selectedPlayers = selectedPlayers;
  }, [selectedPlayers]);

  useEffect(() => {
    Storage.unselectedPlayers = unselectedPlayers;
  }, [unselectedPlayers]);

  function addPlayer(playerName: string) {
    // abort if name is a duplicate
    if (selectedPlayers.includes(playerName) || unselectedPlayers.includes(playerName)) return;

    const unselectedPlayersCopy = [...unselectedPlayers];

    // add new players to unselect by default
    // add them to the end, so they "replace" the editable button
    unselectedPlayersCopy.push(playerName);

    setUnselectedPlayers(unselectedPlayersCopy);

    console.log("Added player: ", playerName);
  }

  function removePlayer(playerName: string) {
    if (unselectedPlayers.includes(playerName)) {
      const unselectedPlayersFiltered = unselectedPlayers.filter((player) => {
        return player !== playerName;
      });

      setUnselectedPlayers(unselectedPlayersFiltered);
    } else {
      const selectedPlayersFiltered = selectedPlayers.filter((player) => {
        return player !== playerName;
      });

      setSelectedPlayers(selectedPlayersFiltered);
    }

    console.log("Removed player: ", playerName);
  }

  function togglePlayer(playerName: string) {
    // if player is selected already, deselect him
    if (selectedPlayers.includes(playerName)) {
      // remove player from selected
      const selectedPlayersFiltered = selectedPlayers.filter((player) => {
        return player !== playerName;
      });
      setSelectedPlayers(selectedPlayersFiltered);

      // and add him to unselected
      const unselectedPlayersCopy = [...unselectedPlayers];
      unselectedPlayersCopy.unshift(playerName); // add player to begining, so frequent players are at the top!
      setUnselectedPlayers(unselectedPlayersCopy);

      console.log("Deselected player: ", playerName);
    }
    // if player is not selected yet, select him
    else {
      // remove player from unselected
      const unselectedPlayersFiltered = unselectedPlayers.filter((player) => {
        return player !== playerName;
      });
      setUnselectedPlayers(unselectedPlayersFiltered);

      // and add him to selected
      const selectedPlayersCopy = [...selectedPlayers];
      selectedPlayersCopy.push(playerName); // add player to end, so frequent players are at the top!
      setSelectedPlayers(selectedPlayersCopy);

      console.log("Selected player: ", playerName);
    }
  }

  // create clickable Player elements for all players
  const selectedPlayersElements = [] as JSX.Element[];
  const unselectedPlayersElements = [] as JSX.Element[];

  for (const playerName of selectedPlayers) {
    selectedPlayersElements.push(
      <Player
        key={playerName}
        playerName={playerName}
        selected={true}
        removePlayer={removePlayer}
        togglePlayer={togglePlayer}
      ></Player>
    );
  }

  for (const playerName of unselectedPlayers) {
    unselectedPlayersElements.push(
      <Player
        key={playerName}
        playerName={playerName}
        selected={false}
        removePlayer={removePlayer}
        togglePlayer={togglePlayer}
      ></Player>
    );
  }
  // insert editable button at the end, so it gets "replaced" by new players
  unselectedPlayersElements.push(
    <EditableButton saveInput={addPlayer} key={"editableButton"}></EditableButton>
  );

  return (
    <main className="playerPicker">
      <ul className="selectedPlayers">{selectedPlayersElements}</ul>
      <ul className="unselectedPlayers">{unselectedPlayersElements}</ul>

      <PlayersShuffled selectedPlayers={selectedPlayers}></PlayersShuffled>
    </main>
  );
}
