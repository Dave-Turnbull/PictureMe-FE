import React,{ useContext, createContext, useState, useEffect } from "react";
import { useSocket } from "./SocketContext";

type userDataType = {
    room: {
        roomID?: string;
        host?: {
            username: string;
        }
    };
    user: {
        username?: string;
        id: string;
    }
  };

export interface UserContextType {
  userData: userDataType;
  setUserData: (args: object) => void;
}

const UserContext = createContext<UserContextType>({userData: {room: {}, user: {id: ''}}, setUserData: () => {}})

export const UserProvider = ({ children }) =>{
    const [userData, setUserData] = useState({room:{}, user:{id:undefined}})
    const socket = useSocket()

    useEffect(() => {
        const getUserId = async () => {
            const userID = await new Promise((resolve) => {
                socket.emit('getUserId', (userID) => {
                    resolve(userID)
                })
            })
            return userID
        }
        setUserData((current) => {
            current.user.id = getUserId()
            return current
        })
    }, [])

    return (
        <UserContext.Provider value={{userData, setUserData}} >
            {children}
        </UserContext.Provider>
    )
}

export const useUserData = () => {
    return useContext(UserContext);
};