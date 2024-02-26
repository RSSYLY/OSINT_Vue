<!--权限变更-->

<script>
import axios from 'axios';
import {useMainStore} from "@/store/store";
import {snackbar} from "mdui";

export default {
  name: "PermissionChange",
  data() {
    return {
      users: null,
      isLoading: false
    };
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
    },
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
};
</script>

<template>
  <div>
    <h1 class="centered-title">权限变更</h1>
    <mdui-divider></mdui-divider>
    <!-- 展示用户信息 -->
    <div class="list-container" v-if="users && users.length">
      <mdui-linear-progress v-if="isLoading"></mdui-linear-progress>
      <mdui-list v-if="!isLoading">
        <mdui-list-subheader>权限等级</mdui-list-subheader>
        <mdui-collapse class="item">
          <mdui-collapse-item value="item-1">
            <mdui-list-item slot="header" icon="near_me">超级管理员</mdui-list-item>
            <div style="margin-left: 2.5rem">
              <mdui-list-item>
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
                        <mdui-button variant="elevated" icon="security" class="ChangeUser-button">升级</mdui-button>
                        <mdui-button variant="filled" icon="delete" style="background: crimson">降级</mdui-button>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </mdui-list-item>
            </div>
          </mdui-collapse-item>
          <mdui-collapse-item value="item-2">
            <mdui-list-item slot="header" icon="near_me">管理员</mdui-list-item>
            <div style="margin-left: 2.5rem">
              <mdui-list-item>Item 2 - subitem</mdui-list-item>
            </div>
          </mdui-collapse-item>
          <mdui-collapse-item value="item-3">
            <mdui-list-item slot="header" icon="near_me">普通用户</mdui-list-item>
            <div style="margin-left: 2.5rem">
              <mdui-list-item>Item 3 - subitem</mdui-list-item>
            </div>
          </mdui-collapse-item>
        </mdui-collapse>
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


</style>