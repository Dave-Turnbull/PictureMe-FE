import { StyleSheet, View } from "react-native";
import { Text, IconButton, Card, Chip } from "react-native-paper";
import { useState, useEffect } from "react";
import socket from "../test/socketEmulation";

const UserList = ({ route }) => {
  const { usersInRoom } = route.params;
  const [userArray, setUserArray] = useState(usersInRoom);
  const { isHost } = route.params;

  useEffect(() => {
    const userJoinedEvent = (users) => {
      console.log("clientside userJoinedEvent triggered", users);
      setUserArray([...users]);
    };
    socket.on("userJoined", userJoinedEvent);
    socket.emit("hostRoom");
    return () => {
      socket.off("userJoined", userJoinedEvent);
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
        return (
          <Chip
            key={user.id}
            style={styles.usercard}
            // closeIcon={isHost && index !== 0 ? "delete" : undefined}
            onClose={() => {
              deleteUser(index);
            }}
          >
            {user.name} has joined
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
    padding: 5,
  },
});

export default UserList;
