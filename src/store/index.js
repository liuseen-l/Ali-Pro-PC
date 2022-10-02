import Vuex from 'vuex'

import Vue from 'vue'

Vue.use(Vuex)

import extample from './example.js'
import recommand from './recommand.js'

export default new Vuex.Store({
<<<<<<< HEAD
  modules: {
    extample,
    recommand,
  },
})
=======
  state: {
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
    }
  },
  actions: {
    setTheChatRoom(context, data) {
      // context.commit('setTheChatRoom',data)
      let obj = {...data}
      context.state.theChatRoom[obj.index].Message_history.push({
        send_user: obj.send_user,    //发送者
        send_time: obj.send_time,        //发送时间
        send_content: obj.send_content, //内容
      })
      console.log(data);
    },
  },
  modules:
  {
    extample
  }
})
>>>>>>> 04c26115670787f6f7c56576066555c33d0262fa
