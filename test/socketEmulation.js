import { useState } from "react";

/*
==== SOCKET ON EVENTS ====
userJoined - sends an array of all users in the room
*/
export const Socket = () => {
  const [roomObject, setRoomObject] = useState({});
  const [savedUsername, setSavedUsername] = useState("");
  const [eventHandlers, setEventHandlers] = useState({});

  //====CLIENT EVENT FUNCTIONS BEHAVIOUR=====
  //these are triggered with socket.emit below
  const emittedHostRoom = async (username, callback) => {
    setSavedUsername(username);
    const newRoomObject = {
      roomID: "mockRoomID",
      host: { userID: "0", username: username },
      users: [{ userID: "0", username: username }],
    };
    setRoomObject(newRoomObject);
    await timeOut();
    console.log("hosting game...");
    if (callback) callback("room created", newRoomObject);
    else
      console.warn(
        "Callback Function missing when using socket.emit on hosting room!"
      );
    await timeOut(1000);
    eventUsersJoining(newRoomObject);
  };

  const emmittedJoinRoom = async (username, roomId, callback) => {
    setSavedUsername(username);
    const newRoomObject = {
      roomID: roomId,
      host: { username: "Emil", userID: "1" },
      users: [
        { username: "Emil", userID: "1" },
        { username: "Ian", userID: "2" },
        { username: "Dave", userID: "3" },
        { username: "Jake", userID: "4" },
        { username: "Paul", userID: "15" },
        { userID: "6", username: username },
      ],
    };
    setRoomObject(newRoomObject);
    console.log("joining game...");
    await timeOut(1000);
    if (callback) callback("joined", newRoomObject);
    else
      console.warn(
        "Callback Function missing when using socket.emit on joining room!"
      );
  };

  const emitedStartGame = async () => {
    console.log("starting game...");
    await timeOut();
    triggerEvent("startingGame", "response data");
  };

  /* CLIENT EVENTS 
    These will emulate client calls to the socket server and invoke server events to respond with or emit back
    */

  //emulating the client calls to server
  const emit = async (eventName, ...args) => {
    await timeOut();
    //Add the server side events here
    switch (eventName) {
      case "joinRoom":
        emmittedJoinRoom(...args);
        break;
      case "hostRoom":
        emittedHostRoom(...args);
        break;
      case "startGame":
        emitedStartGame(...args);
        break;
      default:
        console.warn("this event hasn't been set up");
    }
  };

  //emulating the server events to client
  const on = (eventName, callback) => {
    // Define a handler that will call the provided callback with the event's detail arguments
    const handler = (event) => {
      callback(event.detail);
    };

    // Add the event listener for the specified event
    document.addEventListener(eventName, handler);

    // Store the handler so it can be removed later
    setEventHandlers((currentHandlers) => {
      if (!eventHandlers[eventName]) {
        currentHandlers[eventName] = [];
      }
      currentHandlers[eventName].push(handler);
      return currentHandlers;
    });
  };

  const off = (eventName, callback) => {
    // Check if there are handlers stored for the event
    if (eventHandlers[eventName]) {
      const handlers = eventHandlers[eventName];
      // Find the handler that matches the callback and remove it
      for (let i = 0; i < handlers.length; i++) {
        if (handlers[i] === callback) {
          document.removeEventListener(eventName, handlers[i]);
          setEventHandlers((currentHandlers) => {
            currentHandlers[eventName].splice(i, 1); // Remove the handler from the array
            return currentHandlers;
          });
          break;
        }
      }
    }
  };

  //==== CUSTOM SERVER BEHAVIOR FUNCTIONS ====

  //sends a full list of users by adding them periodically
  const eventUsersJoining = async (newRoomObject) => {
    await timeOut(2000);
    console.log("eventUsersJoining Started");
    setRoomObject(newRoomObject);

    newRoomObject.users.push({ username: "Emil", userID: "1" });
    triggerEvent("updateUsersArray", newRoomObject.users);
    setRoomObject(newRoomObject);

    await timeOut(500);
    newRoomObject.users.push({ username: "Ian", userID: "2" });
    triggerEvent("updateUsersArray", newRoomObject.users);
    setRoomObject(newRoomObject);

    await timeOut(1500);
    newRoomObject.users.push({ username: "Dave", userID: "3" });
    triggerEvent("updateUsersArray", newRoomObject.users);
    setRoomObject(newRoomObject);

    await timeOut(1000);
    newRoomObject.users.push({ username: "Jake", userID: "4" });
    triggerEvent("updateUsersArray", newRoomObject.users);
    setRoomObject(newRoomObject);

    await timeOut(200);
    newRoomObject.users.push({ username: "Paul", userID: "5" });
    triggerEvent("updateUsersArray", newRoomObject.users);
    setRoomObject(newRoomObject);
  };

  //==== UTILITY FUNCTIONS =====

  //utility function to emulate async server delays
  const timeOut = (time = 50) => {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  };

  const triggerEvent = (eventName, response) => {
    const customEvent = new CustomEvent(eventName, {
      bubbles: true,
      detail: response,
    });
    document.dispatchEvent(customEvent);
  };
  return {
    on,
    emit,
    off,
  };
};
