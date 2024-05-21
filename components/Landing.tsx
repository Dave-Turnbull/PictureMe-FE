import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme, TextInput, Button } from "react-native-paper";

const Landing = ({ navigation }) => {
  const [text, setText] = useState("")
  const theme = useTheme()

const joinGame = ()=>{
  navigation.navigate('JoinGame', {username: text})
}

const createGame = ()=>{
  navigation.navigate('WaitingRoom', {username: text})
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
