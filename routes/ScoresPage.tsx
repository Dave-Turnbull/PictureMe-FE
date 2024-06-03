import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button, Card, Chip } from "react-native-paper";
import { useUserData } from "../contexts/UserContext";

const ScoresPage = ({ route, navigation }) => {
  const { scores } = route.params;
  const [userArray, setUserArray] = useState();

  const backToWaitingRoom = () => {
    navigation.navigate("WaitingRoom");
  };

  return (
    <View style={styles.container}>
      <Card style={styles.usercard}>
        {scores
          .sort((a, b) => {
            return b.score - a.score;
          })
          .map((user) => {
            return (
              <Chip style={styles.chip} key={user.userID}>
                {user.username} Score: {user.score}
              </Chip>
            );
          })}
      </Card>
      <Button onPress={backToWaitingRoom}>Play Again</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#EAFDED",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    padding: 5,
  },

  usercard: {
    margin: 5,
    minWidth: 300,
    maxWidth: 400,
  },
  chip: {
    margin: 5,
  },
});
export default ScoresPage;
