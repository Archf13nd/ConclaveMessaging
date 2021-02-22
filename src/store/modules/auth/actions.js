const API_KEY = process.env.VUE_APP_API_KEY;
let timeoutTimer;
export default {
  // Login Function - Takes in email and password as payload. Dispatches Auth action with payload.
  async signIn(context, payload) {
    try {
      context.dispatch("auth", {
        ...payload,
        mode: "login",
      });
      context.commit("validSession", true);
    } catch (err) {
      const error = new Error(err);
      throw error;
    }
  },
  autoSignIn(context) {
    const token = localStorage.getItem("token");
    const tokenExpiration = +localStorage.getItem("expirationDate");

    if (token && tokenExpiration) {
      const timeRemaining = tokenExpiration - new Date().getTime();

      if (timeRemaining > 10 && token) {
        context.commit("validSession", true);
        context.dispatch("fetchUserDetails");
        timeoutTimer = setTimeout(() => {
          context.dispatch("logout");
        }, timeRemaining);
      }
    }
  },
  // Signup function - takes in name, url, email, and password as payload. Dispatchees Auth action with payload
  async signup(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "signup",
    });
  },
  // Logs user out
  logout(context) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    context.commit("validSession", false);
    context.commit("logout");
    clearTimeout(timeoutTimer);
  },
  // Auth function. Responsible for handling login or signup actions.
  async auth(context, { mode, username, avatar, email, password }) {
    // Runs if check for whether request is login or signup
    // URL FOR Logging in
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
      API_KEY;

    // URL for signing up
    if (mode === "signup") {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
        API_KEY;
    }

    // Sign up or login depending on url.
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
    });

    // Error handling
    if (!response.ok) {
      const error = new Error("Error");
      throw error;
    }

    // Get response data. Will contain localID(userID) and secure idToken
    const responseData = await response.json();

    // Store secure token in local Storage
    localStorage.setItem("token", responseData.idToken);
    // Set expiration time in local storage
    const expirationDate =
      new Date().getTime() + +responseData.expiresIn * 1000;
    //  new Date().getTime() + 5000;
    localStorage.setItem("expirationDate", expirationDate);

    // Start timer until logout
    context.dispatch("autoSignIn");

    // If mode is signup then there will be two more properties in payload. name and url. This dispatches the changeUserDetails action that handles these user details.
    if (mode === "signup") {
      localStorage.setItem("existingUser", true);
      await context.dispatch("updateUserProfile", {
        username: username,
        avatar: avatar,
      });
    } else {
      context.dispatch("fetchUserDetails");
    }
  },

  // Fetches user data from their account
  async fetchUserDetails(context) {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify({ idToken: localStorage.getItem("token") }),
      }
    );
    if (!response.ok) {
      const error = new Error("Error");
      throw error;
    }
    const responseData = await response.json();
    context.commit("storeUser", {
      username: responseData.users[0].displayName,
      email: responseData.users[0].email,
      avatar: responseData.users[0].photoUrl,
      userId: responseData.users[0].localId,
    });

    // const userDetails = context.getters["getUserDetails"];
  },
  // Changes user details. Used on signup to add details or later on to change details if user is loggedIn.
  async updateUserProfile(context, { username, avatar }) {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=" +
        API_KEY,
      {
        method: "POST",
        body: JSON.stringify({
          idToken: localStorage.getItem("token"),
          displayName: username,
          photoUrl: avatar,
        }),
      }
    );

    if (!response.ok) {
      const error = new Error("Error");
      throw error;
    }

    const responseData = await response.json();

    context.commit("storeUser", {
      username: responseData.displayName,
      avatar: responseData.photoUrl,
      userId: responseData.localId,
    });
  },
  async updateUserPassword(context, { password }) {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify({
          idToken: localStorage.getItem("token"),
          password: password,
        }),
      }
    );
    if (!response.ok) {
      //todo Integrate error handling
      return false;
    }
  },
  async updateUserEmail(context, { email }) {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify({
          idToken: localStorage.getItem("token"),
          email: email,
        }),
      }
    );
    if (!response.ok) {
      //todo Integrate error handling
      return false;
    }
  },
  async deleteAccount(context) {
    const isValidSession = context.getters["isValidSession"];
    if (isValidSession) {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:delete?key=" +
          API_KEY,
        {
          method: "POST",
          body: JSON.stringify({ idToken: token }),
        }
      );
      if (!response.ok) {
        const error = new Error(response);
        throw error;
      }
    }
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    context.commit("validSession", false);
    localStorage.setItem("existingUser", false);
  },
};
