<!--
 * @Author: croy 
 * @Date: 2022-10-01 20:34:11
 * @LastEditors: croy 
 * @LastEditTime: 2022-10-01 20:50:50
 * @FilePath: /Ali-Pro-PC/src/components/mapView/MapMessageBox/MapSelfBox.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

                <!-- 聊天室用户自己的消息框 -->

<template>
  <div class="chat_right">
    <div class="chat_right_item">
        <div class="chat_right_name clearfix"> {{msg.username}} </div>
        <span class="chat_right_content clearfix"> {{msg.content}} </span>
    </div>
  </div>
</template>

<script>
export default {
  props:['message'],
  data(){
    return{
      msg:{
        username:'user',
        content:'content',
      }
    }
  }   
}
</script>

<style  scoped>
    .chat_right{
        width: 100%;
        height: auto;
        min-height: 100px;
        margin-top: 10px;
        margin-bottom: 10px;
        animation-name: fadeIn;
        animation-duration: 1.5s;
        zoom:1;
        display: inline-block;
        padding-right: 10px;
    }
    img.chat_right_img{
        width: 50px;
        height: 50px;
        float: right;
        margin-top: 10px;
        margin-left: 10px;
        margin-right: 10px;
        border-radius: 25px;
    }
    .chat_right_item{
        width: auto;
        max-width: calc(100% - 70px - 15px);
        height: auto;
        float: right;
    }
    .chat_time{
        width: 100%;
        text-align: center;
        color: gray;
    }
    .chat_right_name{
        color: darkgray;
        text-align: right;
    }
    .chat_left_name{
        color: darkgray;
        text-align: left;
    }
    .chat_right_content{
        float: right;
        padding: 10px; /* changed */
        margin-top: 10px;
        border-radius: 10px 0 10px 10px;
        background:wheat;
        color: black;
        word-wrap:break-word;
		word-break:break-all;
        position: relative;
        box-shadow: 0 5px 15px rgba(20, 20, 20, 0.8);
        display: flex;
        align-items: center;
    }
</style>
