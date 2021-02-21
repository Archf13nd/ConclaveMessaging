export default {
  storeMessages(state, { arrayOfMessages }) {
    state.messages = arrayOfMessages;
  },
  pushMessage(state, payload) {
    state.messages.push(payload);
  },
};
