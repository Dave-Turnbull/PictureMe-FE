import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme, TextInput, Button } from "react-native-paper";
import { hostGame } from "../utils/socketCalls";

const Landing = ({ navigation }) => {
  const [text, setText] = useState("")
  const [isHost, setIsHost] = useState(false);
  const theme = useTheme()

const joinGame = ()=>{
  navigation.navigate('JoinGame', {username: text})
}

const createGame = ()=>{
  setIsHost(true)
  const userList = [
    { name: "Emil", id: "1", isHost: false },
    { name: "Ian", id: "2", isHost: false },
    { name: "Dave", id: "3", isHost: false },
    { name: "Jake", id: "4", isHost: false },
    { name: "Paul", id: "5", isHost: true }
  ]
  const roomId = hostGame(text)
  navigation.navigate('WaitingRoom', {username: text, isHost: true, gameId: roomId, userList})
}

  return (
    <View>
      <Text>PictureMe!</Text>
      <TextInput
        label="username..." value={text} onChangeText={text => setText(text)} />
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
