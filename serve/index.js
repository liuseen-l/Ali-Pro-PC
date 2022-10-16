/*
 * @Author: croy 
 * @Date: 2022-10-01 12:16:27
 * @LastEditors: croy 
 * @LastEditTime: 2022-10-08 23:37:40
 * @FilePath: /Ali-Pro-PC/serve/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const Ws = require('ws');
let clients = []
let init_server = function (Ws) {
  const server = new Ws.Server({
    port: 5500
  });
  const init = () => {
    bindEvent();
  }
  function bindEvent() {
    server.on('open', handleOpen);
    server.on('close', handleClose);
    server.on('error', handleError);
    server.on('connection', function connection(client) {
      clients.push(client);
      client.on('message', function incoming(data) {
        console.log();
        let dateSend = JSON.parse(data)
        let dateSendReq = JSON.stringify(dateSend);
        clients.forEach(client => client.send(dateSendReq));
      })
    })
  }
  function handleOpen(e) { console.log('connection opened', e); }
  function handleClose(e) { console.log('connection close', e); }
  function handleError(e) { console.log('connection error', e); }
  function handleConnection(ws) {
    console.log('connection con');
    ws.on('message', handleWsMessage)
  }
  function handleWsMessage(message) {
    server.clients.forEach((c) => {
      console.log(1, JSON.parse(message));
      c.send(message)
    })
  }
  init();
}
init_server(Ws);