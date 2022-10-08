<template>
  <div class="CheatRoom">
    <div class="chat_middle" id="chat_middle_item"></div>
    <!-- 输入框 -->
    <div class="infoBottom">
      <div class="infoIcon">
        <i class="el-icon-picture-outline-round"></i>
        <i class="el-icon-sell"></i>
        <i class="el-icon-setting"></i>
        <i class="el-icon-chat-dot-round"></i>
        <i class="el-icon-more-outline"></i>
      </div>
      <textarea class="textarea" v-model="textarea" />
      <el-button class="button" type="" @click="send" size="mini"
        >发送</el-button
      >
    </div>
  </div>
</template>

<script>
const webSocket = new WebSocket("ws://localhost:5500");
export default {
  data() {
    return {
      textarea: "",
      username: "",
      roomId: "1",
      roomArrayIndexOf: -1,
      msgArray: [],
      url: "",
    };
  },
  computed: {
    //获取聊天信息，监听数据变化
    theChatRoom: function () {
      return this.$store.getters.theChatRoom;
    },
    OpenChat: function () {
      return this.$store.getters.openChat;
    }
  },
  methods: {
    send() {
      let dateSend = {
        index: this.roomArrayIndexOf,
        send_user: this.username,
        send_time: new Date(),
        send_content: this.textarea,
      };
      let dateSendReq = JSON.stringify(dateSend);
      webSocket.send(dateSendReq);
      this.textarea = "";
      this.$store.dispatch("setTheChatRoom", dateSend);
      this.$forceUpdate();
    },
    self_message() {
      let localStorageArr = JSON.parse(localStorage.getItem("UserArray"));
      this.username = localStorageArr[0];
      localStorageArr.pop();
      localStorage.setItem("UserArray", JSON.stringify(localStorageArr));
      const send_message = document.getElementById("chat_middle_item");
      let theChatRoom = this.theChatRoom;
      let username = this.username;
      let roomId = this.OpenChat.roomId;
      let roomArrayIndexOf = -1;
      let current_room_information = {};
      let usernameIndexOf = -1;
      theChatRoom.map((item, index) => {
        if (item.roomId == roomId) {
          roomArrayIndexOf = index;
          this.roomArrayIndexOf = index;
          current_room_information = { ...item };
        }
      });
      if (roomArrayIndexOf > -1) {
        current_room_information.Members.map((item, index) => {
          if (item.userName == username) {
            usernameIndexOf = index;
          }
        });
      } else {
        return;
      }
      if (usernameIndexOf > -1) {
        current_room_information.Message_history.map((item, index) => {
          if (item.send_user == username) {
            const oLi = document.createElement("div");
            oLi.innerHTML =
              `
                        <div class="chat_right">
                          <div class="chat_right_item">
                              <div class="chat_right_name clearfix">` +
              item.send_user +
              `</div>
                              <span class="chat_right_content clearfix">` +
              item.send_content +
              ` </span>
                          </div>
                        </div>`;
            console.log(oLi);
            send_message.append(oLi);
            send_message.scrollTop = send_message.scrollHeight;
          } else {
            const oLi = document.createElement("div");
            oLi.innerHTML =
              `
                        <div class="chat_left">
                          <div class="chat_left_item">
                              <div class="chat_left_name clearfix"> ` +
              item.send_user +
              `</div>
                              <span class="chat_left_content clearfix">` +
              item.send_content +
              `</span>
                          </div>
                        </div>`;
            console.log(oLi);
            send_message.append(oLi);
            send_message.scrollTop = send_message.scrollHeight;
          }
        });
      }
    },

    /**
     * websocket about
     */
    handleWsOpen(e) {
      console.log("open");
    },
    handleWsClose(e) {
      console.log("close", e);
    },
    handleWsError(e) {
      console.log("error", e);
    },
    handleWsMessage(e) {
      console.log("message", e);
    },
  },
  mounted() {
    this.self_message();
    webSocket.addEventListener("open", this.handleWsOpen(), false);
    webSocket.addEventListener("close", this.handleWsClose(), false);
    webSocket.addEventListener("error", this.handleWsError(), false);
    webSocket.onmessage = function (data) {
      console.log("客户端接受到服务器的内容", data.data);
      localStorage.setItem("socket", data.data);
      this_bind(data.data);
    };
    //通过该function接收webSocket内部数据
    let MsgArrayPush = function fn(val) {
      let dateSend = JSON.parse(val);
      this.msgArray.push(JSON.parse(val));
      const send_message = document.getElementById("chat_middle_item");
      const oLi = document.createElement("div");
      let ant = "";
      if (dateSend.send_user == this.username) {
        ant =
          `<div class="chat_right">
                <div class="chat_right_item">
                    <div class="chat_right_name clearfix">` +
          dateSend.send_user +
          `</div>
                    <span class="chat_right_content clearfix">` +
          dateSend.send_content +
          ` </span>
                </div>
              </div>`;
      } else {
        ant =
          `<div class="chat_left">
                <div class="chat_left_item">
                    <div class="chat_left_name clearfix"> ` +
          dateSend.send_user +
          `</div>
                    <span class="chat_left_content clearfix">` +
          dateSend.send_content +
          `</span>
                </div>
              </div>`;
      }
      oLi.innerHTML = ant;
      send_message.append(oLi);
      send_message.scrollTop = send_message.scrollHeight;
    };
    //跳出webSocket内的this指向，实现同时范围vue的this实例和webSocket内部数据
    let this_bind = MsgArrayPush.bind(this);
  },
};
</script>

