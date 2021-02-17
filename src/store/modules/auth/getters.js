export default {
  isValidSession(state) {
    return !!state.isValidSession;
  },
  getUserDetails(state) {
    return {
      username: state.username,
      avatar: state.avatar,
      userId: state.userId,
    };
  },
};
