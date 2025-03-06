import { w3cwebsocket as WSClient } from "websocket";

const ws = new WSClient("ws://192.168.1.100:8080");
ws.name = localStorage.getItem("username");
ws.token = localStorage.getItem("token");

ws.sendCmd = (cmd, data) => {
  console.log("sending cmd "+cmd, data)
  ws.send(JSON.stringify({ cmd, pid: ws.token, ...data }));
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
