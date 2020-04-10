import React from "react";
import Divider from '@material-ui/core/Divider';
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { authSelectors } from "../../redux/auth";
import styles from "./Navigation.module.css";

const Navigation = ({ isAuthenticated }) => (
  <nav className={styles.container}>
    <NavLink
      to="/"
      exact
      className={styles.link}
      activeClassName={styles.activeLink}
    >
      <svg className="umbrella"  width="24" height="24" viewBox="0 0 24 24" aria-labelledby="goHomePage" >
        <title id="homeIcon">Home</title>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
      </svg>
    </NavLink>

    {isAuthenticated &&   (
      <>
      <Divider/>
      <NavLink
        to="/contacts"
        exact
        className={styles.link}
        activeClassName={styles.activeLink}
      >
        Contacts
      </NavLink>
      </>
    )}

  </nav>
);

const mapStateToProps = (state) => ({
  isAuthenticated: authSelectors.isAuthenticated(state),
});

export default connect(mapStateToProps)(Navigation);
