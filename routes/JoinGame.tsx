import { Text, TextInput, Button } from "react-native-paper";
import { useState } from "react";
import { View } from "react-native";
import { useSocket } from "../contexts/SocketContext";

const JoinGame = ({ route, navigation }) => {
  const { username } = route.params;
  const [text, setText] = useState(username);
  const [gameId, setGameId] = useState("");
  const socket = useSocket();

  const toWaitingRoom = async () => {
    const roomObject: { roomId: string, gameId: string, users: any[] } = await new Promise((resolve) => {
      socket.emit('joinRoom', username, gameId, (message, roomObj) => {
        resolve(roomObj)
      })
    })
    navigation.navigate("WaitingRoom", { username: text, gameId, usersInRoom: roomObject.users });
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
