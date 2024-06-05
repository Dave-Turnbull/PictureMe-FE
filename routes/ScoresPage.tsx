import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Surface, Text, Card, Chip } from "react-native-paper";
import StyledButton from "../components/StyledButton";
import { useSocket } from "../contexts/SocketContext";

const ScoresPage = ({ route, navigation }) => {
  const { scores } = route.params;
  const socket = useSocket();
  const [continueVotes, setContinueVotes] = useState(0);
  const [finishVotes, setFinishVotes] = useState(0);

  useEffect(() => {
    socket.on("userVotedFinish", (msg) => {
      setfinishVotes((votes) => {
        votes++;
      });
    });
  }, []);

  return (
    <View style={styles.container}>
      <Surface style={styles.title}>
        <Text>Scores</Text>
      </Surface>
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
      <Text style={styles.voteText}> Vote to:</Text>
      <View style={styles.buttonContainer}>
        <StyledButton onPress={socket.emit("voteContinue")}>
          Continue Game: {0}
        </StyledButton>
        <StyledButton onPress={socket.emit("voteFinish")}>
          Finish Game: {finishVotes}
        </StyledButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    backgroundColor: "lightblue",
    color: "white",
    fontSize: 50,
    padding: 20,
    transform: [{ rotate: "5deg" }],
    margin: 30,
  },
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#EAFDED",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    padding: 5,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
  },
  usercard: {
    margin: 5,
    minWidth: 300,
    maxWidth: 400,
  },
  chip: {
    margin: 5,
  },
  voteText: {
    padding: 20,
  },
});
export default ScoresPage;
