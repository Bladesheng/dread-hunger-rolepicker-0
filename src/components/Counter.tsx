import React from "react";

type IProps = {
  playerCount: number;
};

export default function Counter(props: IProps) {
  // set class based on playerCount
  const statusClass =
    // 8 is maximum
    (props.playerCount === 8 && " full") || (props.playerCount > 8 && " overflow") || "";

  return <h1 className={"counter" + statusClass}>{props.playerCount + "/8 hráčů"}</h1>;
}
