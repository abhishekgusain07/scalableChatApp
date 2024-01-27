"use client"

import { useState } from "react";
import { useSocket } from "../context/SocketProvider"

export default function Page(){
  const {sendMessage, messages} = useSocket();
  const [message, setMessage] = useState('')
  return (
    <div>
    <div className="main">
      <div>
        <div className="heading">
        <h1>Scalable Chat App</h1>
      </div>
      <div className="message">
        {
          messages.map((message) =>(
            <div key={message} className="eachMessage">
              <p>{message}</p>
            </div>
          ))
        }
      </div>
      <div className="second">
        <input onChange={e => setMessage(e.target.value)} className="" placeholder="Message..."></input>
        <button onClick={e => sendMessage(message)} className="button-85" role="button">Send</button>
      </div>
      </div>
      </div>
    </div>
  )
}
