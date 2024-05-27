import { useState } from "react";
import base64Grandma from "./testImages/base64Grandma";

export const Socket = () => {
  const [roomObject, setRoomObject] = useState({});
  const [savedUsername, setSavedUsername] = useState("");
  const [eventHandlers, setEventHandlers] = useState({});

  //=======CLIENT EMIT EVENTS===========
  //These emulate client calls to the socket server and invoke server events to respond with or emit back
  //The invoked functions are passed all the arguments from the socket.on call except the first one which is used in the switch statement
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
      case "imageUpload":
        emitedImageUpload(...args);
        break;
      default:
        console.warn("this event hasn't been set up");
    }
  };

  //====CLIENT EVENT FUNCTIONS BEHAVIOUR=====
  //these are triggered with socket.emit using the switch statement above
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
    await timeOut(3000);
    setRoomObject((currentObj) => {
      currentObj.game = {
        players: [...currentObj.users],
        rounds: {
          1: { instructions: gameRule, roundImages: [] },
        },
      };
      return currentObj;
    });
    triggerEvent("startGame", gameRule); //this isnt in the backend yet
  };

  const emitedStartGame = async (roomId, callback) => {
    console.log("starting game on...", roomId);
    await timeOut(2000);
    callback("game started", gameRule);
    triggerEvent("startGame", gameRule);
  };

  const emitedImageUpload = async (roomId, imageobject, callback) => {
    const imageArray = [
      { userID: "3", imageData: { img: base64Grandma, votes: 0 } },
      {
        userID: imageobject.userID,
        imageData: { img: imageobject.img, votes: 0 },
      },
    ];
    setRoomObject((currentObj) => {
      currentObj.rounds["1"].roundImages = imageArray;
      return currentObj;
    });
    timeOut(3000);
    callback("file uploaded");
    timeOut(3000);
    triggerEvent("submissionEnd", imageArray);
  };

  //=======EVENT HANDLER SET UP===========
  //These set up event handlers when socket.on is used to listen for custom events emitted by the emulated server
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

  //==========EVENT HANDLER REMOVAL=================
  //These will find the events set up using the code above and unmount them
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
  //these are only used in this file to make it easier to emulate events

  //use to create delays
  const timeOut = (time = 50) => {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  };

  //use to trigger events sent from the server
  const triggerEvent = (eventName, response) => {
    const customEvent = new CustomEvent(eventName, {
      bubbles: true,
      detail: response,
    });
    document.dispatchEvent(customEvent);
  };

  //return the methods on the socket
  return {
    on,
    emit,
    off,
  };
};
