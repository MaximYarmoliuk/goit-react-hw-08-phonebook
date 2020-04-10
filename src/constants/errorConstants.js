export const errors = [
  { type: "registerErr", text: "User creation error" },
  { type: "loginErr", text: "Login error" },
  { type: "logoutTokenErr", text: "No token header" },
  { type: "logoutServerErr", text: "Server error" },
  { type: "getUserErr", text: "No token header" },
  { type: "deleteUserTokenErr", text: "No token header" },
  { type: "deleteUserServerErr", text: "Server error" },
  { type: "getContactsTokenErr", text: "No token header" },
  {
    type: "getContactsErr",
    text: "The collection of such an owner does not exist",
  },
  { type: "getContactsServerErr", text: "Server error" },
  { type: "postContactErr", text: "Error creating contact" },
  { type: "postContactTokenErr", text: "No token header" },
  { type: "deleteContactTokenErr", text: "No token header" },
  {
    type: "deleteContactErr",
    text: "The collection of such an owner does not exist",
  },
  { type: "deleteContactServerErr", text: "Server error" },
];

export const getErrorText = (message) => {
  const errorText = errors.find((error) => error.type === message);
  return errorText.text;
};
