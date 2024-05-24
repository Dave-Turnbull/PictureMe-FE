import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Landing from "./routes/Landing";
import { NavigationContainer } from "@react-navigation/native";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
  configureFonts,
  customText
} from "react-native-paper";
import JoinGame from "./routes/JoinGame";
import WaitingRoom from "./routes/WaitingRoom";
import TakeAPicture from "./routes/TakeAPicture";
import { GuessThePicture } from "./routes/GuessThePicture";
import HowTo from "./routes/HowTo";
const Stack = createNativeStackNavigator();

// const fontConfig = {
//   web: {
//     regular: { fontFamily: "Salsa-Regular" },
//     fontWeight: "normal",
//   },
//   android: {
//     regular: { fontFamily: "Salsa-Regular" },
//     fontWeight: "normal",
//   },
//   ios: {
//     regular: { fontFamily: "Salsa-Regular" },
//     fontWeight: "normal",
//   },
// };

const fontConfig = {
  fontFamily: "Salsa-Regular",
}

const theme = {
  ...DefaultTheme,
  fonts: configureFonts({ config: fontConfig }),
  colors: {
    primary: "rgb(16, 109, 32)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(157, 248, 152)",
    onPrimaryContainer: "rgb(0, 34, 4)",
    secondary: "rgb(82, 99, 79)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(213, 232, 206)",
    onSecondaryContainer: "rgb(17, 31, 15)",
    tertiary: "rgb(56, 101, 106)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(188, 235, 240)",
    onTertiaryContainer: "rgb(0, 32, 35)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(252, 253, 246)",
    onBackground: "rgb(26, 28, 25)",
    surface: "rgb(252, 253, 246)",
    onSurface: "rgb(26, 28, 25)",
    surfaceVariant: "rgb(222, 229, 216)",
    onSurfaceVariant: "rgb(66, 73, 64)",
    outline: "rgb(114, 121, 111)",
    outlineVariant: "rgb(194, 201, 189)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(47, 49, 45)",
    inverseOnSurface: "rgb(240, 241, 235)",
    inversePrimary: "rgb(130, 219, 126)",
    elevation: {
      level0: "transparent",
      level1: "rgb(240, 246, 235)",
      level2: "rgb(233, 242, 229)",
      level3: "rgb(226, 237, 223)",
      level4: "rgb(224, 236, 220)",
      level5: "rgb(219, 233, 216)",
    },
    surfaceDisabled: "rgba(26, 28, 25, 0.12)",
    onSurfaceDisabled: "rgba(26, 28, 25, 0.38)",
    backdrop: "rgba(44, 50, 42, 0.4)",
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Landing"
            component={Landing}
            options={{ title: "Welcome to PictureMe!" }}
          />
          <Stack.Screen name="JoinGame" component={JoinGame} />
          <Stack.Screen name="WaitingRoom" component={WaitingRoom} />
          <Stack.Screen name="TakeAPicture" component={TakeAPicture} />
          <Stack.Screen name="GuessThePicture" component={GuessThePicture} />
          <Stack.Screen name="HowTo" component={HowTo} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
