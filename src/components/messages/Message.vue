<template>
  <div class="message-container">
    <div class="avatar">
      <avatar :username="username" :avatar="avatar" :date="date"></avatar>
    </div>
    <message-body
      :content="content"
      :messageId="messageId"
      @deleteMessage="deleteMessage"
    ></message-body>
  </div>
</template>

<script>
import MessageBody from "./MessageBody.vue";
import Avatar from "./Avatar.vue";
export default {
  props: ["username", "avatar", "date", "content", "messageId"],
  components: {
    MessageBody,
    Avatar,
  },
  methods: {
    async deleteMessage() {
      await this.$store.dispatch("globalmessages/deleteMessage", {
        messageId: this.messageId,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.message-container {
  margin-top: 48px;
  display: flex;
  justify-content: flex-start;
  padding: 16px;

  &:hover {
    margin-bottom: -2px;
    border-bottom: 2px solid $header-background;
  }
}

.message-contents {
  display: flex;
}
</style>
