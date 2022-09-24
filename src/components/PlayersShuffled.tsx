import React, { useState } from "react";

type IProps = {
  selectedPlayers: string[];
};

export default function PlayersShuffled(props: IProps) {
  const [shuffledPlayers, setShuffledPlayers] = useState<string[]>([]);

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

  const shuffledPlayersElements = shuffledPlayers.map((playerName, index) => {
    return (
      <div className="player" key={index}>
        {playerName}
      </div>
    );
  });

  return (
    <div className="playersShuffled">
      <button onClick={shufflePlayers}>Vylosovat</button>
      <h2>Vylosovaní:</h2>
      <ul>{shuffledPlayersElements}</ul>
    </div>
  );
}
