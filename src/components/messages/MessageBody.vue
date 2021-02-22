<template>
  <div class="message-body" :class="{ 'show-body': isUserMessage }">
    <p class="message-text">{{ content }}</p>
    <div class="options">
      <div class="options--edit" @click="editMessage">E</div>
      <div class="options--delete" @click="deleteMessage">X</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["userId", "content", "messageId"],
  methods: {
    editMessage() {
      alert(this.userId);
    },
    deleteMessage() {
      this.$emit("deleteMessage");
    },
  },
  computed: {
    isUserMessage() {
      return this.$store.getters["auth/getUserDetails"].userId === this.userId;
    },
  },
};
</script>

<style lang="scss" scoped>
.message-body {
  position: relative;
  display: flex;
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
  min-height: 16px;
}

.show-body:hover .options {
  display: flex;
}

.options {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 48px;
  height: 24px;
  display: none;

  & > div {
    padding: 2px;
    display: flex;
    text-align: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
      transform: translateY(-3px);
    }
    &:active {
      transform: translateY(0px);
    }
  }

  &--edit {
    background: #3fa2f7;
    width: 50%;
  }

  &--delete {
    background: #eb5757;
    width: 50%;
    // border-radius: 0 16% 0 0;
  }
}
</style>
