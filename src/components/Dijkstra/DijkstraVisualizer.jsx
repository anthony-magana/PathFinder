import React, { useState, useEffect } from "react";
import Grid from "../Grid";
import { dijkstra, getNodesInShortestPathOrder } from "./Dijkstra";
import "./DijkstraVisualizer.css";

const cols = 25;
const rows = 10;

function DijkstraPathFinder() {
  const [grid, setGrid] = useState([]);
  const [path, setPath] = useState([]);
  const [visitedNodes, setVisitedNodes] = useState([]);

  const START_NODE_ROW = 0;
  const START_NODE_COL = 0;
  const END_NODE_ROW = rows - 1;
  const END_NODE_COL = cols - 1;

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
        currRow.push(createNode(col, row));
      }
      Nodes.push(currRow);
    }
    setGrid(Nodes);
  };

  function visualizeDijkstra() {
    const Nodes = grid;
    const startNode = Nodes[START_NODE_ROW][START_NODE_COL];
    const endNode = Nodes[END_NODE_ROW][END_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, endNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);
    setVisitedNodes(visitedNodesInOrder);
    setPath(nodesInShortestPathOrder);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  function animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 15 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 15 * i);
    }
  }
  function animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 10 * i);
    }
  }
  const createNode = (col, row) => {
    return {
      col,
      row,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isEnd: row === END_NODE_ROW && col === END_NODE_COL,
      distance: Infinity,
      isVisited: false,
      isWall:
        Math.random(1) < 0.2 && END_NODE_COL !== col && END_NODE_ROW !== row
          ? true
          : false,
      previousNode: null,
    };
  };

  function clear() {
    for (let i = 0; i < visitedNodes.length; i++) {
      if (i === visitedNodes.length) {
        setTimeout(() => {
          for (let j = 0; j < path.length; j++) {
            setTimeout(() => {
              const node = path[j];
              document.getElementById(
                `node-${node.row}-${node.col}`
              ).className = "node node-reset";
            }, 5 * j);
          }
        }, 10 * i);
      }
      setTimeout(() => {
        const node = visitedNodes[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-reset";
      }, 10 * i);
    }
    // setPath([]);
    // setVisitedNodes([]);
    setTimeout(() => {
      reInitialize();
    }, 2200);
  }
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
      <div className="container">
        <h1 className="dijkstra-title">Dijkstra Visualization</h1>
        <button className="visualize-dijkstra-btn" onClick={visualizeDijkstra}>
          Visualize Path
        </button>
        <button className="clear-btn" onClick={clear}>
          clear
        </button>
      </div>

      {/* gridwithnode */}
      <Grid grid={grid} />
    </div>
  );
}

export default DijkstraPathFinder;
