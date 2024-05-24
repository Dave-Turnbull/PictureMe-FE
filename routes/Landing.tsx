import { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useTheme, Modal, IconButton } from "react-native-paper";
import socket from "../test/socketEmulation";
import StyledTextInput from "../components/StyledTextInput";
import StyledButton from "../components/StyledButton"
import mascot from "../assets/mascot.png"

const Landing = ({ navigation }) => {
  const [username, setUsername] = useState("")
  const [isHost, setIsHost] = useState(false);
  const [showModal, setShowModal] = useState(false);
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

const HowTo = () => {
  setShowModal((val) => !val)
}
const hideModal = () => setShowModal(false);

  return (
    <View style={styles.container}>
    <Image src={mascot} style={styles.image}/>
    <Modal visible={showModal} onDismiss={hideModal} contentContainerStyle={styles.modal}>
      <Text>Example Modal.  Click outside this area to dismiss.</Text>
    </Modal>
    <View style={styles.uiContainer}>
      <IconButton size={40} icon="help-circle" onPress={HowTo} />
      <Text>PictureMe!</Text>
      <StyledTextInput mode="outlined" label="username..." value={username} onChangeText={username => setUsername(username)} />
        <View style={styles.buttonWrapper}>
        <StyledButton mode="contained" onPress={joinGame}>Join</StyledButton>
        <StyledButton mode="contained" onPress={createGame}>Create</StyledButton>
        </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center'
  },
  uiContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  buttonWrapper: {
    display: "flex",
    flexDirection: "row",
    gap: 3,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    borderRadius: 5,
    margin: 10,
    backgroundColor: '#fff'
  },
  image: {
    width: 200,
    height: 200
  }
});

export default Landing;
