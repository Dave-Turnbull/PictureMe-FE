import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import * as Clipboard from "expo-clipboard";
import UserList from "./UserList";
import { useSocket } from "../contexts/SocketContext";
import { useUserData } from "../contexts/UserContext";

// need to import user class for each user
// for now, hard-coded user objects:

const host = { name: "Paul", id: "5" };

const WaitingRoom = ({ route, navigation }) => {
  const { username, usersInRoom, isHost} = route.params;
  const socket = useSocket()
  const { userData } = useUserData()
  
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(`${userData.room.roomID}`);
  };

  useEffect(() => {
    const startGameEvent = (message, gamerule) => {
      navigation.navigate("TakeAPicture", {usersInRoom, roomID: userData.room.roomID});
    };
    socket.on("startGame", startGameEvent);
    return () => {
      socket.off("startGame", startGameEvent);
    };
  }, [])

  const startGame = async () => {
    const message = await new Promise((resolve) => {
      socket.emit("startGame", userData.room.roomID, (response)=>{
        resolve(response)
      })
    })
    navigation.navigate("TakeAPicture", {usersInRoom});
  };

  return (
    <>
      <View style={styles.container}>
        <Text>PictureMe!</Text>
        <Text>Room ID: {userData.room.roomID}</Text>
        {/* requires shareicon from paper */}
        <Button icon="clipboard-text" onPress={copyToClipboard}>copy {userData.room.roomID}</Button>
        <Text>Host: {host.name}</Text>
        {isHost && <Button icon="play" onPress={startGame}>Start</Button>}
      </View>
      <UserList route={route} />
    </>
  );

  // Nice to have:
  // share link button
};

export default WaitingRoom;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    padding: 5,
  },

});