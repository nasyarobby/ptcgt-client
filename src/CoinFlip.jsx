import { useEffect, useState } from "react"
import "./CoinFlip.css"
export default function CoinFlip({sendCmd, lastMessage, setStats, setLastResult}) {
    const [result, setResult] = useState("tails-still")
    const [canFlip, setCanFlip] = useState(true)
   
    function flipCoin() {
        sendCmd('flip_coin')
    }

    useEffect(() => {
        if(lastMessage) {
            const msg = JSON.parse(lastMessage.data);
            if(msg.c === 's_flip_coin_heads') {

                if(result === 'heads') {
                    setResult("")
                }

                setResult('heads')
                new Promise(res => {
                    setTimeout(() => {
                        res()
                }, 2000)
            }).then(() => {
                setCanFlip(true)
                setResult("heads-still")
                setStats({
                    ...msg.d
                })
                setLastResult("HEAD!")
            })
        }
            if(msg.c === 's_flip_coin_tails') {

                if(result === 'tails') {
                    setResult("")
                }

                setResult('tails')
                new Promise(res => {
                    setTimeout(() => {
                        res()
                }, 2000)
            }).then(() => {
                setCanFlip(true)
                setResult("tails-still")
                setStats({
                    ...msg.d
                })
                setLastResult("TAIL!")
            })
        }
    }
    }, [lastMessage])

    return <div id="coin" className={result} onClick={() => {
        if(canFlip) {
            setResult("")
            console.log(canFlip)
            flipCoin()
            setCanFlip(false)
        }
        else {
            console.log("still flipping")
        }
    }}>
    <div className="side-a ">
    {/* <img height="100%" src = 'https://www.pngmart.com/files/23/Masterball-PNG-Free-Download.png' /> */}
    </div>
    <div className="side-b"></div>
  </div>
}