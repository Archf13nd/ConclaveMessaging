<template>
  <div class="container" ref="messageCard" :id="userId" :msgid="msgId">
    <div
      class="msg-image"
      :style="{ background: `url(${img})` }"
      style="background-size:100% 100%;background-repeat:no-repeat;"
    ></div>
    <div class="message-contents-container">
      <div class="msg-info">
        <span> {{ name }} </span>
        <span class="date"> {{ date }} </span>
      </div>

      <div class="message-contents">{{ content }}</div>
    </div>
    <button
      class="hide"
      :class="{ delete: isUserMessage }"
      @click="deleteMessage"
    >
      X
    </button>
  </div>
</template>

<script>
export default {
  props: ["userId", "msgId", "name", "content", "img", "date"],
  data() {
    return {
      isUserMessage: false
    };
  },
  methods: {
    deleteMessage(e) {
      const msgId = e.target.closest(".container").getAttribute("msgid");
      console.log(msgId);
      this.$store.dispatch("globalmessages/deleteMessage", {
        messageId: msgId
      });
    },
    addEventListener() {
      this.$refs.messageCard.addEventListener("mouseover", e => {
        const isLoggedIn = this.$store.getters["auth/isLoggedIn"];
        let userId;
        if (isLoggedIn) {
          userId = JSON.parse(localStorage.getItem("conclave")).userId;
        } else {
          userId = localStorage.getItem("localId");
        }
        console.log(e.target.closest(".container").id === userId);
        // console.log(userId)
        if (e.target.closest(".container").id === userId) {
          this.isUserMessage = true;
        }
      });
    }
  },
  mounted() {
    this.addEventListener();
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/variables.scss";

.container {
  display: flex;
  border-radius: 25px;
  width: 80%;
  min-height: 70px;
  min-height: 70px;
  margin: 4vh;

  // position: absolute;
}

.hide {
  visibility: hidden;
}

.delete {
  visibility: hidden;
  height: 100%;
  width: 40px;
  border-radius: 0 10px 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: red;
}

.container:hover > .delete {
  visibility: visible;
}

.msg-image {
  width: 70px;
  height: 70px;
  background: url(../assets/skull.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 5px 0 0 5px;
  flex-basis: 70px;
  flex-grow: 0;
  flex-shrink: 0;
}

.message-contents {
  margin-left: 10px;
  margin-right: 20px;
  font-size: $font-size-message;
  color: rgb(0, 0, 0);
  padding-top: 4px;
  word-wrap: break-word;
  display: flex;
  align-items: center;
  height: 100%;
  min-height: 47px;
}

.message-contents-container {
  border-radius: 0 5px 5px 0;
  border: 2px solid #000;
  position: relative;
  height: fit-content;
}

.msg-info {
  display: flex;
  justify-content: space-between;
  margin: 0 5px;
  border-bottom: 1px solid black;
}

.date {
  margin-left: 20px;
}

.dead-center {
  display: flex;
  justify-content: center;
        align-items: center;
}
</style>
