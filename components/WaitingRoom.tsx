import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import * as Clipboard from "expo-clipboard";
import UserList from "./UserList";

// need to import user class for each user
// for now, hard-coded user objects:

const host = { name: "Paul", id: "5" };

const WaitingRoom = ({ route, navigation }) => {
  const { username, gameId, usersInRoom} = route.params;
  const { isHost } = route.params;
  console.log(isHost);
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(`${gameId}`);
  };

  const startGame = () => {
    navigation.navigate("TakeAPicture", {usersInRoom});
  };

  return (
    <>
      <View style={styles.container}>
        <Text>PictureMe!</Text>
        <Text>GameId: {gameId}</Text>
        {/* requires shareicon from paper */}
        <Button icon="clipboard-text" onPress={copyToClipboard}>copy gameId</Button>
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