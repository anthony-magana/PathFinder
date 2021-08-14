import React, { useState, useEffect } from "react";
import Grid from "../Grid";
import "./DikjstraVisualizer.css";

const cols = 25;
const rows = 10;

function DijkstraPathFinder() {
  const [grid, setGrid] = useState([]);
  // const [path, setPath] = useState([]);
  // const [visitedNodes, setVisitedNodes] = useState([]);

  useEffect(() => {
    initializeGrid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // creates grid
  const initializeGrid = () => {
    const Nodes = [];
    for (let row = 0; row < rows; row++) {
      const currRow = [];
      for (let col = 0; col < cols; col++) {
        currRow.push([]);
      }
      Nodes.push(currRow);
    }
    setGrid(Nodes);
  };

  return (
    <div className="wrapper">
      <div className="container">
        <h1 className="dijkstra-title">Dijkstra Visualization (coming soon)</h1>
      </div>

      {/* gridwithnode */}
      <Grid grid={grid} />
    </div>
  );
}

export default DijkstraPathFinder;
