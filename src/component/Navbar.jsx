import React from "react";
import _ from "lodash";
import { NavLink, Link } from "react-router-dom";
import { browse } from "../store/action";

export default function Navbar({ navs, dispatch }) {
  return (
    <nav className="container-fluid navbar navbar-expand-lg navbar-light shadow-sm mb-4 myNav">
      <div className="container">
        <div to="/" className="nav-item nav-link">
          LOGOS
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {_.partition(navs, (route) => !/^(Log|Sign)/g.test(route)).map(
            (nav, idx) => (
              <ul className={`navbar-nav ${"ml-auto".repeat(idx)}`}>
                {nav.map((link) => (
                  <Link to={"/" + link} key={link} className="nav-item">
                    <div className="nav-item nav-link">{_.startCase(link)}</div>
                  </Link>
                ))}
              </ul>
            )
          )}
        </div>
      </div>
    </nav>
  );
}

function renderLink(link) {
  return (
    <NavLink key={link} to={`/${link}`} className="nav-item m-3">
      {_.startCase(link)}
    </NavLink>
  );
}
