const timeOut = (time = 50) => {
    return new Promise ((resolve) => {
        setTimeout(resolve, time);
    })
}

const eventUserJoined = async () => {
    await timeOut(1000)
    console.log('userJoinedEvent Triggered')
    replyObject = {users: [
        { name: "Emil", id: "1", isHost: false }
        ]}
    const userJoinedEvent = new Event('userJoined', replyObject);
    
    await timeOut(1000)
    document.dispatchEvent(userJoinedEvent)

    // replyObject = {users: [
    //     { name: "Emil", id: "1", isHost: false },
    //     { name: "Ian", id: "2", isHost: false }
    //     ]}
    // await timeOut(1000)
    // document.dispatchEvent(userJoinedEvent)
    // replyObject = {users: [
    //     { name: "Emil", id: "1", isHost: false },
    //     { name: "Ian", id: "2", isHost: false },
    //     { name: "Dave", id: "3", isHost: false }
    //     ]}
    
    // await timeOut(1000)
    // document.dispatchEvent(userJoinedEvent)
    // replyObject = {users: [
    //     { name: "Emil", id: "1", isHost: false },
    //     { name: "Ian", id: "2", isHost: false },
    //     { name: "Dave", id: "3", isHost: false },
    //     { name: "Jake", id: "4", isHost: false }
    //     ]}
    
    // await timeOut(1000)
    // document.dispatchEvent(userJoinedEvent)
    // replyObject = {users: [
    //     { name: "Emil", id: "1", isHost: false },
    //     { name: "Ian", id: "2", isHost: false },
    //     { name: "Dave", id: "3", isHost: false },
    //     { name: "Jake", id: "4", isHost: false },
    //     { name: "Paul", id: "5", isHost: true }
    //     ]}
};

const emittedHostGame = async () => {
    console.log("hosting game...")
    eventUserJoined()
}

const emmittedJoinGame = () => {
    console.log("joining game...")
}

const socket = {  
    //emulating the client calls to server
    emit: (eventName, ...args) => {
        //this is where the backend functions work
        switch(eventName) {
            case 'joinGame':
                emmittedJoinGame(...args)
              break;
            case 'hostGame':
                emittedHostGame(...args)
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
        const handler = callback
        
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

export default socket