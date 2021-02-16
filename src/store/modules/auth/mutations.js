export default {
  setUser(state, payload) {
    state.userId = payload.userId;
    state.token = payload.token;
    state.expirationDate = payload.expirationDate;
    console.log(state);
  },
  login(state) {
    state.isLoggedIn = true;
  },
  logout(state) {
    state.token = null;
  }
};
