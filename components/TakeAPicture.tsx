import {
  Button,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
} from "react-native";
import { CameraView, useCameraPermissions, CameraType } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import React, { useState, useRef, useEffect } from "react";
import socket from "../test/socketEmulation";

const TakeAPicture = ({route, navigation}) => {
  const {userList} = route.params;
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<ImageData | null>();
  const cameraRef = useRef<any>(null);

  interface ImageData {
    height: number;
    uri: string;
    width: number;
  }
  const SubmitPhoto = () =>{
    setPhoto(photo);
    socket.emit("upload", photo, (status) => {
      console.log(status)
    })
    navigation.navigate("GuessThePicture", {photo, userList, styles})
  }
  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  if (!permission) {
    // Camera permissions are still loading.
    return (
      <View>
        <Text>!permission</Text>
      </View>
    );
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  if (photo) {
    {
      console.log(photo.uri);
    }
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Image style={styles.takenImage} source={{ uri: photo.uri }} />
        </View>
        <Button title="Discard" onPress={() => setPhoto(undefined)} />
        <Button title="Submit" onPress={SubmitPhoto}/>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (cameraRef) {
                cameraRef.current
                  .takePictureAsync()
                  .then((data: ImageData) => {
                    setPhoto(data);
                  })
                  .catch((err: ImageData) => {
                    console.log(err, "Error");
                  });
              }
            }}
          >
            <Text style={styles.text}>Take a Pic</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}
export default TakeAPicture

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  takenImage: {
    width: 200,
    height: 200,
    margin: 'auto',
  },
});