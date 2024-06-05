import { SetStateAction, useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Surface, useTheme, Modal, IconButton, Text, ActivityIndicator } from "react-native-paper";
import StyledTextInput from "../components/StyledTextInput";
import StyledButton from "../components/StyledButton"
import Polaroid from "../components/Polaroid"
import pictureplaceholder from "../assets/polaroid placeholder.png"
import { useSocket } from "../contexts/SocketContext";
import { useUserData } from "../contexts/UserContext";
const Landing = ({ navigation }) => {
  const [username, setUsername] = useState("")
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [isEmptyUsername, setIsEmptyUsername] = useState(false)
  const theme = useTheme()
  const socket = useSocket()
  const { userData, setUserData } = useUserData()

const joinGame = ()=>{
  navigation.navigate('JoinGame', {username: username})
}

const createGame = async ()=>{
  if(username.length < 1) {
    setIsEmptyUsername(true)
    return
  }
  setIsLoading(true)
  await new Promise ((resolve) => {
      setTimeout(resolve, 1000);
  })
  const usersInRoom = [
    { username: username, id: "1"}
  ]
  const roomObject = await new Promise((resolve) => {
    socket.emit('createRoom', {username, userID: userData.user.id}, (message, roomObj) => {
      resolve(roomObj)
    })
  }).catch(err => setIsLoading(false))
  setUserData((current) => {
    current.room = roomObject
    current.user.username = username
    return current
  })
  navigation.navigate('WaitingRoom', {username, isHost: true, usersInRoom})
  setIsLoading(false)
}

const HowTo = () => {
  setShowModal((val) => !val)
}
const hideModal = () => setShowModal(false);

  return (
    <View style={styles.container}>
    <View style={styles.uiContainer}>
      <Polaroid imageSource={pictureplaceholder} text={'PictureMe!'}/>
      <StyledTextInput mode="outlined" label="username..." value={username} onChangeText={(username: SetStateAction<string>) => {
        setUsername(username)
        setIsEmptyUsername(false)
        }} />
      {isEmptyUsername && <Text>Add a username!</Text>}
        <Surface style={styles.buttonWrapper}>
        <StyledButton style={styles.button} disabled={isLoading} mode="contained" onPress={joinGame}>Join</StyledButton>
        <StyledButton style={styles.button} disabled={isLoading} mode="contained" onPress={createGame}>Create</StyledButton>
      <IconButton size={40} icon="help-circle" onPress={HowTo} />
        </Surface>
        <ActivityIndicator animating={isLoading} />
    <Modal visible={showModal} onDismiss={hideModal} style={styles.modalWrapper} contentContainerStyle={styles.modal}>
    <Text> How to play:</Text>
      <Text> - Each player will take a picture when given a prompt at the beginning of each round</Text>
      <Text> - Each picture will be displayed and each player will need to guess who's pic is whos, Best guesses only!</Text>
    </Modal>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#EAFDED'
  },
  uiContainer: {
    marginTop: 0,
    alignItems: 'center',
    textShadowRadius: 5,
  },
  buttonWrapper: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "pink",
    color: "purple",
    gap: 5,
    margin: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    transform:[{rotate: "2deg"}]
  },
  button:{
    backgroundColor: "pink",
  },
  modal: {
    margin: 20,
    display: "flex",
    alignItems: "center",
    backgroundColor: '#fff',
  },
  modalWrapper: {
    zIndex: 1,
    display: "flex",
    flex: 1,
    backgroundColor: "#fff"
  },
});

export default Landing;
