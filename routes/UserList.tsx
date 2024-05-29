import { StyleSheet, View } from "react-native";
import { Text, IconButton, Card, Chip } from "react-native-paper";
import { useState, useEffect, useContext } from "react";
import { useSocket } from "../contexts/SocketContext";

const UserList = ({ route }) => {
  const { usersInRoom } = route.params;
  const [userArray, setUserArray] = useState(usersInRoom);
  const { isHost } = route.params;
  const socket = useSocket()

  useEffect(() => {
    const userJoinedEvent = (response) => {
      // console.log("clientside userJoinedEvent triggered", response);
      setUserArray([...response]);
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
    <Card style={styles.container}>
      {userArray.map((user, index) => {
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
            style={styles.usercard}
            {...kickButtonAttributes}
          >
            {user.username} has joined
          </Chip>
        );
      })}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    padding: 5,
  },

  usercard: {
    margin: 5,
    minWidth: 200
    // padding: 5,
  },
});

export default UserList;
