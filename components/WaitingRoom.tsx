import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import * as Clipboard from "expo-clipboard";
import UserList from "./UserList";

// need to import user class for each user
// for now, hard-coded user objects:

const userArray = [
  { name: "Emil", id: "1" },
  { name: "Ian", id: "2" },
  { name: "Dave", id: "3" },
  { name: "Jake", id: "4" },
];
const host = { name: "Paul", id: "5" };

// needs "createGame" to setIsHost to true, passed from landing
const [isHost, setIsHost] = useState(false);

const WaitingRoom = ({ route, navigation }) => {
  const { username } = route.params;
  const { gameId } = route.params;

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(`${gameId}`);
  };

  const startGame = () => {
    navigation.navigate("SessionPage");
  };

  return (
    <>
      <View>
        <Text>PictureMe!</Text>
        <Text>GameId: {gameId}</Text>
        {/* requires shareicon from paper */}
        <Button onPress={copyToClipboard}>copyIcon</Button>
        <Text>Host: {host.name}</Text>
      </View>
        {/* requires some conditional logic for if isHost===true */}
      <UserList userArray={userArray}/>
    
      {/* requires some conditional logic for if isHost===true    */}
      <Button onPress={startGame}>Start</Button>
    </>
  );



  // NEEDS:

  // Card with little text cards saying "*user* has joined"

  // Nice to have:
  // share link button
};

export default WaitingRoom;
