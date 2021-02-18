<template>
  <div class="message-container">
    <div class="avatar">
      <avatar :username="username" :avatar="avatar" :date="date"></avatar>
    </div>
    <message-body :content="content"></message-body>
  </div>
</template>

<script>
import MessageBody from "./MessageBody.vue";
import Avatar from "./Avatar.vue";
export default {
  props: ["username", "avatar", "date", "content"],
  components: {
    MessageBody,
    Avatar,
  },
};
</script>

<style lang="scss" scoped>
.message-container {
  margin-top: 70px;
  display: flex;
  justify-content: flex-start;
  padding: 16px;
}
</style>
