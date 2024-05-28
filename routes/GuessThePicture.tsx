import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Text, Button } from "react-native-paper";
import { useSocket } from "../contexts/SocketContext";

export const GuessThePicture = ({ route, navigation}) => {
  const { photo, usersInRoom, styles, roomID  } = route.params;
  const [chosenUser, setChosenUser] = useState({});
  const [picture, setPicture] = useState<ImageData | null>();
  const [totalScore, setTotalScore] = useState(0)
  const socket = useSocket();

  useEffect(() => {
    const nextRoundEvent = (response) => {
      setPicture(response[0].imageData.img); //according to socEmu,this may need changing when backend is updated
    };
    socket.on("updateRound", nextRoundEvent); //updateRound may need to change, too

    const endGameEvent = (response) => {
      const scores = response;
      navigation.navigate("ScorePage", scores);
    };
    socket.on("endGame", endGameEvent);

    return () => {
      socket.off("endGame", endGameEvent);
    };
  }, []);

  const submitGuess = () => {
    console.log(chosenUser);
    // if  () {
    //   setTotalScore(totalScore+1);
    // }
    //{roomID: 'roomID', userScore: { userID: 'senderID', score: 'score'}, imgTakerID: 'takerID'}
    socket.emit('userVote', {roomID: `${roomID}`, userScore: { userID: 'senderID', score: 'score'}, imgTakerID: 'takerID'})
    //extract the userID of the guessed user from usersinroom
    //extract the userID of the image object
    //compare the userID's to check if the guess is right or wrong
    //add to the total score if right
    //send the total score to the backend server
  };

  // navigate from GuessThePicture on end of game

  //Wrapper component to keep score
  //Inner component re-renders with every new guess.

  
  return (
    <View>
      <Image style={styles.takenImage} source={{ uri: photo.uri }} />
      {usersInRoom.map((user, index) => {
        return (
          <View key={user.id}>
            <Button key={user.id} onPress={(user) => setChosenUser(user)}>
              {user.name}
            </Button>
          </View>
          //
        );
      })}

      <Button onPress={submitGuess}>Submit</Button>
    </View>
  );
};
