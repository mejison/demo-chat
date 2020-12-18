<template>
  <div class="users">
    <div
      class="user-item"
      :class="{ active: indexUser == active }"
      v-for="(user, indexUser) in items"
      :key="indexUser"
      @click="onClickUser(user, indexUser)"
    >
      <div class="avatar">
        <img :src="user.avatar" alt="alt" />
      </div>
      <div class="name">
        {{ user.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component({})
export default class Users extends Vue {
  @Prop({ type: Array, default: () => [] })
  items!: string[];

  active = null;

  onClickUser(user, index) {
    this.active = index;
    this.$emit("select", user);
  }
}
</script>

<style lang="scss">
.users {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 6px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  max-width: 250px;
  min-width: 250px;
  overflow: auto;

  .user-item {
    border-bottom: 1px solid #eee;
    padding: 15px;
    padding-bottom: 15px;
    display: flex;
    align-items: center;
    cursor: pointer;

    &.active {
      background: #ddd;
    }

    &:hover {
      opacity: 0.9;
    }

    .avatar {
      width: 45px;
      height: 45px;
      overflow: hidden;
      border-radius: 50%;
      margin-right: 15px;

      img {
        object-fit: cover;
        object-position: center;
        width: 100%;
      }
    }

    .name {
    }

    &:last-child {
      border-bottom: unset;
    }
  }
}
</style>