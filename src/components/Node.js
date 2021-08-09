import React from "react";
import "./Node.css";

function Node({ isStart, isEnd, isWall, row, col }) {
  const classes = isStart
    ? "node-start"
    : isWall
    ? "node-wall"
    : isEnd
    ? "node-end"
    : "";
  return <div className={`node ${classes}`} id={`node-${row}-${col}`}></div>;
}

export default Node;
