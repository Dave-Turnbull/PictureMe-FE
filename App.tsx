import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Landing from "./routes/Landing";
import { NavigationContainer } from "@react-navigation/native";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
  configureFonts,
} from "react-native-paper";
import JoinGame from "./routes/JoinGame";
import WaitingRoom from "./routes/WaitingRoom";
import TakeAPicture from "./routes/TakeAPicture";
import { GuessThePicture } from "./routes/GuessThePicture";
import { useFonts } from "expo-font";
import HowTo from "./routes/HowTo";
import { SocketProvider } from "./contexts/SocketContext";
import ScoresPage from "./routes/ScoresPage";
import { UserProvider } from "./contexts/UserContext";
import { ActivityIndicator } from "react-native-paper";

export default function App() {
  const Stack = createNativeStackNavigator();
  const [fontLoaded] = useFonts({
    "Salsa-Regular": require("./assets/fonts/Salsa-Regular.ttf"),
    ReenieBeanie: require("./assets/fonts/ReenieBeanie.ttf"),
  });

  let customFonts = {
    fontFamily: "Salsa-Regular",
  };

  const theme = {
    ...DefaultTheme,
    fonts: configureFonts({ config: customFonts }),
  };
  if (!fontLoaded) {
    return <ActivityIndicator animating={true} />;
  } else {
    return (
      <PaperProvider theme={theme}>
        <SocketProvider>
          <UserProvider>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen
                  name="Landing"
                  component={Landing}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="JoinGame"
                  component={JoinGame}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="WaitingRoom"
                  component={WaitingRoom}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="TakeAPicture"
                  component={TakeAPicture}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="GuessThePicture"
                  component={GuessThePicture}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="HowTo"
                  component={HowTo}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="ScoresPage"
                  component={ScoresPage}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </UserProvider>
        </SocketProvider>
      </PaperProvider>
    );
  }
}
