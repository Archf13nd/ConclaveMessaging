<template>
  <section class="message-container" ref="death">
    <div class="sides">Ha</div>
    <loader v-if="isLoading"></loader>
    <div v-else class="message-box" ref="msgBox">
      <message-body
        class="msg-cards"
        v-for="message in messages"
        :key="message.userId"
        :username="message.username"
        :avatar="message.avatar"
        :date="message.date"
        :content="message.content"
        :refresh="refreshCount"
      ></message-body>
    </div>
    <div class="sides"></div>
    <message-input></message-input>
    <div class="footer"></div>
  </section>
</template>

<script>
import MessageBody from "../components/messages/Message.vue";
import MessageInput from "../components/ui/MessageInput.vue";
import Loader from "../components/ui/Loader.vue";
export default {
  data() {
    return {
      isLoading: true,
    };
  },
  components: {
    MessageBody,
    MessageInput,
    Loader,
  },
  created() {
    this.setMessages();
    console.log("what");
    if (!this.$store.getters["auth/checkUser"]) {
      this.existingUser = false;
    }
  },
  updated() {
    const cHeight = this.$refs.death.childNodes[1].scrollHeight;
    this.$refs.death.childNodes[1].scrollTop = cHeight;
  },
  methods: {
    async setMessages() {
      const timer = setTimeout(() => {
        this.isLoading = true;
      }, 500);
      try {
        await this.$store.dispatch("globalmessages/fetchMessages");
      } catch (error) {
        console.log("An error in home.vue 41", error);
      }
      this.isLoading = false;
      clearTimeout(timer);
    },
  },
  computed: {
    messages() {
      return this.$store.getters["globalmessages/getMessages"];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variables.scss";

.message-container {
  height: $body-height;
  width: 100vw;
  background: $color-body;
  display: flex;
  flex-wrap: wrap;
}

.message-box {
  height: 95%;
  flex: 10 1 300px;
  overflow-y: scroll;
}

.sides {
  background: $color-side;
  height: 95%;
  flex-grow: 1;
}

.footer {
  height: 5%;
  flex-basis: 100%;
  background: $color-side;
  // display: none;
}

.loading-container {
  width: 100%;
  height: $body-height;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-container > p {
  color: green;
}

.center-content {
  height: 95vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.msg-cards:last-child {
  margin-bottom: 70px;
}
</style>
