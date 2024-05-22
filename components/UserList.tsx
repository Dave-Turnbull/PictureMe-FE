import { StyleSheet, View } from "react-native";
import { Text, Button } from "react-native-paper";
import { useState } from "react";
// requires a Boot User button

const UserList = ({ route }) => {

const [userArray, setUserArray] = useState([
  { name: "Emil", id: "1" },
  { name: "Ian", id: "2" },
  { name: "Dave", id: "3" },
  { name: "Jake", id: "4" },
]);
const { isHost } = route.params;
  const deleteUser = (index) =>{
    setUserArray( (currentArray) =>{
    currentArray.splice(index, 1)
    return [...currentArray]  
    });
  }
  return (
    <View style={styles.container}>
      {userArray.map((user, index) => {
        return (
          <View key={user.id}>
            <Text>{user.name} has joined</Text>
            {isHost && <Button onPress={() =>{deleteUser(index)}}>Delete</Button>}
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
