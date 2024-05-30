import { createContext, useContext, useEffect } from "react";
import {io} from 'socket.io-client'

interface socketObject {
    on: (a:string, ...args:any[]) => void;//employers please look away
    off: (a:string, ...args:any[]) => void;
    emit: (a:string, ...args:any[]) => void;
    userID: string;
}

const SocketContext = createContext<socketObject>({on: null, off: null, emit: null});//server intergrated

export const SocketProvider = ({ children }) => {
    let socket:socketObject = io("https://pictureme-be.onrender.com");//server intergrated
    useEffect(() => {
        socket.on('connect', (response) => {
            socket.emit("getUserId", (userID) => {
                console.log(userID);
                socket.userID = userID
            });
        })
    }, [])
    console.log(socket, 'the socket connection')


    return (
        <SocketContext.Provider value={socket}>
        {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    return useContext(SocketContext);
};