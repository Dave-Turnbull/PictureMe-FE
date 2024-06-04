import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Text, Button, Card, Chip } from "react-native-paper";
import { useSocket } from "../contexts/SocketContext";
import { useUserData } from "../contexts/UserContext";
import Polaroid from '../components/Polaroid'

export const GuessThePicture = ({ route, navigation }) => {
  const { imageObject} = route.params;
  const [chosenUserID, setChosenUserID] = useState("");
  const [picture, setPicture] = useState<object>(imageObject);
  const [totalScore, setTotalScore] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const socket = useSocket();
  const { userData } = useUserData();

  useEffect(() => {
    const nextRoundEvent = (response) => {
      setPicture(response);
      setChosenUserID("");
      setHasSubmitted(false)
    };
    socket.on("nextImage", nextRoundEvent);

    const endGameEvent = (response) => {
      const scores = response;
      navigation.navigate("ScoresPage", { scores });
    };
    socket.on("endRound", endGameEvent);

    return () => {
      socket.off("endRound", endGameEvent);
    };
  }, []);

  const submitGuess = async () => {
    setHasSubmitted(true)
    let score = 0;
    if (chosenUserID === picture.userID) {
      console.log("correct!");
      score++;
    } else {
      console.log("wrong!");
    }
    setTotalScore((curr) => curr + score);
    const resMessage = await new Promise((resolve) => {
      socket.emit(
        "userVote",
        {
          voteData: { userID: userData.user.id, score: score },
          imgUserID: picture.userID,
        },
        (response) => {
          resolve(response);
        }
      );
    });
  };

  return (
    <View style={styles.container}>
    <Polaroid imageSource={{ uri: picture.img }} text="???"/>
      <Card style={styles.usercard}>
      {userData.room.users.map((mappedUser) => {
        if (mappedUser.userID !== userData.user.userID) {
          return (
            <Chip style={styles.chip} onPress={() => setChosenUserID(mappedUser.userID)}>
              {mappedUser.username}
            </Chip>
          );
        }
      })}
      </Card>

      <Button disabled={hasSubmitted} onPress={submitGuess}>Submit</Button>
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
  takenImage: {
    width: 300,
    height: 300,
    margin: 'auto',
    marginTop: 50,
    marginBottom: 25,
    borderWidth: 10,
    borderColor: "grey",
    backgroundColor: 'green',
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
    transform: [{rotate: '5deg'}],
  },
  usercard: {
    margin: 10,
    padding: 10,
  },
  chip: {
    margin: 5,
    textAlign: "center",
    minWidth: 300,

  }
});
