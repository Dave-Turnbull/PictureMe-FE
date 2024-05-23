/*
==== SOCKET ON EVENTS ====
userJoined - sends an array of all users in the room
*/


//====CLIENT EVENT FUNCTIONS BEHAVIOUR=====
//these are triggered with socket.emit below
const emittedHostGame = async (username, callback) => {
    await timeOut()
    console.log("hosting game...")
    if (callback) callback('a room id')
    await timeOut(1000)
    eventUsersJoining(username)
}

const emmittedJoinGame = async (username, roomId, callback) => {
    console.log("joining game...")
    await timeOut(1000)
    if (callback) callback([
        { name: "Emil", id: "1", isHost: false },
        { name: "Ian", id: "2", isHost: false },
        { name: "Dave", id: "3", isHost: false },
        { name: "Jake", id: "4", isHost: false },
        { name: "Paul", id: "5", isHost: true },
        { name: username, id: "6", isHost: false}
      ])
}

const emitedStartGame = async () => {
    console.log("starting game...")
    await timeOut()
    triggerEvent('startingGame', /*theResponseData*/)
}

/* CLIENT EVENTS 
These will emulate client calls to the socket server and invoke server events to respond with or emit back
*/

const socket = {  
    //emulating the client calls to server
    emit: async (eventName, ...args) => {
        await timeOut()
        //Add the server side events here
        switch(eventName) {
            case 'joinGame':
                emmittedJoinGame(...args)
              break;
            case 'hostGame':
                emittedHostGame(...args)
              break;
            case 'startGame':
                emitedStartGame(...args)
              break;
            default:
              console.log("this event hasn't been set up")
          } 
    },


    // Store event handlers in an internal object
    _handlers: {},
    
    //emulating the server events to client
    on: (eventName, callback) => {
        // Define a handler that will call the provided callback with the event's detail arguments
        const handler = (event) => {
            callback(event.detail)
        }
        
        // Add the event listener for the specified event
        document.addEventListener(eventName, handler);
        
        // Store the handler so it can be removed later
        if (!socket._handlers[eventName]) {
            socket._handlers[eventName] = [];
        }
        socket._handlers[eventName].push(handler);
    },
    
    off: (eventName, callback) => {
        // Check if there are handlers stored for the event
        if (socket._handlers[eventName]) {
            const handlers = socket._handlers[eventName];
            // Find the handler that matches the callback and remove it
            for (let i = 0; i < handlers.length; i++) {
                if (handlers[i] === callback) {
                    document.removeEventListener(eventName, handlers[i]);
                    handlers.splice(i, 1); // Remove the handler from the array
                    break;
                }
            }
        }
    }
};

//==== CUSTOM SERVER BEHAVIOR FUNCTIONS ====

//sends a full list of users by adding them 1 per second
const eventUsersJoining = async (username = 'theHostUser') => {
    await timeOut(2000)
    console.log('userJoinedEvent Triggered')

    let replyObject = [
        { name: username, id: "0", isHost: true },
        { name: "Emil", id: "1", isHost: false }
        ]
    triggerEvent("userJoined", replyObject)

    await timeOut(1000)
    replyObject.push({ name: "Ian", id: "2", isHost: false })
    triggerEvent("userJoined", replyObject)

    await timeOut(1000)
    replyObject.push({ name: "Dave", id: "3", isHost: false })    
    triggerEvent("userJoined", replyObject)

    await timeOut(1000)
    replyObject.push({ name: "Jake", id: "4", isHost: false })
    triggerEvent("userJoined", replyObject)

    await timeOut(1000)
    replyObject.push({ name: "Paul", id: "5", isHost: false })
    triggerEvent("userJoined", replyObject)
};

//==== UTILITY FUNCTIONS =====

//utility function to emulate async server delays
const timeOut = (time = 50) => {
    return new Promise ((resolve) => {
        setTimeout(resolve, time);
    })
}

const triggerEvent = (eventName, response) => {
    const customEvent = new CustomEvent(eventName, {
        bubbles: true,
        detail: response,
      });
    document.dispatchEvent(customEvent)
}

export default socket