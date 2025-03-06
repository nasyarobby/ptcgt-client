import { w3cwebsocket as WSClient } from "websocket";

/**
 * @type {WSClient & {sendCmd: (cmd: string, data: object) => void}}
 */
const ws = new WSClient("ws://192.168.1.100:8080");
ws.name = localStorage.getItem("username");
ws.token = localStorage.getItem("token");
ws.roomId = localStorage.getItem("roomId");

ws.sendCmd = (cmd, data) => {
  const populatedData = { cmd, pid: ws.token, roomId: ws.roomId, ...data }
  console.log("sending cmd "+cmd, populatedData)
  ws.send(JSON.stringify(populatedData));
};

ws.parsers = [
  {
    cmd: "s_ok_auth",
    parser: (d, c) => {
      ws.token = d.pid;
      ws.name = "default";
      localStorage.setItem("token", d.pid);
    },
  },
];

ws.onmessage = (message) => {
  const parsed = JSON.parse(message.data);
  const cmd = parsed.c;
  const data = parsed.d;
  ws.parsers.filter(item => item.cmd === cmd).forEach(item => {
    item.parser(data, cmd)
  })
};

export default ws;
