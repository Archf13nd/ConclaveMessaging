const API_KEY = process.env.VUE_APP_API_KEY

export default {
  // Login Function - Takes in email and password as payload. Dispatches Auth action with payload.
  async login(context, payload) {
    context.dispatch("auth", {
      ...payload,
      mode: "login"
    });
  },
  // Signup function - takes in name, url, email, and password as payload. Dispatchees Auth action with payload
  async signup(context, payload) {
    context.dispatch("auth", {
      ...payload,
      mode: "signup"
    });
  },
  // Logs user out
  logout(context) {
    localStorage.removeItem("token");
    context.commit("logout");
  },

  // Auth function. Responsible for handling login or signup actions.
  async auth(context, payload) {
    const mode = payload.mode;
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
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
    });

    // Error handling
    if (!response.ok) {
      console.log("response");
      const error = new Error("Error");
      throw error;
    }

    // Get response data. Will contain localID(userID) and secure idToken
    const responseData = await response.json();
    // Store secure token in local Storage
    localStorage.setItem("token", responseData.idToken);

    // If mode is signup then there will be two more properties in payload. name and url. This dispatches the changeUserDetails action that handles these user details.
    if (mode === "signup") {
      await context.dispatch("changeUserDetails", {
        userId: responseData.localId,
        name: payload.name,
        url: payload.url
      });
    }
    await context.dispatch("getUser", {
      userId: responseData.localId
    });

    // Mutation that sets the isLoggedIn property to true
    context.commit("login");

    // Mutation that sets the userId, token, and expirationDate to state.
    context.commit("setUser", {
      userId: responseData.localId,
      token: responseData.idToken,
      expirationDate: responseData.expiresIn
    });
  },

  // Changes user details. Used on signup to add details or later on to change details if user is loggedIn.
  async changeUserDetails(context, payload) {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=" +
        API_KEY,
      {
        method: "POST",
        body: JSON.stringify({
          idToken: localStorage.getItem("token"),
          displayName: payload.name,
          photoUrl: payload.url
        })
      }
    );

    if (!response.ok) {
      console.log("response", response);
      const error = new Error("Error");
      throw error;
    }

    const responseData = await response.json();
    console.log(responseData);

    context.dispatch("getUser", {
      userId: responseData.localId
    });
  },

  // Grabs user - Payload needs localId
  async getUser(context, payload) {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=" +
        API_KEY,
      {
        method: "POST",
        body: JSON.stringify({
          idToken: localStorage.getItem("token")
        })
      }
    );
    const responseData = await response.json();
    localStorage.setItem(
      "conclave",
      JSON.stringify({
        userId: payload.userId,
        name: responseData.users[0].displayName,
        url: responseData.users[0].photoUrl
      })
    );
  },
  async deleteAccount(context) {
    const isLoggedIn = context.getters["isLoggedIn"];
    if (isLoggedIn) {
      const token = localStorage.getItem("token");
      console.log(token);

      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:delete?key=" +
          API_KEY,
        {
          method: "POST",
          body: JSON.stringify({ idToken: token })
        }
      );

      if (!response.ok) {
        console.log("response", response);
        const error = new Error(response);
        throw error;
      }
            console.log('haha')
    }








    
    localStorage.removeItem("conclave");
    localStorage.removeItem("localId");
    localStorage.removeItem("token");
  }
};
