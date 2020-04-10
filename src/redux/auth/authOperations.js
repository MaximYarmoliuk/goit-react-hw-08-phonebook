import authActions from "./authActions";
import axios from "axios";
import { getErrorText } from "../../constants/errorConstants";
import errorMessage from "../../helpers/errorMessage";

const token = {
  set(tokenId) {
    axios.defaults.headers.common.Authorization = `Bearer ${tokenId}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

axios.defaults.baseURL = "https://goit-phonebook-api.herokuapp.com";
axios.defaults.headers.post["Content-Type"] = "application/json";

const register = (credentials) => (dispatch) => {
  dispatch(authActions.registerRequest());

  axios
    .post("/users/signup", credentials)
    .then((response) => {
      token.set(response.data.token);
      dispatch(authActions.registerSuccess(response.data));
    })

    .catch((error) => {
      errorMessage(getErrorText("registerErr"));
      dispatch(authActions.registerError(error.message));
    });
};

const login = (credentials) => (dispatch) => {
  dispatch(authActions.loginRequest());

  axios
    .post("/users/login", credentials)
    .then((response) => {
      token.set(response.data.token);
      dispatch(authActions.loginSuccess(response.data));
    })
    .catch((error) => {
      errorMessage(getErrorText("loginErr"));
      dispatch(authActions.loginError(error.message));
    });
};

const logout = () => (dispatch) => {
  dispatch(authActions.logoutRequest());

  axios
    .post("/users/logout")
    .then((response) => {
      token.unset();
      dispatch(authActions.logoutSuccess(response.data));
    })
    .catch((error) => {
      error.message = "Request failed with status code 401"
        ? errorMessage(getErrorText("logoutTokenErr"))
        : errorMessage(getErrorText("logoutServerErr"));
      dispatch(authActions.logoutError(error.message));
    });
};

const getCurrentUser = () => (dispatch, getState) => {
  const {
    auth: { token: persistedToken },
  } = getState();

  if (!persistedToken) {
    return;
  }

  token.set(persistedToken);
  dispatch(authActions.getCurrentUserRequest());

  axios
    .get("/users/current")
    .then((response) =>
      dispatch(authActions.getCurrentUserSuccess(response.data))
    )
    .catch((error) => {
      errorMessage(getErrorText("getUserErr"));
      dispatch(authActions.getCurrentUserError(error.message));
    });
};

export default { register, login, logout, getCurrentUser };
