<template>
  <div class="messages">
    <div class="items" ref="messages">
      <div
        class="item"
        :class="{ me: message.from.hash == user.hash }"
        v-for="(message, indexMessage) in itemsFiltered"
        :key="indexMessage"
      >
        <div class="avatar">
          <img :src="message.from.avatar" alt="avatar" />
        </div>
        <p>
          {{ message.message }}
        </p>
      </div>
      <div class="empty-opponent" v-if="!existOponent">
        Please choose an opponent
      </div>
      <div class="empty-messages" v-if="!existMessages && existOponent">
        No messages yet
      </div>
    </div>
    <div class="sender">
      <input
        class="message"
        placeholder="Type a message"
        v-model="message"
        @keyup.enter="sendMessage"
      />
      <a href="#" class="btn-send" @click="sendMessage">
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="telegram-plane"
          class="svg-inline--fa fa-telegram-plane fa-w-14"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            fill="currentColor"
            d="M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z"
          ></path>
        </svg>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component({})
export default class Messages extends Vue {
  @Prop({ type: Object, default: () => {} })
  oponent!: any;

  @Prop({ type: Object, default: () => {} })
  user!: any;

  @Prop({ type: Array, default: () => [] })
  items!: string[];

  name = "Messages";
  message = "";

  get existOponent() {
    return Object.keys(this.oponent).length;
  }

  get existMessages() {
    return this.itemsFiltered.length;
  }

  get itemsFiltered() {
    return this.items.filter((item: any) => {
      return (
        (item.from.hash == this.oponent.hash &&
          item.to.hash == this.user.hash) ||
        (item.to.hash == this.oponent.hash && item.from.hash == this.user.hash)
      );
    });
  }

  scrollToDown() {
    const el = this.$refs.messages as HTMLFormElement;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }

  sendMessage() {
    if (!this.message.trim() || !Object.keys(this.oponent).length) {
      return;
    }
    const message = {
      date: new Date().toJSON(),
      from: this.user,
      to: this.oponent,
      message: this.message.trim(),
    };

    this.message = "";
    this.$emit("send", message);
    this.$nextTick(() => {
      this.scrollToDown();
    });
  }
}
</script>

<style lang="scss">
.messages {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 6px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  margin-left: 15px;
  width: 100%;
  min-height: 400px;
  max-height: 400px;

  .items {
    padding: 30px;
    overflow: auto;
    height: 100%;

    .item {
      padding: 5px 35px 5px 10px;
      border-radius: 50px;
      border: 1px solid #ddd;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      width: fit-content;
      font-size: 12px;

      &.me {
        margin-left: auto;
      }

      .avatar {
        border-radius: 50%;
        width: 35px;
        height: 35px;
        overflow: hidden;
        margin-right: 15px;

        img {
          object-fit: cover;
          object-position: center;
          width: 100%;
          height: 100%;
        }
      }
    }

    .empty-opponent,
    .empty-messages {
      display: flex;
      height: 100%;
      justify-content: center;
      align-items: center;
      text-align: center;
      color: #999;
    }
  }

  .sender {
    display: flex;
    align-items: center;
    margin-top: auto;
    border-top: 1px solid #eee;
    padding: 30px;

    .message {
      width: 100%;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 10px;
      font-family: Arial, sans-serif;

      &:focus {
        outline: none;
      }
    }

    .btn-send {
      min-width: 25px;
      margin-left: 15px;
      color: #e684ae;
    }
  }
}
</style>