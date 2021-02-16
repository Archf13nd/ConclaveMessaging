export default {
  storeMsg(state, payload) {
    state.messages = payload;
  },
  pushMessage(state, payload) {
    state.messages.push(payload);
  }
};
