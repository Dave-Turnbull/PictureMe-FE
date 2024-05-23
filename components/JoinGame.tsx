import { Text, TextInput, Button } from "react-native-paper";
import { useState } from "react";
import { View } from "react-native";
import { joinGame } from "../utils/socketCalls";

const JoinGame = ({ route, navigation }) => {
  const { username } = route.params;

  const [text, setText] = useState(username);
  const [gameId, setGameId] = useState("");

  const toWaitingRoom = () => {
    const userList = joinGame(gameId, username) 
    navigation.navigate("WaitingRoom", { username: text, gameId, userList });
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>PictureMe!</Text>
      <TextInput
        label="username..."
        value={text}
        onChangeText={(text) => setText(text)}
      />
      <TextInput
        label="Game ID"
        value={gameId}
        onChangeText={(gameId) => setGameId(gameId)}
      />
      <Button onPress={toWaitingRoom}>Go!</Button>
    </View>
  );
};

export default JoinGame;
