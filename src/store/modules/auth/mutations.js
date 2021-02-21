export default {
  storeUser(state, { username, email, avatar, userId }) {
    state.username = username;
    state.email = email;
    state.avatar = avatar;
    state.userId = userId;
    state.isValidSession = true; //todo CHECK THIS
  },
  logout(state) {
    state.validSession = false;
    state.username = null;
    state.avatar = null;
    state.userId = null;
  },
  validSession(state, { condition }) {
    state.isValidSession = condition;
  },
};
