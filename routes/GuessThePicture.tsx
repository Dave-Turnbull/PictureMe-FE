import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Text, Button } from "react-native-paper";
import { useSocket } from "../contexts/SocketContext";
import { useUserData } from "../contexts/UserContext";

export const GuessThePicture = ({ route, navigation}) => {
  const { imageObject} = route.params;
  const [chosenUserID, setChosenUserID] = useState('');
  const [picture, setPicture] = useState<object>(imageObject);
  const [totalScore, setTotalScore] = useState(0)
  const socket = useSocket();
  const {userData} = useUserData()
  console.log(imageObject, 'the image object')
  console.log(picture, 'the picture object')

  useEffect(() => {
    const nextRoundEvent = (response) => {
      setPicture(response); //according to socEmu,this may need changing when backend is updated
      setChosenUserID('');
    };
    socket.on("nextImage", nextRoundEvent); //updateRound may need to change, too

    const endGameEvent = (response) => {
      const scores = response;
      navigation.navigate("ScoresPage", {scores});
    };
    socket.on("endGame", endGameEvent);

    return () => {
      socket.off("endGame", endGameEvent);
    };
  }, []);

  const submitGuess = () => {
    console.log(chosenUserID);
    let score = totalScore
    if  (chosenUserID === picture.userID) {
      console.log('correct!')
      score++
    } else {
      console.log('wrong!')
    }
    setTotalScore(score);
    socket.emit('userVote', {userScore: { userID: userData.user.id, score: score}, imgTakerID: chosenUserID})
  };
  
  return (
    <View>
      <Image style={styles.takenImage} source={{uri: picture.img}} />
      {userData.room.users.map((user, index) => {
        return (
          <View key={user.id}>
            <Button key={user.id} onPress={() => setChosenUserID(user.id)}>
              {user.username}
            </Button>
          </View>
          //
        );
      })}

      <Button onPress={submitGuess}>Submit</Button>
    </View>
  );
};

const styles = StyleSheet.create ({
  takenImage: {
    width: 200,
    height: 200,
    margin: 'auto',
  }
})