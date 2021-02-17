import actions from "./actions.js";
import mutations from "./mutations.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      messages: [],
      username: "",
      avatar: null,
      userId: null,
    };
  },
  actions,
  mutations,
  getters,
};
