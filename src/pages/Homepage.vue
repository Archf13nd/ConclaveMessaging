<template>
  <section class="homepage-container" ref="death">
    <loader v-if="isLoading"></loader>
    <div v-else class="messages-container" ref="msgBox">
      <message-body
        class="message-body"
        v-for="message in arrayOfMessages"
        :key="message.userId"
        :username="message.username"
        :avatar="message.avatar"
        :date="message.date"
        :content="message.content"
        :messageId="message.messageId"
      ></message-body>
    </div>
    <message-input
      class="message-input"
      @sendMessage="sendMessage"
    ></message-input>
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
    this.fetchMessages();
    if (!this.$store.getters["auth/checkUser"]) {
      this.existingUser = false;
    }
  },
  updated() {
    const cHeight = this.$refs.death.childNodes[1].scrollHeight;
    this.$refs.death.childNodes[1].scrollTop = cHeight;
  },
  methods: {
    async fetchMessages() {
      const timer = setTimeout(() => {
        this.isLoading = true;
      }, 500);
      try {
        await this.$store.dispatch("globalmessages/fetchMessages");
      } catch (err) {
        const error = new Error(err);
        throw error;
      }
      this.isLoading = false;
      clearTimeout(timer);
    },
    sendMessage({ messageContent }) {
      this.$store.dispatch("globalmessages/sendMessage", {
        messageContent: messageContent,
      });
    },
  },
  computed: {
    arrayOfMessages() {
      return this.$store.getters["globalmessages/getMessages"];
    },
  },
};
</script>

<style lang="scss" scoped>
// @import "../scss/variables.scss";

.homepage-container {
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template:
    90% 10% / repeat(2, minmax(3px, 1fr)) repeat(8, minmax(35px, 1fr))
    repeat(2, minmax(3px, 1fr));
  column-gap: 0.83%;
}

.messages-container {
  position: relative;
  margin-top: calc(#{$header-height} + 24px);
  background: $background-body;
  grid-row: 1 / -1;
  grid-column: 3 / 11;
  overflow-y: scroll;
  border-radius: 8px;
}

.message-input {
  position: relative;
  // background: #000;
  grid-row: 2 / 3;
  grid-column: 3 / span 8;
  justify-self: center;
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

.message-body:last-child {
  margin-bottom: 88px;
}
</style>
