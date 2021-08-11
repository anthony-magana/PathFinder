import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <nav className={styles.Nav}>
      <div className={styles.Nav_container}>
        <NavLink to="/" className={styles.Nav_brand}>
          <h3>Path Finder</h3>
        </NavLink>

        <div className={styles.Nav_right}>
          <ul className={styles.Nav_item_wrapper}>
            <li className={styles.Nav_item}>
              <NavLink
                activeClassName={styles.selected}
                className={styles.Nav_link}
                to="/"
                exact={true}
              >
                Astar
              </NavLink>
            </li>
            <li className={styles.Nav_item}>
              <NavLink
                activeClassName={styles.selected}
                className={styles.Nav_link}
                to="/dijkstra"
              >
                Dijkstra
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
