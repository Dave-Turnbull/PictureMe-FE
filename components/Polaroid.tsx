import { Surface } from "react-native-paper";
import { StyleSheet, Image, Text, View } from "react-native";

const Polaroid = ({ children=null, text = '', imageSource, rotate = -5 }) => {
  return (
    <View style={styles.container}>
    <Surface
      style={[
        styles.imageContainer,
        { transform: [{ rotate: `${rotate}deg` }] },
      ]}
      elevation={3}
    >
      {imageSource && <Image width={300} height={300} resizeMode="cover" source={imageSource} style={styles.image} />}
      {children}
      {text && <Text style={styles.title}>{text}</Text>}
    </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
  imageContainer: {
    display: "flex",
    marginBottom: 30,
    backgroundColor: "white",
  },
  image: {
    width: 300,
    height: 300,
    paddingTop: 16,
    paddingRight: 16,
    paddingLeft: 16,
    borderColor: "white",
    borderWidth: 10,
    backgroundColor: "white",
  },
  title: {
    fontFamily: "ReenieBeanie",
    textAlign: "center",
    paddingBottom: 10,
    fontSize: 55,
    width: 300
  }
});

export default Polaroid;
