import React, { useEffect, useState } from "react";

type IProps = {
  selectedPlayers: string[];
};

// shuffles selected players, displays shuffled output, copies output to clipboard
export default function PlayersShuffled(props: IProps) {
  const [shuffledPlayers, setShuffledPlayers] = useState<string[]>([]);
  const [copiedVisible, setCopiedVisible] = useState(false);

  // hide copied popup after 4 seconds
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (copiedVisible === true) {
      timeout = setTimeout(() => {
        setCopiedVisible(false);
      }, 4000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [copiedVisible]);

  const roles = [
    "Captain ⚓",
    "Chaplain ✝️",
    "Cook 🥩",
    "Doctor 💉",
    "Engineer 🔧",
    "Hunter 🏹",
    "Royal Marine 🔫",
    "Navigator 🔭"
  ];

  // shuffle players and automatically copy the output to clipboard
  function shufflePlayers() {
    const selectedPlayersCopy = [...props.selectedPlayers];

    // bad luck protection - nobody gets the same role twice
    let noRepeats = false;
    while (noRepeats === false) {
      shuffleArray(selectedPlayersCopy);

      noRepeats = checkIfNoRepeats(shuffledPlayers, selectedPlayersCopy);
    }

    setShuffledPlayers(selectedPlayersCopy);

    copyToClipboard(selectedPlayersCopy);
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

  // return true if there is no repeat, return false is there is repeat
  // repeat == someone's name is at the same index in both arrays
  // which will result in them getting the same role twice (same as last game)
  function checkIfNoRepeats(arrayOriginal: string[], arrayNew: string[]) {
    let noRepeats = true;

    arrayOriginal.forEach((nameOriginal, indexOriginal) => {
      if (arrayNew[indexOriginal] === nameOriginal) {
        noRepeats = false;
      }
    });

    return noRepeats;
  }

  function copyToClipboard(playersShuffled: string[]) {
    setCopiedVisible(true); // start timer

    const clipboardText = constructClipboardText(playersShuffled);

    // monospaced font for discord
    clipboardText.unshift("```");
    clipboardText.push("```");

    // save each playerName+dots+role to new line
    navigator.clipboard.writeText(clipboardText.join("\n")).then(
      () => {
        // succesfull copy
      },
      (error) => {
        console.log("Clipboard error: ", error);
      }
    );
  }

  // show shuffled players and their roles as html list
  const clipboardText = constructClipboardText(shuffledPlayers);
  const shuffledPlayersElements = clipboardText.map((line, index) => {
    return (
      <li className="player" key={index}>
        {line}
      </li>
    );
  });

  function constructClipboardText(playersShuffled: string[]) {
    const clipboardText: string[] = [];

    // create padded text output, so every line has the same number of characters
    const longestPlayerAndRole = Math.max(
      ...playersShuffled.map((player, index) => player.length + roles[index].length)
    );

    playersShuffled.forEach((playerName, index) => {
      const playerRole = roles[index];

      let dots = longestPlayerAndRole - playerName.length - playerRole.length + 3;

      // override for captain
      if (index === 0) {
        // less dots because of weird monospace spacing of emojis
        dots--;
      }

      clipboardText.push(playerName + ".".repeat(dots) + playerRole);
    });

    return clipboardText;
  }

  return (
    <section className="shuffler">
      <h1>Přidělené role</h1>
      <ol className="shuffledPlayers">{shuffledPlayersElements}</ol>

      <button
        className="shuffle"
        onClick={() => {
          // 8 is max ammount of players
          if (props.selectedPlayers.length <= 8) {
            shufflePlayers();
          }
        }}
      >
        Vylosovat
      </button>

      <button
        className="copy"
        onClick={() => {
          copyToClipboard(shuffledPlayers);
        }}
      >
        Zkopírovat
      </button>

      {copiedVisible && <div className="popup">Zkopírováno!</div>}
    </section>
  );
}
