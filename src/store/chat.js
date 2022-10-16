/*
 * @Author: croy 
 * @Date: 2022-10-02 20:11:07
 * @LastEditors: croy 
 * @LastEditTime: 2022-10-09 00:54:48
 * @FilePath: /Ali-Pro-PC/src/store/chat.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */


export default {
   state :  {
    openChat:{
      roomId: '',
    },
    theChatRoom:[
      {
        roomId:'1',       //聊天室ID
        roomName:'room',  //聊天室名称
        //聊天室成员
        Members:[     
          {
            userName:'John',       //用户名
          },{
            userName:'user', 
          },{
            userName:'croy', 
          }  
        ],
        //历史消息
        Message_history:[
          {
            send_user: 'John',    //发送者
            send_time: '',        //发送时间
            send_content: 'hello John', //内容
          },
          {
            send_user: 'user',
            send_time: '',
            send_content: 'hello user',
          },
          {
            send_user: 'croy',
            send_time: '',
            send_content: 'hello croy',
          }
        ]
      }
    ]
  }
  ,
  getters: {
    theChatRoom(state) {
      return state.theChatRoom
    },
    openChat(state) {
      return state.openChat
    },
  },
  
  mutations: {
    setTheChatRoom(state, data) {
      let obj = {...data}
      state.theChatRoom[obj.index].Message_history.push({
        send_user: obj.send_user,    //发送者
        send_time: obj.send_time,        //发送时间
        send_content: obj.send_content, //内容
      })
      console.log(data);
    },
    ADD_THECHATROOM(state,data){
      state.theChatRoom.push(data)
    },
    SET_OPENCHAT(state,data){
      state.openChat = data
    },
    theChatRoom_add_member(state,data,index){
      state.theChatRoom[index].Members.push(data)
    }
  }
}
