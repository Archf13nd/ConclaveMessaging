<template>
  <form class="message-form" @submit.prevent="sendMessage">
    <input class="input" v-model="message" type="text" />
    <button class="send-btn" type="submit" value="Send">Send</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      message: ""
    };
  },
  methods: {
    sendMessage() {
      console.log("hahaha");
      this.$store.dispatch("globalmessages/receiveMsg", {
        content: this.message,
        name: "Death"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.message-form {
  background: rgb(47, 50, 51);
  padding: 30px 20px;
  position: fixed;
  bottom: 20px;
  width: 80%;
  height: 50px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}

.input {
  display: inline-block;
  width: 100%;
  height: 40px;
  border: 3px solid black;
}

.send-btn {
  background: rgb(193, 216, 157);
  width: 80px;
  height: 40px;
  border: 3px solid black;
}

.evil {
                      display: flex;
}
</style>
