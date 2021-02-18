<template>
  <section class="homepage-container" ref="death">
    <!-- <div class="sides">Ha</div> -->
    <loader v-if="isLoading"></loader>
    <div v-else class="message-box" ref="msgBox">
      <message-body
        v-for="message in arrayOfMessages"
        :key="message.userId"
        :username="message.username"
        :avatar="message.avatar"
        :date="message.date"
        :content="message.content"
        :refresh="refreshCount"
      ></message-body>
    </div>
    <!-- <div class="sides"></div> -->
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
    arrayOfMessages() {
      console.log(this.$store.getters["globalmessages/getMessages"]);
      return this.$store.getters["globalmessages/getMessages"];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variables.scss";

.homepage-container {
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template: 100% / repeat(2, minmax(3px, 1fr)) repeat(8, minmax(40px, 1fr)) repeat(
      2,
      minmax(3px, 1fr)
    );
  column-gap: 0.83%;
}

.message-box {
  background: $background-body;
  grid-column: 3 / 11;
  overflow-y: scroll;
}

.sides {
  background: $color-side;
  height: 100%;
  flex-grow: 1;
}

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  z-index: -10;
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
