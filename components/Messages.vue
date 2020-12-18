<template>
  <div class="messages">
    <div class="items">
      <div
        class="item"
        v-for="(message, indexMessage) in messages"
        :key="indexMessage"
      >
        <div class="avatar">
          <img :src="message.from.avatar" alt="avatar" />
        </div>
        <p>
          {{ message.message }}
        </p>
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
import socket from "~/plugins/socket.io.js";

@Component({})
export default class Messages extends Vue {
  name = "Messages";
  message = "";
  messages = [
    {
      from: {
        name: "Alex Kovalchuk",
        avatar: "//placehold.it/100x100?text=AK",
      },
      to: {
        name: "Jura Siroduk",
        avatar: "//placehold.it/100x100?text=JS",
      },
      message: "hello world",
    },
  ];

  sendMessage() {
    if (!this.message.trim()) {
      return;
    }
    const message = {
      date: new Date().toJSON(),
      from: {
        name: "Alex Kovalchuk",
        avatar: "//placehold.it/100x100?text=AK",
      },
      to: {
        name: "Jura Siroduk",
        avatar: "//placehod.it/100x100?text=JS",
      },
      message: this.message.trim(),
    };

    this.messages = [...this.messages, message];

    this.message = "";
    socket.emit("send-message", message);
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

    .item {
      padding: 5px 35px 5px 10px;
      border-radius: 50px;
      border: 1px solid #ddd;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      width: fit-content;
      font-size: 12px;

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