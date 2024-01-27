<script>
import HeaderBlock from "@/components/HeaderBlock.vue";
export default {
  data(){
    return {
          header: {
            title: "背景挖掘",
            describe: "支持各种实体的查询",
            actions: [
            ],
            imgUrl: "",
            height: "600px"
          }
    }
  },
  components:{
    HeaderBlock
  }
}
</script>

<template>
   <HeaderBlock :config="this.header"></HeaderBlock>
   <div class="text-container" >
     <div class="text-field">
       <mdui-text-field label="关键词" clearable>
         <mdui-button-icon slot="icon" icon="search"></mdui-button-icon>
       </mdui-text-field>
     </div>
   </div>
</template>

<style scoped>
 .text-container{
   margin: -60px 20px 0 20px;
 }
</style>