<style>
.CheatRoom {
  padding: 0;
  margin: 0;
  font-family: Consolas, Microsoft YaHei UI, serif;
  font-size: 16px;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.clearfix::after {
  content: "";
  display: block;
  clear: both;
  width: 0;
  height: 0;
  line-height: 0;
  visibility: hidden;
}
.CheatRoom {
  padding: 10px;
}
.textarea {
  color: white;
  margin-left: 7%;
  margin-top: 10px;
  width: 87%;
  height: 50%;
  border: 1px solid rgba(0, 0, 0, 0);
  background-color: rgba(0, 0, 0, 0);
  outline: none;
}
.chat_middle {
  width: 100%;
  height: 380px;
  position: relative;
  box-sizing: border-box;
  overflow: auto;
  border-width: 0;
}
.chat_middle::-webkit-scrollbar {
  display: none;
}

.chat_left {
  width: 100%;
  height: auto;
  min-height: 100px;
  margin-top: 10px;
  margin-bottom: 10px;
  animation-name: fadeIn;
  animation-duration: 1.5s;
  zoom: 1;
  display: inline-block;
}
img.chat_left_img {
  width: 50px;
  height: 50px;
  float: left;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 25px;
}
.chat_left_item {
  width: auto;
  max-width: calc(100% - 70px - 15px);
  height: auto;
  float: left;
}
.chat_left_item .chat_left_chat {
  float: left;
}
.chat_left_item .chat_left_content {
  padding: 10px; /* changed */
  margin-top: 10px;
  background-color: #f4f5f7;
  color: black;
  display: inline-block;
  overflow: auto;
  border-radius: 0 10px 10px 10px;
  word-wrap: break-word;
  word-break: break-all;
  position: relative;
  box-shadow: 0 5px 15px rgba(20, 20, 20, 0.8);
  align-items: center;
}

.chat_right {
  width: 100%;
  height: auto;
  min-height: 100px;
  margin-top: 10px;
  margin-bottom: 10px;
  animation-name: fadeIn;
  animation-duration: 1.5s;

  zoom: 1;
  display: inline-block;
}
img.chat_right_img {
  width: 50px;
  height: 50px;
  float: right;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 25px;
}

.chat_right_item {
  width: auto;
  max-width: calc(100% - 70px - 15px);
  height: auto;
  float: right;
}
.chat_time {
  width: 100%;
  text-align: center;
  color: gray;
}
.chat_right_name {
  color: darkgray;
  text-align: right;
}
.chat_left_name {
  color: darkgray;
  text-align: left;
}
.button {
  background-color: #43434300;
  color: white;
  width: 87%;
  margin-left: 7%;
  padding: 10px 0px;
  outline: none;
}
.button:hover {
  background-color: #ffffff00;
}
.button:visited {
  background-color: #ffffff00;
}
.button:foucs {
  background-color: #ffffff00;
}
.chat_right_content {
  float: right;
  padding: 10px; /* changed */
  margin-top: 10px;
  border-radius: 10px 0 10px 10px;
  background: wheat;
  color: black;
  word-wrap: break-word;
  word-break: break-all;
  position: relative;
  box-shadow: 0 5px 15px rgba(20, 20, 20, 0.8);
  display: flex;
  align-items: center;
}

.split {
  width: 100%;
  height: 1px;
  visibility: hidden;
}

.file {
  width: 100%;
  height: auto;
  min-height: 50px;
  padding: 10px;
  background-color: #f4f5f7;
  border: 1px;
  display: inline-block;
}
.fileinfo {
  float: left;
}
.fileicon {
  float: right;
  width: 50px;
  height: 50px;
}
.filename {
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
  color: black;
  display: inline-block;
}
.filesize {
  width: 100px;
  height: auto;
  font-size: 12px;
  color: rgb(153, 153, 153);
  text-align: end;
}
.infoBottom {
  background: #e8e8e800;
  width: 98%;
  height: 240px;
  display: flex;
  bottom: 0;
  flex-direction: column;
  background: url("~@/assets/images/chat3.png") no-repeat;
  background-position: center;
  background-size: 98% 98%;
  position: absolute;
}
.infoIcon {
  height: 35px;
  width: 100%;
  display: flex;
  line-height: 35px;
  align-items: center;
  padding-left: 30px;
}
.infoIcon i {
  font-size: 24px;
  color: #676767;
  margin-left: 15px;
  cursor: pointer;
}
.infoInput {
  height: 58%;
  width: 100%;
  border: none;
  resize: none;
  padding: 10px;
  box-sizing: border-box;
  color: #434343;
}
.fasong {
  height: 30px;
  width: 80px;
  background-color: #e8e8e8;
  text-align: center;
  line-height: 30px;
  border-radius: 4px;
  color: #58df4d;
  margin-top: 1%;
  align-self: flex-end;
  margin-right: 20px;
  cursor: pointer;
}
</style>
