import {
  Button,
  Pressable,
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
import StyledButton from "../components/StyledButton";
import { Icon, IconButton } from "react-native-paper";
import Polaroid from "../components/Polaroid"

const TakeAPicture = ({ route, navigation }) => {
  const { gamerule } = route.params;
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<ImageData | null>();
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const cameraRef = useRef<any>(null);
  const socket = useSocket();
  const { userData } = useUserData();

  interface ImageData {
    height: number;
    uri: string;
    width: number;
    base64:string;
  }
  const SubmitPhoto = async () => {
    setHasSubmitted(true)
    let photoBase64 = photo.base64;
    if (!/^data:image\//.test(photoBase64)) {
      photoBase64 = "data:image/jpeg;base64," + photoBase64;
    }

    const imageObject = { userID: userData.user.id, img: photoBase64 };
    const uploadedMessage = await new Promise((resolve) => {
      socket.emit("imageUpload", imageObject, (message) => {
        resolve(message);
      });
    });
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
        <StyledButton onPress={requestPermission} title="grant permission">Grant Permissions</StyledButton>
      </View>
    );
  }

  if (photo) {
    return (
      <View style={styles.container}>
        <View>
          <Polaroid imageSource={{ uri: photo.uri }} text={`is this okay?`} />
        </View>
        <View style={styles.buttonWrapper}>
        <StyledButton onPress={() => setPhoto(undefined)} >Discard</StyledButton>
        <StyledButton disabled={hasSubmitted} onPress={SubmitPhoto} >Submit</StyledButton>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
    <Text style={styles.promptString}>Take a picture of {gamerule}.</Text>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={() => {
              if (cameraRef) {
                cameraRef.current
                  .takePictureAsync({
                    base64: true,
                    quality: 0.3,
                    scale: 0.5,
                    ImageType: "jpg"
                  })
                  .then((data: ImageData) => {
                    setPhoto(data);
                  })
                  .catch((err: ImageData) => {
                    console.log(err, "Error");
                  });
              }
            }}
          >
            <Icon source='camera' size={50} color={'white'}/>
          </Pressable>
          <Pressable style={styles.button} onPress={toggleCameraFacing}>
            <Icon source='camera-flip' size={50} color={'white'}/>
          </Pressable>
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
    backgroundColor: "#EAFDED",
  },
  camera: {
flex:1
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
  buttonWrapper: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  promptString: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 'auto',
    marginVertical: 20,
    shadowColor: '#000000',
    shadowOffset: {width: 10, height: 10},
    shadowRadius: 5,
    textAlign: 'center'
  }
});
