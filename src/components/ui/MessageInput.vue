<template>
  <form
    class="message-input-form skew"
    :class="{ invalid: invalid }"
    @submit.prevent="sendMessage"
  >
    <input
      class="reverse-skew"
      @change="invalid = false"
      v-model="messageContent"
      type="text"
    />
    <button class="send-btn" type="submit" value="Send">
      <p class="reverse-skew">Send</p>
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      messageContent: "",
      invalid: false,
    };
  },
  methods: {
    sendMessage() {
      this.invalid = false;
      if (this.messageContent) {
        this.$emit("sendMessage", { messageContent: this.messageContent });
        this.messageContent = "";
      } else {
        this.invalid = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.invalid {
  border: 2px solid red;
}

.wrapperff {
  background: #000;
}
.send-btn {
  background: #8cf35c;
  width: 112px;
  border: none;
  border-radius: 0 8px 8px 0;

  &:hover {
    background: #77f33d;
    transform: translateY(-3px);
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  }
}

.message-input-form {
  background: rgb(255, 255, 255);
  height: 48px;
  width: 90%;
  display: flex;
  justify-content: flex-end;
  border-radius: 8px;
  padding: 0 0 0 20px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

input {
  border: none;
  height: 100%;
  width: 95%;
  margin-right: 10px;
  background: transparent;
  font-size: 2rem;
}
input:focus {
  outline: none;
}

p {
  display: inline-block;
  font-size: 18px;
  letter-spacing: 13%;
}
</style>
