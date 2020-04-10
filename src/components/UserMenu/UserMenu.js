import React from "react";
import { connect } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import { authSelectors, authOperations } from "../../redux/auth";
import styles from "./UserMenu.module.css";

const UserMenu = ({ name, onLogout }) => (
  <div className={styles.container}>
    <p className={styles.name}>Welcome, {name}</p>

    <IconButton
      edge="start"
      color="inherit"
      aria-label="menu"
      title="Logout"
      onClick={onLogout}
    >
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z"
        />
      </svg>
    </IconButton>
  </div>
);

const mapStateToProps = (state) => ({
  name: authSelectors.getUserName(state),
});

export default connect(mapStateToProps, { onLogout: authOperations.logout })(
  UserMenu
);
