<template>
  <div v-if="existingUser">
    <section class="message-container" ref="death">
      <div class="sides"></div>
      <div v-if="!isLoading" class="message-box" ref="msgBox">
        <message-card
          class="msg-cards"
          v-for="message in messages"
          :key="message.id"
          :userId="message.userId"
          :msgId="message.msgId"
          :name="message.name"
          :content="message.content"
          :img="message.img"
          :date="message.date"
          :refresh="refreshCount"
        ></message-card>
      </div>
      <div class="loading-container" v-else><p>Loading. . .</p></div>
      <div class="sides"></div>
      <text-input></text-input>
      <div class="footer"></div>
    </section>
  </div>
  <div class="center-content" v-else>
    <new-user-dialog @signedIn="existingUser = true"></new-user-dialog>
  </div>
</template>

<script>
import messageCard from "../components/message-card";
import textInput from "../components/textinput";
import NewUserDialog from "../components/NewUserDialog.vue";
import TextInput from "../components/textinput.vue";
export default {
  data() {
    return {
      refreshCount: 0,
      existingUser: true,
      isLoading: false,
      isUser: false
    };
  },
  components: {
    messageCard,
    textInput,
    NewUserDialog,
    TextInput
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
      this.isLoading = true;
      try {
        await this.$store.dispatch("globalmessages/returnMsg");
      } catch (error) {
        console.log("An errorin home.vue 41", error);
      }
      this.isLoading = false;
    }
  },
  computed: {
    messages() {
      return this.$store.getters["globalmessages/getMessages"];
    }
  }
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
