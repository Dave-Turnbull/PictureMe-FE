import {Socket, SocketContextType} from "../test/socketEmulation";
import React, { createContext, useContext } from "react";

const SocketContext = createContext<SocketContextType>({on: () => {}, emit: () => {}, off: () => {}});
  
export const SocketProvider = ({ children }) => {

    const socket = Socket()
    return (
        <SocketContext.Provider value={socket}>
        {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    return useContext(SocketContext);
};