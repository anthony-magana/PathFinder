import "./App.css";
import AstarVisualizer from "./components/Astar/AstarVisualizer";
import DijkstraVisualizer from "./components/Dijkstra/DijkstraVisualizer";
import Nav from "./components/Navbar/Nav";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route exact component={AstarVisualizer} path="/" />
          <Route exact component={DijkstraVisualizer} path="/dijkstra" />
          <Route>
            <h1>Error 404</h1>
            <Link to="/">Go to home page?</Link>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
