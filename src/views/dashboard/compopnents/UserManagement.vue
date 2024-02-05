<!--账号管理-->

<script>
import {ref, onMounted, watch} from 'vue';
import axios from 'axios';
import {useMainStore} from "@/store/store";
import {snackbar} from "mdui";

export default {
  data() {
    return {
      // keyword: this.$route.params.username,
      searchResult: null,
      isLoading: false
    }
  },
  methods: {
    fetchData() {
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
              this.searchResult = response.data.events
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
    <h1>账号管理</h1>
    <!-- 展示用户信息 -->
    <div v-if="searchResult">
      <div v-for="user in searchResult">
        <div>
          <span>{{ user.username }}</span>
          <span>{{ user.email }}</span>

        </div>
      </div>

    </div>
  </div>
</template>


<style scoped>
/* 组件的样式 */
</style>