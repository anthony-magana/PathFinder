import React, { useState, useEffect } from "react";
import Node from "./Node";
import Astar from "./Astar/Astar";
import "./Pathfinder.css";

const cols = 25;
const rows = 10;

const START_NODE_ROW = 0;
const START_NODE_COL = 0;
const END_NODE_ROW = rows - 1;
const END_NODE_COL = cols - 1;

function Pathfinder() {
  const [grid, setGrid] = useState([]);
  const [path, setPath] = useState([]);
  const [visitedNodes, setVisitedNodes] = useState([]);

  useEffect(() => {
    initializeGrid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // creates grid
  const initializeGrid = () => {
    const Grid = new Array(rows);
    for (let i = 0; i < rows; i++) {
      Grid[i] = new Array(cols);
    }
    createSpot(Grid);
    setGrid(Grid);
    addNeighbours(Grid);
    const startNode = Grid[START_NODE_ROW][START_NODE_COL];
    const endNode = Grid[END_NODE_ROW][END_NODE_COL];
    let Path = Astar(startNode, endNode);
    startNode.isWall = false;
    endNode.isWall = false;

    setPath(Path.path);
    setVisitedNodes(Path.visitedNodes);
  };
  const createSpot = (Grid) => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        Grid[i][j] = new Spot(i, j);
      }
    }
  };

  // Add neighbours
  const addNeighbours = (Grid) => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        Grid[i][j].addneighbours(Grid);
      }
    }
  };

  // spot constructor
  function Spot(i, j) {
    this.x = i;
    this.y = j;
    this.isStart = this.x === START_NODE_ROW && this.y === START_NODE_COL;
    this.isEnd = this.x === END_NODE_ROW && this.y === END_NODE_COL;
    this.g = 0;
    this.f = 0;
    this.h = 0;
    this.neighbours = [];
    this.isWall = false;

    if (Math.random(1) < 0.2) {
      this.isWall = true;
    }
    this.previous = undefined;
    this.addneighbours = function (Grid) {
      let i = this.x;
      let j = this.y;
      if (i > 0) this.neighbours.push(Grid[i - 1][j]);
      if (i < rows - 1) this.neighbours.push(Grid[i + 1][j]);
      if (j > 0) this.neighbours.push(Grid[i][j - 1]);
      if (j < cols - 1) this.neighbours.push(Grid[i][j + 1]);
    };
  }

  // Grid with node
  const gridwithNode = (
    <div>
      {grid.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="rowWrapper">
            {row.map((col, colIndex) => {
              const { isStart, isEnd, isWall } = col;
              return (
                <Node
                  key={colIndex}
                  isStart={isStart}
                  isEnd={isEnd}
                  isWall={isWall}
                  row={rowIndex}
                  col={colIndex}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );

  const visualizeShortestPath = (shortestPathNodes) => {
    for (let i = 0; i < shortestPathNodes.length; i++) {
      setTimeout(() => {
        const node = shortestPathNodes[i];
        document.getElementById(`node-${node.x}-${node.y}`).className =
          "node node-shortest-path";
      }, 10 * i);
    }
  };
  const visualizePath = () => {
    for (let i = 0; i <= visitedNodes.length; i++) {
      if (i === visitedNodes.length) {
        setTimeout(() => {
          visualizeShortestPath(path);
        }, 20 * i);
      } else {
        setTimeout(() => {
          const node = visitedNodes[i];
          document.getElementById(`node-${node.x}-${node.y}`).className =
            "node node-visited";
        }, 20 * i);
      }
    }
  };

  const clearGrid = () => {
    for (let i = 0; i < visitedNodes.length; i++) {
      setTimeout(() => {
        const node = visitedNodes[i];
        document.getElementById(`node-${node.x}-${node.y}`).className =
          "node node-reset";
      }, 10 * i);
    }

    setPath([]);
    setVisitedNodes([]);
  };

  const reInitialize = () => {
    document.getElementById(
      `node-${START_NODE_ROW}-${START_NODE_COL}`
    ).className = "node node-start";
    document.getElementById(`node-${END_NODE_ROW}-${END_NODE_COL}`).className =
      "node node-end";
    initializeGrid();
  };

  return (
    <div className="wrapper">
      <h1>Path Finder</h1>
      <button className="visualize-btn" onClick={visualizePath}>
        Visualize Path
      </button>
      <button className="clear-grid-btn" onClick={clearGrid}>
        Clear grid
      </button>
      <button className="initialize-grid-btn" onClick={reInitialize}>
        Re-Initialize Grid
      </button>
      {gridwithNode}
    </div>
  );
}

export default Pathfinder;
