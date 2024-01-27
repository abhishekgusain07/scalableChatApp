"use client"
// because we want to execute it on clients rather than server.
import React, { use, useCallback, useContext, useEffect, useState } from "react"
import {Socket, io} from "socket.io-client"



interface  SocketProvideProps {
    children?: React.ReactNode
}
interface ISocketContext {
    sendMessage: (msg:string) => any;
    messages: string[]
}
const SocketContext = React.createContext<ISocketContext | null>(null)


export const useSocket = () => {
    const state = useContext(SocketContext);
    if (!state) throw new Error(`state is undefined`);
  
    return state;
};

export const SocketProvider: React.FC<SocketProvideProps> = ({children}) => {
    const [socket, SetSocket] = useState<Socket>()
    const [messages, SetMessages] = useState<string[]>([])
    const sendMessage: ISocketContext["sendMessage"] = useCallback((msg) => {
        if(socket) {
            socket.emit("event:message", {message: msg})
        }
    },[socket])

    const onMessageRec = useCallback((msg: string) => {
        console.log(`message received from  server`, msg)
        const {message} = JSON.parse(msg) as {message: string}
        SetMessages((prev) => [...prev, message])
    },[])

    useEffect(() => {
        const _socket = io("http://localhost:8000");
        _socket.on("message", onMessageRec)
        SetSocket(_socket)
        return () => {
            _socket.disconnect()
            _socket.off('message',onMessageRec)
            SetSocket(undefined)
        };
    }, [])
    return (
        <SocketContext.Provider value={{sendMessage, messages}}>
            {children}
        </SocketContext.Provider>
    )
}