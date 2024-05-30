import { StyleSheet, View } from "react-native";
import { Text, IconButton, Card, Chip } from "react-native-paper";
import { useState, useEffect, useContext } from "react";
import { useSocket } from "../contexts/SocketContext";
import { useUserData } from "../contexts/UserContext";

const UserList = ({ route }) => {
  const { usersInRoom } = route.params;
  const [userArray, setUserArray] = useState(usersInRoom);
  const { isHost } = route.params;
  const socket = useSocket()
  const {userData, setUserData} = useUserData()

  useEffect(() => {
    const userJoinedEvent = (response) => {
      console.log("clientside userJoinedEvent triggered", response);
      setUserArray(curr => {
        return [...response.users]
      });
      setUserData((current) => {
        current.room = response
        return current
      })
    };
    socket.on("updateUsersArray", userJoinedEvent);
    return () => {
      socket.off("updateUsersArray", userJoinedEvent);
    };
  }, []);

  const deleteUser = (index) => {
    if (!isHost) return;
    setUserArray((currentArray) => {
      currentArray.splice(index, 1);
      return [...currentArray];
    });
  };

  return (
    <View style={styles.container}>
    <Card style={styles.usercard}>
      {userData.room.users.map((user, index) => {
        let kickButtonAttributes = {}
        if (isHost && index!==0){
          kickButtonAttributes = {
            closeIcon: "delete",
            onClose: () => {
              deleteUser(index);
            }
          }
        }
        return (
          <Chip
            key={user.userID}
            style={styles.chip}
            {...kickButtonAttributes}
          >
            {user.username} has joined
          </Chip>
        );
      })}
    </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: '#EAFDED',
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    padding: 5,
  },

  usercard: {
    margin: 5,
    minWidth: 200,
  },
  chip: {
    margin: 5,
    textAlign: "center",
    padding: 7,
    minWidth: 200,
    
    // justifyContent: "center",
  }
});

export default UserList;
