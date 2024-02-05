<script>
import HeaderBlock from "@/components/HeaderBlock.vue";
import SearchField from "@/components/SearchField.vue";

export default {
  data(){
    return {
          header: {
            title: "背景挖掘",
            describe: "对指定实体对象进行查询",
            actions: [
            ],
            imgUrl:'',
            height: "600px"
          },
          searchField:{
            text:"实体关键词",
            button:[
              {
                text:"挖掘",
                icon:"search",
                subUrl:"/search/background_info/"
              }
            ]
          }
    }
  },
  components:{
    HeaderBlock,SearchField
  }
}
</script>

<template>
  <HeaderBlock :config="this.header"></HeaderBlock>
  <SearchField :config="this.searchField"></SearchField>
  <router-view></router-view>
</template>

<style scoped>

</style>