<script>
export default {
  props:{
    config:{
      type:Object,
      required:true
    }
  }
}
</script>

<template>
  <div class="container" :style="{backgroundImage:'url('+config.imgUrl+')'}">
    <div class="content">
      <div class="title">{{config.title}}</div>
      <div class="describe">{{config.describe}}</div>
      <div class="button">
        <mdui-button v-for="item in config.actions"> {{item.text}}</mdui-button>
      </div>
    </div>
  </div>

</template>

<style scoped>
.container{
  margin-bottom: 30px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 0 0  var(--mdui-shape-corner-extra-large) var(--mdui-shape-corner-extra-large);
}
.content{
  height: 220px;
  background: rgba(var(--mdui-color-surface-dim),0.5);
  border-radius: 0 0  var(--mdui-shape-corner-extra-large) var(--mdui-shape-corner-extra-large);
}

@media screen and (max-width: 1200px) {
  .content{
    padding: 40px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
  }
  .title{
    font-size: var(--mdui-typescale-display-large-size);
    font-weight: var(--mdui-typescale-display-large-weight);
    color:rgba(var(--mdui-color-on-surface));
  }
  .describe{
    font-size: var(--mdui-typescale-headline-large-size);
    font-weight: var(--mdui-typescale-headline-large-weight);
    color: rgba(var(--mdui-color-on-surface-variant));
  }
  .button{
    margin-top: 20px;
    display: flex;
    gap:10px;
  }
}

@media screen and (min-width: 1201px) {
  .content{
    padding: 40px 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: nowrap;
  }
  .title{
    font-size: calc(var(--mdui-typescale-display-large-size)*1);
    font-weight: var(--mdui-typescale-display-large-weight);
    color:rgba(var(--mdui-color-on-surface));
  }
  .describe{
    font-size: calc(var(--mdui-typescale-headline-large-size)*1);
    font-weight: var(--mdui-typescale-headline-large-weight);
    color: rgba(var(--mdui-color-on-surface-variant));
  }
  .button{
    margin-top: 20px;
    display: flex;
    gap:10px;
  }
}




</style>