import {w3cwebsocket as WSClient} from "websocket";

const ws = new WSClient('ws://localhost:8080')
ws.name = localStorage.getItem('username')
ws.token = localStorage.getItem('token')

ws.sendCmd = (cmd, data) => {
    ws.send(JSON.stringify({cmd, pid: ws.token, ...data}))
}

ws.parsers = {
    's_ok_auth': (d, c) => {
        console.log(c,d)
        localStorage.setItem('token', d.pid)
    }
}

ws.onmessage = (message => {
    const parsed = JSON.parse(message.data)
    const cmd = parsed.c;
    const data = parsed.d;
    const parser = ws.parsers[cmd]
    if(parser) parser(data, cmd)
})

export default ws;