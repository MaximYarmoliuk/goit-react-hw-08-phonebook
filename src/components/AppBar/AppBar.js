import React from "react";
import { connect } from "react-redux";
import ThemeSelector from "../ThemeSelector/ThemeSelector";
import Navigation from "../Navigation/Navigation";
import UserMenu from "../UserMenu/UserMenu";
import AuthNav from "../AuthNav/AuthNav";
import { authSelectors } from "../../redux/auth";
import Appbar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import styles from "./AppBar.module.css";

const AppBar = ({ isAuthenticated }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Appbar position="static">
        <Toolbar className={styles.container}>
          <IconButton
            edge="start"
            color="inherit"
            title="Menu"
            aria-label="menu"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem>
              <Navigation />
            </MenuItem>
          </Menu>

          <div
            style={{
              display: "flex",
            }}
          >
            <ThemeSelector />
            {isAuthenticated ? <UserMenu /> : <AuthNav />}
          </div>
        </Toolbar>
      </Appbar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: authSelectors.isAuthenticated(state),
});

export default connect(mapStateToProps)(AppBar);
