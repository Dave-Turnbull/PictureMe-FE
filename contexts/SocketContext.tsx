// import { createContext, useContext, useEffect } from "react";
// import {io} from 'socket.io-client'

// interface socketObject {
//     on: (a:string, ...args:any[]) => void;//employers please look away
//     off: (a:string, ...args:any[]) => void;
//     emit: (a:string, ...args:any[]) => void;
// }

// const SocketContext = createContext<socketObject>({on: null, off: null, emit: null});//server intergrated

// export const SocketProvider = ({ children }) => {
//     let socket:socketObject = io("https://pictureme-be.onrender.com");//server intergrated
//     useEffect(() => {
//         socket.on('connect', (response) => {
//             console.log(response, '<<<<<<<<the server response')
//             console.log('hello')
//             console.log(socket, 'the socket connection')
//         })
//     }, [])
//     console.log(socket, 'the socket connection')


//     return (
//         <SocketContext.Provider value={socket}>
//         {children}
//         </SocketContext.Provider>
//     );
// };

// export const useSocket = () => {
//     return useContext(SocketContext);
// };