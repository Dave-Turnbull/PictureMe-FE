import { Text, TextInput, Button } from "react-native-paper";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSocket } from "../contexts/SocketContext";
import { useUserData } from "../contexts/UserContext";
import StyledTextInput from "../components/StyledTextInput";
import StyledButton from "../components/StyledButton";

const JoinGame = ({ route, navigation }) => {
  const { username } = route.params;
  const [text, setText] = useState("");
  const [roomID, setRoomID] = useState("");
  const [isGameIdCorrect, setIsGameIdCorrect] = useState(false)
  const [isEmptyUsername, setIsEmptyUsername] = useState(false);
  const socket = useSocket();
  const { userData, setUserData } = useUserData();

  const toWaitingRoom = async () => {

    if (text.length < 1 || roomID.length < 1) {
      setIsEmptyUsername(true);
      return;
    }
    const roomObject: { roomID: string; users: any[] } = await new Promise(
      (resolve) => {
        socket.emit(
          "joinRoom",
          { user: { username, userID: userData.user.id }, roomID },
          (message, roomObj) => {
            resolve(roomObj);
          }
        );
      }
    );
    setUserData((current) => {
      current.room = roomObject;
      current.user.username = text;
      return current;
    });
    navigation.navigate("WaitingRoom", {
      username: text,
      roomID,
      usersInRoom: roomObject.users,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={{ padding: 20 }}>PictureMe!</Text>
      <StyledTextInput
        mode="outlined"
        label="username"
        value={text}
        onChangeText={(text) => {
          setIsEmptyUsername(false);
          setText(text);
        }}
      />
      <StyledTextInput
        mode="outlined"
        label="game ID"
        value={roomID}
        onChangeText={(roomID) => {
          setRoomID(roomID)}}
      />
      <StyledButton onPress={toWaitingRoom}>Go!</StyledButton>
      {isEmptyUsername && <Text>Add a username!</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#EAFDED",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    padding: 5,
  },
});

export default JoinGame;
