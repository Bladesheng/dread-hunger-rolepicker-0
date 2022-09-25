import React from "react";

type IProps = {
  playerName: string;
  selected: boolean;
  removePlayer: (playerName: string) => void;
  togglePlayer: (playerName: string) => void;
};

// clickable player button, you can toggle selected/unselected status or delete the player completely
export default function Player(props: IProps) {
  return (
    <li className={"player " + (props.selected ? "selected" : "")}>
      <button
        className="toggle"
        onClick={() => {
          props.togglePlayer(props.playerName);
        }}
      >
        {props.playerName}
      </button>

      <button
        className="remove"
        onClick={() => {
          props.removePlayer(props.playerName);
        }}
      >
        X
      </button>
    </li>
  );
}
