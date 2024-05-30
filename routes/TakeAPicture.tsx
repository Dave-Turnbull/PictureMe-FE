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
import React, { useState, useRef, useEffect } from "react";
import { useSocket } from "../contexts/SocketContext";
import { useUserData } from "../contexts/UserContext";

const TakeAPicture = ({ route, navigation }) => {
  const { gamerule } = route.params;
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<ImageData | null>();
  const cameraRef = useRef<any>(null);
  const socket = useSocket();
  const { userData } = useUserData();
  console.log(userData, "the user data");

  interface ImageData {
    height: number;
    uri: string;
    width: number;
  }
  const SubmitPhoto = async () => {
    console.log(photo, "the photo data");
    console.log(userData, "userData");

    const imageObject = { userID: userData.user.id, img: photo.base64 };
    const uploadedMessage = await new Promise((resolve) => {
      socket.emit("imageUpload", imageObject, (message) => {
        resolve(message);
      });
    });
    console.log(uploadedMessage);
  };

  useEffect(() => {
    const eventStartVoting = (imageObject) => {
      navigation.navigate("GuessThePicture", { imageObject });
    };
    socket.on("startVotes", eventStartVoting);
    return () => {
      socket.off("startVotes", eventStartVoting);
    };
  }, []);

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
        <Button title="Submit" onPress={SubmitPhoto} />
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <Text style={styles.promptString}>Take a picture of {gamerule}.</Text>
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
};
export default TakeAPicture;

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
    margin: "auto",
  },
  promptString: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    margin: 50,
    textAlign: "center",
  },
});
