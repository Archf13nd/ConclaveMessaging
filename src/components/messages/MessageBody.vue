<template>
  <div class="message-body">
    <p class="message-text" contenteditable="true">{{ content }}</p>
  </div>
</template>

<script>
export default {
  props: ["content"],
};
</script>

<style lang="scss" scoped>
.message-body {
  // position: relative;
  // display: flex;
  align-items: center;
  min-height: 48px;
  background: $color-message-body;
  padding: 16px;
  margin: 0 0 8px 32px;
  border-radius: 16px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
}

p {
  margin: 0;
  padding: 0;
}

.message-text {
  word-break: break-all;
  font-size: 16px;
}
</style>
