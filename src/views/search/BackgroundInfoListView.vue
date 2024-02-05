<script>
import {useMainStore} from "@/store/store";
import {snackbar} from "mdui";
export default {
  // props: {
  //   keyword: {
  //     type: String,
  //     required: true
  //   },
  //   itemsPerPage: {
  //     type: Number,
  //     required: false
  //   },
  //   pageNumber: {
  //     type: Number,
  //     required: false
  //   }
  // },
  data(){
    return {
      keyword: this.$route.params.keyword,
      searchResult: null,
      isLoading: false
    }
  },
  methods:{
    fetchData(){
        this.isLoading = true
        this.$axios.get('/api/get_object_by_keyword',{
          headers: {
            'Authorization': 'Token ' + useMainStore().userInfo.token, // 请求头带上token
            'Content-Type': 'application/json'
          },
          params: {
            keyword: this.keyword,
          }
        }).then(response => {
          if (response.data.code === 200) {
            this.searchResult = response.data.objects
            this.isLoading = false
          } else {
            snackbar({
              message: response.data.msg,
            });
            this.isLoading = false
          }
        }).catch(error => {
          console.log(error)
          snackbar({
            message: error,
          });
          this.isLoading = false
        })
    }
  },
  created() {
    // 若是直接访问该页面，需要获取一次数据
    this.fetchData()
  },
  watch: {
    // 监听路由变化,当路由变化时重新获取数据
    $route(to, from) {
      this.keyword = to.params.keyword
      this.fetchData()
    }
}
}
</script>

<template>
  <div class="list-container" v-if="searchResult && searchResult.length">
    <mdui-linear-progress v-if="isLoading"></mdui-linear-progress>
    <mdui-list v-if="!isLoading">
      <mdui-list-item v-for="item in this.searchResult" alignment="center" description="简介示例">
        {{item.name}}
        <mdui-icon slot="icon" name="people"></mdui-icon>
        <mdui-chip v-if="item.role === 0" icon="person" slot="end-icon">人物</mdui-chip>
        <mdui-chip v-if="item.role === 1" icon="business" slot="end-icon">公司</mdui-chip>
        <mdui-chip v-if="item.gender === 0" icon="woman" slot="end-icon">女</mdui-chip>
        <mdui-chip v-if="item.gender === 1" icon="man" slot="end-icon">男</mdui-chip>
      </mdui-list-item>
    </mdui-list>
  </div>
  <div class="error-container" v-else>
    <mdui-icon name='error_outline'></mdui-icon>
    <mdui-typo-display-1>没有找到相关信息</mdui-typo-display-1>
  </div>
</template>

<style scoped>
.list-container{
  margin: 20px 60px 20px 60px;
  padding: 5px 0 5px 0;
  border: .0625rem solid rgb(var(--mdui-color-surface-variant));
  border-radius: var(--mdui-shape-corner-large);
  display: flex;
  flex-direction: column;
  align-items: center;
}

mdui-linear-progress{
  margin: 10px 0 10px 0;
  width: 96%;
}

mdui-list{
  width: 100%;
}
mdui-list-item mdui-chip{
  margin-left: 10px;
}

.error-container{
  margin: 20px 60px 20px 60px;
  padding: 60px;
  display: flex;
  z-index: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: .0625rem solid rgb(var(--mdui-color-surface-variant));
  border-radius: var(--mdui-shape-corner-large);
}
.error-container mdui-icon{
  font-size: 80px;
  color: rgba(var(--mdui-color-on-surface-variant));
}
.error-container mdui-typo-display-1{
  color: var(--mdui-color-error);
}

@media screen and (max-width: 600px) {
  .list-container{
    margin: 20px 30px 20px 30px;
    flex-direction: column;
  }
  .error-container{
    margin: 20px 30px 20px 30px;
  }
}
</style>