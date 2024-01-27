import { Server } from "socket.io";
import Redis from "ioredis";

const pub = new Redis({
    host: "redis-2921d8b9-abhishek-07.a.aivencloud.com",
    username: "default",
    password: "AVNS_doxPAspEbpRaJ7-2lUT",
    port: 24528
})
const sub = new Redis({
    host: "redis-2921d8b9-abhishek-07.a.aivencloud.com",
    username: "default",
    password: "AVNS_doxPAspEbpRaJ7-2lUT",
    port: 24528
})

class SocketService {
    private _io;
    constructor() {
        this._io = new Server({
            cors:{
                allowedHeaders:["*"],
                origin: "*"
            }
        });
        sub.subscribe("MESSAGES")
    }
    public initListeners() {
        const io = this._io;
        io.on("connect", (socket) => {
            console.log(`New Socekt connected: ${socket.id}`)

            socket.on('event:message', async({message}:{message:string}) => {
                console.log(`message received msg:${message}`)
                // publish this message to redis so even who is not connected to my server, can listen the chat
                
                // publishing this message to redis
                await pub.publish("MESSAGES", JSON.stringify({message}));
            })
        })
       sub.on("message",(channel, message) => {
            if(channel === "MESSAGES") {
                io.emit("message", message)
            }
       })
        
    }
    get io() {
        return this._io;
    }
};

export default SocketService;