<script setup>
import {useMainStore} from "@/store/store.js";
import { snackbar } from "mdui/functions/snackbar.js";
import router from "@/router";

// 删除store的用户信息
const store = useMainStore();
const userInfo = store.userInfo;
const userStatus = store.userStatus;
userStatus.isLogin = false;
userInfo.id = 0;
userInfo.token = "";
userInfo.username = "";
userInfo.email = "";
userInfo.isSuperuser = false;
userInfo.isStaff = false;
userInfo.isActive = false;
userInfo.dateJoined = "";
userInfo.lastLogin = "";
// 清除localStorage中的用户信息
localStorage.removeItem('token');
// 提示用户已退出登录
snackbar({
  message: "已退出登录",
});
// 跳转到登录页
router.push('/login');

</script>

<template>

</template>

<style scoped>

</style>