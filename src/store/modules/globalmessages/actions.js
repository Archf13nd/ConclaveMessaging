const FIREBASE_URL = process.env.VUE_APP_FIREBASE_URL;
import { v4 as uuidv4 } from "uuid";
console.log(process.env.VUE_APP_FIREBASE_URL, "env");

export default {
  // Code that sends a message object to firebase
  async receiveMsg(context, payload) {
    // Creates date string
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const minutes =
      +currentDate.getMinutes() > 9
        ? currentDate.getMinutes()
        : `0${currentDate.getMinutes()}`;
    const hour =
      +currentDate.getHours() > 9
        ? currentDate.getHours()
        : `0${currentDate.getHours()}`;
    const dateString = `${day}/${month}/${year} - ${hour}:${minutes}`;

    const isLoggedIn = context.rootGetters["auth/isLoggedIn"];
    let userId;
    if (isLoggedIn) {
      userId = context.rootGetters["auth/getUserId"];
    } else {
      userId = localStorage.getItem("localId");
    }
    console.log(day, "What?");
    console.log(userId);
    const messageObject = {
      userid: userId,
      msgId: uuidv4(),
      name: JSON.parse(localStorage.getItem("conclave"))["name"],
      content: payload.content,
      img: JSON.parse(localStorage.getItem("conclave"))["url"],
      date: dateString,
    };

    const response = await fetch(`${FIREBASE_URL}globalmessages.json`, {
      method: "POST",
      body: JSON.stringify(messageObject),
    });
    //todo handle error message
    if (!response.ok) {
      console.log("AN ERROR globalmessages/actions", response);
    }

    const responseData = await response.json();
    console.log(responseData);

    context.dispatch("returnMsg");
  },
  async returnMsg(context) {
    const response = await fetch(`${FIREBASE_URL}globalmessages.json`);
    if (!response.ok) {
      console.log("AN ERROR globalmessages/actions/RM");
    }
    const values = await response.json();
    const messages = [];

    for (const key in values) {
      messages.push({
        userId: values[key].userid,
        msgId: values[key].msgId,
        name: values[key].name,
        content: values[key].content,
        img: values[key].img,
        date: values[key].date,
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
