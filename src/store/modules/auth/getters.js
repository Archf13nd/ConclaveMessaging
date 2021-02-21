export default {
  isValidSession(state) {
    return !!state.isValidSession;
  },
  getUserDetails(state) {
    return {
      username: state.username,
      email: state.email,
      avatar: state.avatar,
      userId: state.userId,
    };
  },
};
