export default {
  storeUser(state, { username, avatar, userId }) {
    state.username = username;
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
