import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Text, Button, Card } from "react-native-paper";
import { useSocket } from "../contexts/SocketContext";

export const GuessThePicture = ({ route, navigation}) => {
  const { photo, usersInRoom, username} = route.params;
  const [chosenUser, setChosenUser] = useState({});
  const [picture, setPicture] = useState<ImageData | null>();
  const [totalScore, setTotalScore] = useState(0)
  const socket = useSocket();

  console.log(photo)

  useEffect(() => {
    
    const nextRoundEvent = (response) => {
      setPicture(response[0].imageData.img); //according to socEmu,this may need changing when backend is updated
    };
    socket.on("updateRound", nextRoundEvent); //updateRound may need to change, too

    const endGameEvent = (response) => {
      const scores = response;
      navigation.navigate("ScorePage", {scores, usersInRoom});
    };
    socket.on("endGame", endGameEvent);

    return () => {
      socket.off("endGame", endGameEvent);
    };
  }, []);

  const submitGuess = () => {

    //{roomID: 'roomID', userScore: { userID: 'senderID', score: 'score'}, imgTakerID: 'takerID'}
    
    //extract the userID of the guessed user from usersinroom
    const {userIDGuess} = usersInRoom.userID;
    
    //extract the userID of the image object
    const {userIDActual} = photo.userID;
    //compare the userID's to check if the guess is right or wrong
    if (userIDGuess === userIDActual){
      //add to the total score if right
      setTotalScore(totalScore+1);
      
      //send the total score to the backend server
      socket.emit('userVote', {userScore: { userID: 'senderID', score: 'score'}, imgTakerID: 'takerID'})
    }

  };

  // navigate from GuessThePicture on end of game

  //Wrapper component to keep score
  //Inner component re-renders with every new guess.

  
  return (
    <View>
      <Image style={styles.takenImage} source={{ uri: photo.uri }} />
      {usersInRoom.map((user) => {
        if (user.username !== username) {
          return (
            <View key={user.id}>
              <Button onPress={() => setChosenUser(user)}>
                {user.name}
              </Button>
            </View>
          );
        }
        return null; // Return null for users matching the username
      })}

      <Button onPress={submitGuess}>Submit</Button>
    </View>
  );

const styles = StyleSheet.create({
  takenImage: {
    width: 200,
    height: 200,
    margin: 'auto',
  },
})}