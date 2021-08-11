import "./App.css";
import Pathfinder from "./components/Pathfinder";
import DijkstraVisualizer from "./components/Dijkstra/DijkstraVisualizer";
import Nav from "./components/Navbar/Nav";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route exact component={Pathfinder} path="/" />
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
