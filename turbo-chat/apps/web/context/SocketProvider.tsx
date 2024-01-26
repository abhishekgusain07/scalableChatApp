"use client"
import React, { useCallback, useContext, useEffect } from "react"
import {io} from "socket.io-client"

const SocketContext = React.createContext(null);

interface  SocketProvideProps {
    children?: React.ReactNode
}
interface ISocketContext {
    sendMessage: (msg:string) => any;
}
const SocektContext = React.createContext<ISocketContext | null>(null)


export const useSocekt = () => {
    const state = useContext(SocketContext);
    if(!state)throw new Error("state is undefined")
    return state
}
export const SocketProvider: React.FC<SocketProvideProps> = ({children}) => {
    const sendMessage: ISocketContext["sendMessage"] = useCallback((msg) => {
        console.log(`Send message `, msg)
    },[])

    useEffect(() => {
        const _socket = io("http://localhost:8000")
        return () => {
            _socket.disconnect()
        }
    })
    return (
        <SocketContext.Provider value={null}>
            {children}
        </SocketContext.Provider>
    )
}