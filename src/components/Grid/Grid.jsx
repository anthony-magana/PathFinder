import React from "react";
import Node from "../Node/Node";
import "./Grid.css";

const Grid = ({ grid }) => {
  return (
    <div>
      {grid.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="rowWrapper">
            {row.map((node, Index) => {
              const { isStart, isEnd, isWall } = node;
              return (
                <Node
                  key={Index}
                  isStart={isStart}
                  isEnd={isEnd}
                  isWall={isWall}
                  row={rowIndex}
                  col={Index}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
