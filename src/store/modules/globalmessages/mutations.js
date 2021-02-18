export default {
  storeMessages(state, { arrayOfMessages }) {
    console.log(arrayOfMessages);
    state.messages = arrayOfMessages;
  },
  pushMessage(state, payload) {
    state.messages.push(payload);
  },
};
