import { Text, TextInput, Button } from "react-native-paper";
import { useState } from "react";
import { View } from "react-native";
import { useSocket } from "../contexts/SocketContext";
import { useUserData } from "../contexts/UserContext";

const JoinGame = ({ route, navigation }) => {
  const { username } = route.params;
  const [text, setText] = useState(username);
  const [roomID, setRoomID] = useState("");
  const socket = useSocket();
  const { userData, setUserData } = useUserData();

  const toWaitingRoom = async () => {
    const roomObject: { roomID: string; users: any[] } = await new Promise(
      (resolve) => {
        socket.emit(
          "joinRoom",
          { user: { username, userID: userData.user.id }, roomID },
          (message, roomObj) => {
            console.log(roomObj);
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
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>PictureMe!</Text>
      <TextInput
        label="username..."
        value={text}
        onChangeText={(text) => setText(text)}
      />
      <TextInput
        label="Game ID"
        value={roomID}
        onChangeText={(roomID) => setRoomID(roomID)}
      />
      <Button onPress={toWaitingRoom}>Go!</Button>
    </View>
  );
};

export default JoinGame;
