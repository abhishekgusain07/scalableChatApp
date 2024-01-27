import http from "http"
import SocketService from "./services/socket";

const init = async() => {
    const socketService = new SocketService();
    const httpServer = http.createServer();
    const PORT = process.env.PORT ? process.env.PORT : 8000

    socketService.io.attach(httpServer)

    httpServer.listen(PORT, () => {
      console.log(`HTTP server listening on port ${PORT}`)  
    })
    socketService.initListeners();
}
init();     