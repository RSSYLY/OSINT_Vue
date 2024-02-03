<!--用户统计-->

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: []
    };
  },
  methods: {
    async loadUsers() {
      const response = await axios.get('/api/get_all_users_info/');
      this.users = response.data;
    }
  },
  created() {
    this.loadUsers();
  }
};
</script>

<template>
  <div>
    <h1>用户统计</h1>
    <p>总用户数: {{ users.length }}</p>

  </div>
</template>


<style scoped>
  /* 组件的样式 */
</style>