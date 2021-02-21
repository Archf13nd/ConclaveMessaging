import actions from "./actions.js";
import mutations from "./mutations.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      //todo
      isValidSession: false,
      username: null,
      email: null,
      avatar: null, //Store default avatar here
      userId: null,
    };
  },
  actions,
  mutations,
  getters,
};
