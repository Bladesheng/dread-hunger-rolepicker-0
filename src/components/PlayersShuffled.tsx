import React from "react";
import { IPlayers } from "./PlayerPicker";
import Player from "./Player";

type IProps = {
  players: IPlayers;
};

export default function PlayersShuffled(props: IProps) {
  return <div className="playersShuffled">shuffled players</div>;
}
