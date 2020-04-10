import React, { Component } from "react";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import ContactForm from "../../components/ContactForm/ContactForm";
import ContactList from "../../components/ContactList/ContactList";
import Filter from "../../components/Filter/Filter";
import { contactsOperations, contactsSelectors } from "../../redux/contacts";
import contactListStyles from "./ContactListStyles.module.css";
import filterStyles from "./FilterStyles.module.css";


class Contacts extends Component {
  componentDidMount() {
    this.props.onFetchContacts();
  }
  render() {
    return (
      <>
        {" "}
        <ContactForm />
        <CSSTransition
          in={this.props.contacts.length >= 2}
          timeout={250}
          classNames={filterStyles}
          unmountOnExit
        >
          <Filter />
        </CSSTransition>
        <CSSTransition
          in={this.props.contacts.length > 0}
          timeout={250}
          classNames={contactListStyles}
          unmountOnExit
        >
          <ContactList />
        </CSSTransition>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  contacts: contactsSelectors.getContacts(state),
  isLoadingContacts: contactsSelectors.getLoading(state),
});

const mapDispatchToProps = {
  onFetchContacts: contactsOperations.fetchContacts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
