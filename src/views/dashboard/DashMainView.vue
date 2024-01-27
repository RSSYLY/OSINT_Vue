<script setup>
import {useMainStore} from "@/store/store.js";
import {snackbar} from "mdui/functions/snackbar.js";

</script>

<template>
  <!--  TODO 控制台示例，将实现对系统的监控（运行情况、使用人数、请求数），及对用户的管理 -->

  <div class="container">
    <div class="shade"></div>
    <!--  左边侧边栏，分为用户部分和数据部分  -->
    <mdui-card class="card-left">
      <div class="container-left">
        <mdui-drawer id="drawer" :overlay="true" :position="'left'">
          <mdui-list>
            <!--            用户管理            -->
            <mdui-list-item>
              <div class="mdui-list-item-content-h" >用户管理</div>
              <mdui-list>
                <mdui-list-item>
                  <div class="mdui-list-item-content">账号管理</div>
                </mdui-list-item>
                <mdui-list-item>
                  <div class="mdui-list-item-content">权限变更</div>
                </mdui-list-item>
                <mdui-list-item>
                  <div class="mdui-list-item-content">用户统计</div>
                </mdui-list-item>
              </mdui-list>
            </mdui-list-item>
            <!--            数据管理            -->
            <mdui-list-item>
              <div class="mdui-list-item-content-h">数据管理</div>
              <mdui-list>
                <mdui-list-item>
                  <div class="mdui-list-item-content">实时监测</div>
                </mdui-list-item>
                <mdui-list-item>
                  <div class="mdui-list-item-content">数据分析</div>
                </mdui-list-item>
                <mdui-list-item>
                  <div class="mdui-list-item-content">请求管理</div>
                </mdui-list-item>
              </mdui-list>
            </mdui-list-item>
          </mdui-list>
        </mdui-drawer>
      </div>
    </mdui-card>
  </div>
    <!--  右边显示数据部分  -->
<mdui-card class="container-right">

</mdui-card>

</template>

<style scoped>
.shade {
  z-index: 0;
  position: absolute;
  width: 100%;
  height: calc(100vh - 64px);
  background: rgba(var(--mdui-color-surface-dim), .8);
}

.container {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 64px);
  width: 100%;
}

.container-right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
}


.card-left {
  position: absolute;
  left: 0;
  width: 11%;
  height: 100%;
  z-index: 1;
}

.mdui-list-item-content {
  font-size: 20px;
  font-weight: 500;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.mdui-list-item-content-h {
  font-size: 15px;
  font-weight: 500;
  display: flex;
  flex-direction: row;
  justify-content: left;
  color: #646464;
}
</style>