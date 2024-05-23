import React, { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Text, Button } from "react-native-paper";

export const GuessThePicture = ({ route, navigation }) => {
  const { photo, usersInRoom, styles } = route.params;
  const [chosenUser, setChosenUser] = useState({});
  const [picture, setPicture] = useState<ImageData | null>();

  const nextRound = () => {
    console.log(chosenUser);
  };

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
        );
      })}

      <Button onPress={nextRound}>Submit</Button>
    </View>
  );
};