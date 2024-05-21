import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

const Landing = () => {
  return (
    <View style={styles.container}>
      <Text>PictureMe!</Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Landing;
