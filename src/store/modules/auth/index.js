import actions from "./actions.js";
import mutations from "./mutations.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      isValidSession: null,
      username: null,
      avater: null, //Store default avatar here
      userId: null,
    };
  },
  actions,
  mutations,
  getters,
};
