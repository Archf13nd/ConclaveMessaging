const FIREBASE_URL = process.env.VUE_APP_FIREBASE_URL;

export default {
  // Code that sends a message object to firebase
  async sendMessage(context, { messageContent }) {
    console.log(messageContent);

    // TESTING //Remove
    localStorage.setItem("token", 1);

    localStorage.getItem("token");

    const token = localStorage.getItem("token");
    if (token) {
      // Get user details
      const { username, avatar, userId } = context.rootGetters[
        "auth/getUserDetails"
      ];

      console.log(avatar);

      // Send message as signed up user
      const messageObject = {
        username: username,
        avatar: avatar,
        userId: userId,
        date: Date.now(),
        content: messageContent,
      };

      console.log(messageObject, "Message Object");

      const response = await fetch(
        `${FIREBASE_URL}globalmessages.json`, //todo
        {
          method: "POST",
          body: JSON.stringify(messageObject),
        }
      );

      console.log(response);
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
    console.log("Fetching messages");
    const response = await fetch(`${FIREBASE_URL}globalmessages.json`);
    if (!response.ok) {
      const error = new Error(response);
      throw error;
    }
    const messages = await response.json();
    console.log(messages);
    const arrayOfMessages = [];

    for (const key in messages) {
      arrayOfMessages.push({
        username: messages[key].username,
        avatar: messages[key].avatar,
        userId: messages[key].userId,
        date: messages[key].date,
        content: messages[key].content,
        messageId: key,
      });
    }
    console.log(arrayOfMessages);
    context.commit("storeMessages", { arrayOfMessages });
  },
  async deleteMessage(context, { messageId }) {
    const deleteResponse = await fetch(
      `https://message-app-72e27-default-rtdb.europe-west1.firebasedatabase.app/globalmessages/${messageId}.json`,
      {
        method: "DELETE",
      }
    );

    if (!deleteResponse.ok) {
      const error = new Error(deleteResponse);
      console.log(error);
      throw error;
    }
    context.dispatch("fetchMessages");
  },
};
