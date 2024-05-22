import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Landing from "./components/Landing";
import { NavigationContainer } from "@react-navigation/native";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import  JoinGame from "./components/JoinGame"
import WaitingRoom from "./components/WaitingRoom";

const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    secondary: "yellow",
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
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
