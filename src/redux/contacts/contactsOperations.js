import contactActions from "./contactsActions";
import axios from "axios";
import { getErrorText } from "../../constants/errorConstants";
import errorMessage from '../../helpers/errorMessage'

axios.defaults.baseURL = "https://goit-phonebook-api.herokuapp.com";
axios.defaults.headers.post["Content-Type"] = "application/json";

const addContact = ({ name, number }) => (dispatch) => {
  dispatch(contactActions.addContactsRequest());

  axios
    .post("/contacts", {
      name,
      number,
    })
    .then(({ data }) => {
      dispatch(contactActions.addContactsSuccess(data));
    })
    .catch((err) => {
      err.message = "Request failed with status code 401"
        ? errorMessage(getErrorText("postContactTokenErr"))
        : errorMessage(getErrorText("postContactErr"));
      dispatch(contactActions.addContactsError(err));
    });
};

const fetchContacts = () => (dispatch) => {
  dispatch(contactActions.fetchContactsRequest());

  axios
    .get("/contacts")
    .then(({ data }) => dispatch(contactActions.fetchContactsSuccess(data)))
    .catch((err) => {
      if ((err.message = "Request failed with status code 401")) {
        errorMessage(getErrorText("getContactsTokenErr"));
      } else if ((err.message = "Request failed with status code 404")) {
        errorMessage(getErrorText("getContactsErr"));
      } else {
        errorMessage(getErrorText("getContactsServerErr"));
      }

      dispatch(contactActions.fetchContactsError(err));
    });
};

const removeContact = (contactId) => (dispatch) => {
  dispatch(contactActions.removeContactsRequest());

  axios
    .delete(`/contacts/${contactId}`)
    .then(() => dispatch(contactActions.removeContactsSuccess(contactId)))
    .catch((err) => {
      if ((err.message = "Request failed with status code 401")) {
        errorMessage(getErrorText("deleteContactTokenErr"));
      } else if ((err.message = "Request failed with status code 404")) {
        errorMessage(getErrorText("deleteContactErr"));
      } else {
        errorMessage(getErrorText("deleteContactServerErr"));
      }
      dispatch(contactActions.removeContactsError(err));
    });
};

export default {
  addContact,
  fetchContacts,
  removeContact,
};
