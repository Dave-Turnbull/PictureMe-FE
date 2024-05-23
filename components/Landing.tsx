import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme, TextInput, Button } from "react-native-paper";
import { hostGame } from "../utils/socketCalls";
import socket from "../test/socketEmulation";

const Landing = ({ navigation }) => {
  const [username, setUsername] = useState("")
  const [isHost, setIsHost] = useState(false);
  const theme = useTheme()

const joinGame = ()=>{
  navigation.navigate('JoinGame', {username: username})
}

const createGame = async ()=>{
  setIsHost(true)
  const usersInRoom = [
    { name: username, id: "1"}
  ]
  const roomId = await new Promise((resolve) => {
    socket.emit('hostRoom', username, (roomId) => {
      resolve(roomId)
    })
  })
  navigation.navigate('WaitingRoom', {username, isHost: true, gameId: roomId, usersInRoom})
}

  return (
    <View>
      <Text>PictureMe!</Text>
      <TextInput
        label="username..." value={username} onChangeText={username => setUsername(username)} />
        <Button onPress={joinGame}>Join</Button>
        <Button onPress={createGame}>Create</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Landing;
