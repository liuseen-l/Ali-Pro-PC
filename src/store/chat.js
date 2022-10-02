/*
 * @Author: croy 
 * @Date: 2022-10-02 20:11:07
 * @LastEditors: croy 
 * @LastEditTime: 2022-10-02 20:14:20
 * @FilePath: /Ali-Pro-PC/src/store/chat.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const state =  {
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

const actions = {
  setTheChatRoom(state, data) {
    let obj = {...data}
    state.theChatRoom[obj.index].Message_history.push({
      send_user: obj.send_user,    //发送者
      send_time: obj.send_time,        //发送时间
      send_content: obj.send_content, //内容
    })
    console.log(data);
  }
}


const mutations = {
  setTheChatRoom(context, data) {
    // context.commit('setTheChatRoom',data)
    let obj = {...data}
    context.state.theChatRoom[obj.index].Message_history.push({
      send_user: obj.send_user,    //发送者
      send_time: obj.send_time,        //发送时间
      send_content: obj.send_content, //内容
    })
    console.log(data);
  }

}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}