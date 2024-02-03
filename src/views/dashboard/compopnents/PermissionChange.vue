<!--权限变更-->

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: [],
      selectedUser: null
    };
  },
  methods: {
    async loadUsers() {
      const response = await axios.get('/api/get_all_users_info/');
      this.users = response.data;
    },
    async changePermission() {
      if (!this.selectedUser) {
        return;
      }
      const response = await axios.post('/api/change_permission/', {
        userId: this.selectedUser.id
      });
      if (response.data.success) {
        alert('权限变更成功');
      } else {
        alert('权限变更失败');
      }
    }
  },
  created() {
    this.loadUsers();
  }
};
</script>

<template>
  <div>
    <h1>权限变更</h1>
    <select v-model="selectedUser">
      <option v-for="user in users" :value="user" :key="user.id">
        {{ user.name }}
      </option>
    </select>
    <button @click="changePermission">变更权限</button>
  </div>
</template>


<style scoped>
  /* 组件的样式 */
</style>