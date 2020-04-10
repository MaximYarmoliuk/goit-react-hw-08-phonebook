import React from "react";
import { connect } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import { contactsOperations, contactsSelectors } from "../../redux/contacts";
import removeMessage from "../../helpers/removeMessage";
import propTypes from "prop-types";
import styles from "./ContactListItem.module.css";

const ContactListItem = ({ name, number, onRemoveContact }) => {
  return (
    <li className={styles.item}>
      <p className="TaskList-text">
        {name}: {number}
      </p>

      <DeleteIcon
        fontSize="large"
        className={styles.button}
        title="Delete contact"
        type="button"
        onClick={() => removeMessage(name, onRemoveContact)}
      />
    </li>
  );
};

ContactListItem.propTypes = {
  name: propTypes.string.isRequired,
  number: propTypes.string.isRequired,
  onRemoveContact: propTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const contact = contactsSelectors.getContactById(state, ownProps.id);

  return {
    ...contact,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onRemoveContact: () =>
    dispatch(contactsOperations.removeContact(ownProps.id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactListItem);
