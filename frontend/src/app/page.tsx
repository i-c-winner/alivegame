'use client'
import {useEffect} from "react";

const ws = new WebSocket('ws://localhost:8080')
export default function Home() {

  useEffect(() => {
ws.onopen=()=>{
  console.log("WebSocket connection opened")
}
    ws.onmessage=(message)=>{
      console.log(message.data, "message")
    }
  }, []);
  return (
      <div>Locale</div>
  )
}
