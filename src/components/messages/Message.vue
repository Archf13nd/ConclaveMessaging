<template>
  <div class="message-container">
    <div class="avatar">
      <avatar :username="username" :avatar="avatar" :date="date"></avatar>
    </div>
    <div class="message-body">
      <message-body :messageContents="messageContents"></message-body>
    </div>
  </div>
</template>

<script>
import MessageBody from "./MessageBody.vue";
import Avatar from "./Avatar.vue";
export default {
  props: ["username", "avatar", "date", "messageContents"],
  components: {
    MessageBody,
    Avatar,
  },
};
</script>
