import React, {useState} from "react";
import { StyleSheet, View } from "react-native";
import { Text, IconButton, Card, Chip } from "react-native-paper";

const ScoresPage = ({route}) => {
//[ { userID: 'userID', username: 'user1', score: 0 }, { userID: 'userID', username: 'user2', score: 0 } ] 
    const { scores, usersInRoom, userScores } = route.params;
    const [userArray, setUserArray] = useState(usersInRoom);
    
    return (
        <Card style={styles.container}>

        {/* {userArray.sort((a,b)=>{
             a.score-b.score }
                
             ).map((e)=>{
                   return e})
        }  */}
        something
        {/* needs to compare scores */}
        </Card>

    )
}


const styles = StyleSheet.create({
    container: {
        display: "flex",
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      margin: 5,
      padding: 5,
    },
    
    usercard: {
      margin: 5,
      minWidth: 200
      // padding: 5,
    },
});

export default ScoresPage;