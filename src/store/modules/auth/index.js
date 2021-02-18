import actions from "./actions.js";
import mutations from "./mutations.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      //todo
      isValidSession: null,
      username: "Death",
      avatar:
        "https://t4.ftcdn.net/jpg/03/09/97/57/360_F_309975771_1LcdaVK6D7eokEDzaAInNBGOG5tA9M80.jpg", //Store default avatar here
      userId: 3,
    };
  },
  actions,
  mutations,
  getters,
};
