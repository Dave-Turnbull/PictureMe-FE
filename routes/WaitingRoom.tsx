import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import * as Clipboard from "expo-clipboard";
import UserList from "./UserList";
import { useSocket } from "../contexts/SocketContext";
import { useUserData } from "../contexts/UserContext";

// need to import user class for each user
// for now, hard-coded user objects:

const WaitingRoom = ({ route, navigation }) => {
  const { username, usersInRoom, isHost} = route.params;
  const socket = useSocket()
  const { userData } = useUserData()
  
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(`${userData.room.roomID}`);
  };

  useEffect(() => {
    const startGameEvent = (gamerule) => {
      navigation.navigate("TakeAPicture", {gamerule});
    };
    socket.on("startRound", startGameEvent);
    return () => {
      socket.off("startRound", startGameEvent);
    };
  }, [])

  const startGame = async () => {
      socket.emit("startGame")
  };

  return (
    <>
      <View style={styles.container}>
        <Text>PictureMe!</Text>
        <Text>Room ID: {userData.room.roomID}</Text>
        {/* requires shareicon from paper */}
        <Button icon="clipboard-text" onPress={copyToClipboard}>copy {userData.room.roomID}</Button>
        <Text>Host: {userData.room.host.username}</Text>
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