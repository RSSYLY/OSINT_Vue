<script>
export default {
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  methods: {
    // 执行搜索时跳转url,url由传入参数决定
    search(subUrl) {
      this.$router.push(subUrl+this.keyword)
    }
  },
  data(){
    return {
      keyword: ''
    }
}}
</script>

<template>
  <div class="text-container" >
    <div class="text-field">
      <mdui-text-field @input="keyword = $event.target.value" :label=config.text clearable>
        <mdui-button-icon slot="icon" icon="search"></mdui-button-icon>
      </mdui-text-field>
    </div>
    <div class="button-field">
      <mdui-button @click="search(item.subUrl)" v-for="item in config.button" :icon=item.icon>{{item.text}}</mdui-button>
    </div>
  </div>
</template>

<style scoped>
.text-container{
  margin: 20px 60px 20px 60px;
  display: flex;
  z-index: 1;
}
.text-field{
  width: 100%;
}
.button-field{
  margin-left: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
@media screen and (max-width: 600px) {
  .text-container{
    margin: 20px 30px 20px 30px;
    flex-direction: column;
  }
  .button-field{
    margin-left: 0px;
    display: flex;
    width: 100%;
    margin-top:20px;
    justify-content: left;
  }
}
</style>