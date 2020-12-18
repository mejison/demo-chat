<template>
  <div class="messanger">
    <users :items="users" @select="onSelectUser" />
    <messages
      :oponent="oponent"
      :user="user"
      :items="messages"
      @send="onSend"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import socket from "~/plugins/socket.io.js";

@Component({})
export default class Messanger extends Vue {
  name = "Messanger";

  users = [];

  user: any = {};

  oponent: any = {};

  messages = [];

  onSelectUser(user) {
    this.oponent = user;
  }

  onSend(message) {
    this.messages = [...this.messages, message];
    socket.messages.emit("send-message", message);
  }

  beforeMount() {
    socket.members.emit("get-all-members", (members) => {
      this.users = members
        .filter((user) => user.hash)
        .filter((user) => user.hash != this.user.hash);
    });

    socket.messages.emit("get-all-messages", (messages) => {
      this.messages = messages;
    });

    socket.messages.on("new-message", (message) => {
      this.messages = [...this.messages, message];
    });

    socket.members.on("new-user", (user) => {
      const exist = this.users.find((member) => member.hash == user.hash);
      if (!exist) {
        this.users = [...this.users, user];
      }
    });
    this.checkExistUser();
  }

  checkExistUser() {
    const user = localStorage.getItem("user");
    const newUser = "{}";

    if (!user) {
      const username = prompt("Enter username");
      const abbr = username
        .match(/\b(\w)/g)
        .slice(0, 2)
        .join("");

      const newUser = JSON.stringify({
        hash: Number(new Date()),
        name: username,
        avatar: `//placehold.it/100x100?text=${abbr}`,
      });
      localStorage.setItem("user", newUser);
    }

    const member = JSON.parse(user || newUser);
    this.user = member;
    socket.members.emit("join-user", member);
  }
}
</script>

<style lang="scss">
.messanger {
  display: flex;
  justify-content: space-between;
  min-width: 800px;
  margin: 0 auto;

  .users {
  }
}
</style>