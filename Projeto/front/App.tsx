import { StatusBar } from "expo-status-bar";


import ViewNav1 from "./src/screens/ViewNav1";
import ViewUsers from "./src/screens/ViewUsers";
import ViewNewLogin from "./src/screens/ViewNewLogin";
import ViewDex from "./src/screens/ViewDex";


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator } from "react-native";

import {
  Ubuntu_300Light,
  Ubuntu_300Light_Italic,
  Ubuntu_400Regular,
  Ubuntu_400Regular_Italic,
  Ubuntu_500Medium,
  Ubuntu_500Medium_Italic,
  Ubuntu_700Bold,
  Ubuntu_700Bold_Italic,
} from '@expo-google-fonts/ubuntu';

import { useFonts } from 'expo-font'; //1
import { AppProvider } from "./src/context/AppContext";
import ViewTrades from "./src/screens/ViewTrades";
import ViewCreatePokemon from "./src/screens/ViewCreatePokemon";
import ViewCreateUser from "./src/screens/ViewCreateUser";
import ViewMyProfile from "./src/screens/ViewMyProfile";
import ViewEditingPokemon from "./src/screens/ViewEditingPokemon";
import ViewMessages from "./src/screens/ViewMessages";

const Stack = createNativeStackNavigator();

export default function App() {

  const [fontsLoaded] = useFonts({
    Ubuntu_300Light,
    Ubuntu_300Light_Italic,
    Ubuntu_400Regular,
    Ubuntu_400Regular_Italic,
    Ubuntu_500Medium,
    Ubuntu_500Medium_Italic,
    Ubuntu_700Bold,
    Ubuntu_700Bold_Italic,
  }); // 2

  if (fontsLoaded) { //3
    return (
      <AppProvider>
        <>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="ViewNewLogin"
              screenOptions={{ headerShown: false }} >
              <Stack.Screen name="ViewNav1" component={ViewNav1} />
              <Stack.Screen name="ViewDex" component={ViewDex} />
              <Stack.Screen name="ViewNewLogin" component={ViewNewLogin} />
              <Stack.Screen name="ViewUsers" component={ViewUsers} />
              <Stack.Screen name="ViewTrades" component={ViewTrades} />
              <Stack.Screen name="ViewCreatePokemon" component={ViewCreatePokemon} />
              <Stack.Screen name="ViewCreateUser" component={ViewCreateUser} />
              <Stack.Screen name="ViewMyProfile" component={ViewMyProfile} />
              <Stack.Screen name="ViewEditingPokemon" component={ViewEditingPokemon} />
              <Stack.Screen name="ViewMessages" component={ViewMessages} />
            </Stack.Navigator>
          </NavigationContainer>

          <StatusBar
            translucent={false}
            backgroundColor="#fff"
            style="auto" />
        </>
      </AppProvider>
    );
  } else {
    return (
      <>
        <ActivityIndicator size="large" color="#000" />

        <StatusBar
          translucent={false}
          backgroundColor="#fff"
          style="auto" />
      </>
    )
  }
}