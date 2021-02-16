import { createStore } from "vuex";

import globalMessages from "./modules/globalmessages/index.js";
import auth from "./modules/auth/index.js";

const store = createStore({
  modules: {
    globalmessages: globalMessages,
    auth: auth
  }
});

export default store;
