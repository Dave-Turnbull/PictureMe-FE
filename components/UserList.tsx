import { StyleSheet, View } from "react-native";
import { Text, Button } from "react-native-paper";
import { useState, useEffect } from "react";
import socket from "../test/socketEmulation";

const UserList = ({ route }) => {
  const {usersInRoom} = route.params
  const [userArray, setUserArray] = useState(usersInRoom);
  const { isHost } = route.params;

  useEffect(()=>{
    const userJoinedEvent = (users) => {
      console.log('clientside userJoinedEvent triggered', users)
      setUserArray([...users])
    }
    socket.on('userJoined', userJoinedEvent)
    socket.emit('hostGame')
    return () => {
      socket.off('userJoined', userJoinedEvent)
    }
  },[])

  const deleteUser = (index) => {
    setUserArray((currentArray) => {
      currentArray.splice(index, 1);
      return [...currentArray];
    });
  };

  return (
    <View style={styles.container}>
      {userArray.map((user, index) => {
        return (
          <View key={user.id}>
            <Text>{user.name} has joined</Text>
            {isHost && !user.isHost && (
              <Button icon="delete"
                onPress={() => {
                  deleteUser(index);
                }}
              >
                Delete
              </Button>
            )}
          </View>
        );
      })}
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

export default UserList;
