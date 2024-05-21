import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Landing from "./components/Landing";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
         name="Landing"
         component={Landing}
         options={{title: 'Welcome to PictureMe!'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



