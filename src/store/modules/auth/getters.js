export default {
  // Checks if user is logged in. Used for dynamic UI elements
  isAuthenticated(state) {
    return !!state.token;
  },
  // Gets the id of the user if logged in
  getUserId(state) {
    return state.userId;
  },

  checkUser() {
    console.log("haaa");
    return !!localStorage.getItem("conclave");
  },
};
