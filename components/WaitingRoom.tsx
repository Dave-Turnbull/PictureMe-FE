import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
const WaitingRoom = ()=>{
    const copy=()=>{
        //will copy game id to clipboard
    }
    return (
        <View>
            <Button onPress={copy}>copyIcon</Button>

        </View>)

    // if isHost: Start Game, Boot User
    // else: Share and copy game id

}

export default WaitingRoom;