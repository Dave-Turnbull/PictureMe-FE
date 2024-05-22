import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

// requires a Boot User button

const UserList = ({ userArray }) => {
  return (
    <View style={styles.container}>
      {userArray.map((user) => {
        return (
          <View key={user.id}>
            <Text>{user.name} has joined</Text>
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
