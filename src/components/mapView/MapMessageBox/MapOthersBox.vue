<!--
 * @Author: croy 
 * @Date: 2022-10-01 20:41:10
 * @LastEditors: croy 
 * @LastEditTime: 2022-10-01 23:23:10
 * @FilePath: /Ali-Pro-PC/src/components/mapView/MapMessageBox/MapOthersBox.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="chat_left">
    <div class="chat_left_item">
        <div class="chat_left_name clearfix">{{msg.username}}</div>
        <span class="chat_left_content clearfix">{{msg.content}}</span>
    </div>
  </div>
</template>

<script >
export default {
  props:['message'],
  data(){
    return{
      msg:{
        username:'serve',
        content:'content',
      }
    }
  },
  computed:{
    // num:function(){
    //   return this.$store.state.num
    // }
  },
  methods: {
    // this.$store.dispatch('setNum',0)
    // this.$store.commit('setNum',2)
    // console.log(this.$store.state.num)
  }
}
</script>

<style scoped>
    .chat_left{
        width: 100%;
        height: auto;
        min-height: 100px;
        margin-top: 10px;
        margin-bottom: 10px;
        animation-name: fadeIn;
        animation-duration: 1.5s;
        zoom:1;
        display: inline-block;
        padding-left: 10px;
    }
    img.chat_left_img{
        width: 50px;
        height: 50px;
        float: left;
        margin-top: 10px;
        margin-left: 10px;
        margin-right: 10px;
        border-radius: 25px;
    }
    .chat_left_item{
        width: auto;
        max-width: calc(100% - 70px - 15px);
        height: auto;
        float: left;
    }
    .chat_left_item .chat_left_chat{
        float: left;
    }
    .chat_left_item .chat_left_content{
        padding: 10px; /* changed */
        margin-top: 10px;
        background-color: #f4f5f7;
        color: black;
        display: inline-block;
        overflow: auto;
        border-radius: 0 10px 10px 10px;
        word-wrap:break-word;
		word-break:break-all;
        position: relative;
        box-shadow: 0 5px 15px rgba(20, 20, 20, 0.8);
        align-items: center;
    }
    .chat_left_name{
        color: darkgray;
        text-align: left;
    }
</style>