export default {
  storeUser(state, { username, avatar, userId }) {
    state.username = username;
    state.avatar = avatar;
    state.userId = userId;
  },
};
