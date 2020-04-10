import React from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { contactsActions, contactsSelectors } from "../../redux/contacts";
import styles from "./Filter.module.css";

function Filter({ value, onChangeFilter }) {
  return (
    <div className={styles.container}>
      <TextField
        label="Find contacts by name"
        type="text"
        className={styles.input}
        value={value}
        onChange={(e) => onChangeFilter(e.target.value)}
      />
    </div>
  );
}

Filter.propTypes = {
  value: propTypes.string.isRequired,
  onChangeFilter: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  value: contactsSelectors.getFilter(state),
});

const mapDispatchToProps = {
  onChangeFilter: contactsActions.changeFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
