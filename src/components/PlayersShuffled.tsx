import React, { useState } from "react";

type IProps = {
  selectedPlayers: string[];
};

export default function PlayersShuffled(props: IProps) {
  const [shuffledPlayers, setShuffledPlayers] = useState<string[]>([]);

  const roles = [
    "Captain ⚓",
    "Chaplain ✝",
    "Cook 🥩",
    "Doctor 💉",
    "Engineer 🔧",
    "Hunter 🏹",
    "Royal Marine 🔫",
    "Navigator 🔭"
  ];

  function shufflePlayers() {
    const selectedPlayersCopy = [...props.selectedPlayers];

    shuffleArray(selectedPlayersCopy);

    setShuffledPlayers(selectedPlayersCopy);

    console.log("Shuffled players: ", selectedPlayersCopy);
  }

  // Fisher-Yates (Knuth) shuffle
  // https://stackoverflow.com/a/2450976
  function shuffleArray(array: string[]) {
    let currentIndex = array.length;
    let randomIndex;

    // while there remain elements to shuffle
    while (currentIndex !== 0) {
      // pick a random remaining element
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // and swap it with the current element
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  const clipboardText: string[] = [];

  function copyToClipboard() {
    navigator.clipboard.writeText(clipboardText.join("\n")).then(
      () => {
        console.log("Copied to clipboard");
      },
      (error) => {
        console.log("Clipboard error: ", error);
      }
    );
  }

  const shuffledPlayersElements = shuffledPlayers.map((playerName, index) => {
    clipboardText.push(`${playerName}......${roles[index]}`);
    return (
      <div className="player" key={index}>
        {playerName}......{roles[index]}
      </div>
    );
  });

  // prevents erasing clipboard on page load
  if (shuffledPlayersElements.length > 0) {
    copyToClipboard(); // copy text to clipboard after shuffle
  }

  return (
    <div className="playersShuffled">
      <button className="shuffle" onClick={shufflePlayers}>
        Vylosovat
      </button>
      <h2>Přidělené role</h2>
      <ul>{shuffledPlayersElements}</ul>
      <button className="copy" onClick={copyToClipboard}>
        Zkopírovat
      </button>
    </div>
  );
}
