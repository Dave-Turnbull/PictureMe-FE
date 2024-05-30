import { useContext, createContext, useState, useEffect } from "react";
import { useSocket } from "./SocketContext";

type userDataType = {
  room: {
    roomID?: string;
    host?: {
      username: string;
    };
    users?: { id: string; username: string }[];
  };
  user: {
    username?: string;
    id: string;
    score: number;
  };
};

export interface UserContextType {
  userData: userDataType;
  setUserData: (args: object) => void;
}

const UserContext = createContext<UserContextType>({
  userData: { room: {}, user: { id: "", score: 0 } },
  setUserData: () => {},
});

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    room: {},
    user: { id: undefined, score: 0 },
  });
  const socket = useSocket();

  useEffect(() => {
    const getUserId = async () => {
      if (socket.connected) {
        const userID = await new Promise((resolve) => {
          socket.emit("getUserId", (userID) => {
            console.log(userID);
            resolve(userID);
          });
        });
        console.log(userID, "the user ID");
        setUserData((current) => {
          current.user.id = userID;
          return current;
        });
      }
    };
    socket.on('connect', getUserId)
    return () => socket.off('connect', getUserId)
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserData = () => {
  return useContext(UserContext);
};
