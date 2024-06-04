import { Surface } from "react-native-paper";
import { StyleSheet, Image, Text } from "react-native";

const Polaroid = ({ text, imageSource, rotate = -5 }) => {
  return (
    <Surface
      style={[
        styles.imageContainer,
        { transform: [{ rotate: `${rotate}deg` }] },
      ]}
      elevation={3}
    >
      {imageSource && <Image source={imageSource} style={styles.image} />}
      <Text style={styles.title}>{text}</Text>
    </Surface>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    display: "flex",
    marginBottom: 50,
    backgroundColor: "white",
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    paddingTop: 16,
    paddingRight: 16,
    paddingLeft: 16,
    borderColor: "white",
    borderWidth: 10,
    backgroundColor: "white",
    shadowColor: "black",
  },
  title: {
    fontFamily: "ReenieBeanie",
    textAlign: "center",
    paddingBottom: 10,
    fontSize: 55,
  },
});

export default Polaroid;
