<!--账号管理-->

<script>
import {ref, onMounted, watch} from 'vue';
import axios from 'axios';
import {useMainStore} from "@/store/store";
import {snackbar} from "mdui";


export default {
  name: "UserManagement",
  components: {

  },
  data() {
    return {
      // keyword: this.$route.params.username,  //TODO 搜索用户名
      users: null,
      isLoading: false
    }
  },
  methods: {
    fetchData() {
      // ------------获取所有用户信息----------------
      this.isLoading = true
      this.$axios.get('/api/get_all_users_info/', {
        headers: {
          'Authorization': 'Token ' + useMainStore().userInfo.token, // 请求头带上token
          'Content-Type': 'application/json'
        },
        //  params: {}

      }).then(
          response => {
            console.log(response.data);
            if (response.data.code === 200) {
              this.users = response.data.events
              this.isLoading = false
            } else {
              snackbar({
                message: response.data.msg,
              });
              this.isLoading = false
            }
          }
      ).catch(
          error => {
            console.log(error)
            snackbar({
              message: error,
            });
            this.isLoading = false
          }
      )

    }

  },
  created() {
    this.fetchData()
  },
  watch: {

    $route(to, from) {
      //this.keyword = to.params.username
      this.fetchData()
    }
  }

}
</script>


<template>
  <div>
    <h1 class="centered-title">账号管理</h1>
    <mdui-divider></mdui-divider>
    <!-- 展示用户信息 -->
    <div class="list-container" v-if="users && users.length">
      <mdui-linear-progress v-if="isLoading"></mdui-linear-progress>
      <mdui-list v-if="!isLoading">
        <div class="mdui-table">
          <table class="mdui-table mdui-table-hoverable">
            <thead>
            <tr>
              <th>ID</th>
              <th>用户名</th>
              <th>邮箱</th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>
                <mdui-button variant="elevated" icon="security" class="ChangeUser-button">修改</mdui-button>
                <mdui-button variant="filled" icon="delete" style="background: crimson">删除</mdui-button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </mdui-list>
    </div>
    <div class="error-container" v-else>
      <mdui-icon name='error_outline'></mdui-icon>
      <mdui-typo-display>没有找到相关信息或权限不足</mdui-typo-display>
    </div>

  </div>
</template>

<style scoped>
.centered-title {
  text-align: center;
  margin-top: 20px;
}

.error-container mdui-typo-display {
  color: var(--mdui-color-error);
}


</style>