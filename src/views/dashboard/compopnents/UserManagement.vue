<!--账号管理-->

<script>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const users = ref([]);
    const role = ref(localStorage.getItem('role'));

    onMounted(async () => {
      if (role.value === 'admin') {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/get_all_users_info/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        users.value = response.data;
      }
    });

    watch(users, (newVal) => {
      console.log(newVal);
    });

    return {
      users
    };
  }
};
</script>
<template>
  <div>
    <h1>账号管理</h1>
    <div v-for="user in users" :key="user.id">
      <h2>{{ user.name }}</h2>
      <p>{{ user.email }}</p>
      <!-- 其他用户信息 -->
    </div>
  </div>
</template>


<style scoped>
  /* 组件的样式 */
</style>