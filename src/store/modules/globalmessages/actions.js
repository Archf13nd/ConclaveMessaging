const FIREBASE_URL = process.env.VUE_APP_FIREBASE_URL;
console.log(process.env.VUE_APP_FIREBASE_URL, "env");

export default {
  // Code that sends a message object to firebase
  async sendMessage(context, { messageContent }) {
    const token = localStorage.getItem("token");
    if (token) {
      // Get user details
      const { username, avatar, userId } = context.rootGetters[
        "auth/getUserDetails"
      ];

      // Send message as signed up user
      const messageObject = {
        username: username,
        avatar: avatar,
        userId: userId,
        date: Date.now,
        content: messageContent,
      };

      const response = await fetch(
        `${FIREBASE_URL}globalmessages.json?auth=${token}`,
        {
          method: "POST",
          body: JSON.stringify(messageObject),
        }
      );
      //todo handle error message
      if (!response.ok) {
        const error = new Error(response);
        throw error;
      }
      // const responseData = await response.json();
      context.dispatch("fetchMessages");
    }
  },
  async fetchMessages(context) {
    const response = await fetch(`${FIREBASE_URL}globalmessages.json`);
    if (!response.ok) {
      const error = new Error(response);
      throw error;
    }
    const messages = await response.json();
    const arrayOfMessages = [];

    for (const key in messages) {
      arrayOfMessages.push({
        name: messages[key].username,
        img: messages[key].avatar,
        userId: messages[key].userId,
        date: messages[key].date,
        content: messages[key].content,
      });
    }

    context.commit("storeMsg", messages);
  },
  async deleteMessage(context, payload) {
    console.log("hi");
    const response = await fetch(
      `https://message-app-72e27-default-rtdb.europe-west1.firebasedatabase.app/globalmessages.json`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      const error = new Error(response);
      console.log(error);
      throw error;
    }
    const responseData = await response.json();
    let theKey;
    for (const key in responseData) {
      if (responseData[key]["msgId"] === payload.messageId) {
        theKey = key;
      }
    }
    const deleteResponse = await fetch(
      `https://message-app-72e27-default-rtdb.europe-west1.firebasedatabase.app/globalmessages/${theKey}.json`,
      {
        method: "DELETE",
      }
    );
    if (!deleteResponse.ok) {
      const error = new Error(response);
      console.log(error);
      throw error;
    }
    context.dispatch("returnMsg");
  },
};
