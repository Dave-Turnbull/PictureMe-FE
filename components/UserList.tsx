import { StyleSheet, View } from "react-native";
import { Text, Button } from "react-native-paper";
import { useState } from "react";

const UserList = ({ route }) => {
  const [userArray, setUserArray] = useState([
    { name: "Emil", id: "1", isHost: false },
    { name: "Ian", id: "2", isHost: false },
    { name: "Dave", id: "3", isHost: false },
    { name: "Jake", id: "4", isHost: false },
    { name: "Paul", id: "5", isHost: true }
  ]);
  const { isHost } = route.params;
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
              <Button
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
