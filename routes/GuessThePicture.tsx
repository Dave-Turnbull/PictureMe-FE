import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Text, Button, Card } from "react-native-paper";
import { useSocket } from "../contexts/SocketContext";
import { useUserData } from "../contexts/UserContext";

export const GuessThePicture = ({ route, navigation }) => {
  const { imageObject } = route.params;
  const [chosenUserID, setChosenUserID] = useState("");
  const [picture, setPicture] = useState<object>(imageObject);
  const [totalScore, setTotalScore] = useState(0);
  const socket = useSocket();
  const { userData } = useUserData();

  useEffect(() => {
    const nextRoundEvent = (response) => {
      setPicture(response); //according to socEmu,this may need changing when backend is updated
      setChosenUserID("");
    };
    socket.on("nextImage", nextRoundEvent); //updateRound may need to change, too

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
    let score = 0;
    console.log(chosenUserID, 'chosen user id', picture.userID, 'picture.userID')
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
    console.log(resMessage);
  };

  return (
    <View>
      <Image style={styles.takenImage} source={{ uri: picture.img }} />
      {userData.room.users.map((itUser) => {
        if (itUser.userID !== userData.user.userID) {
          return (
            <View key={itUser.userID}>
              <Button onPress={() => setChosenUserID(itUser.userID)}>
                {itUser.username}
              </Button>
            </View>
          );
        }
      })}

      <Button onPress={submitGuess}>Submit</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  takenImage: {
    width: 200,
    height: 200,
    margin: "auto",
  },
});
