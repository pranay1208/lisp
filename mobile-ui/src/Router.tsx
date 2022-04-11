import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./interfaces/routerInterface";
import DemoScreen from "./screens/DemoScreen";
import { NavigationContainer } from "@react-navigation/native";
import HomePage from "./screens/HomePage";
import NewLocation from "./screens/NewLocation";
import ViewLocation from "./screens/ViewLocation";

const Stack = createNativeStackNavigator<RootStackParamList>();

const Router = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => {
        return {
          headerTintColor: "#E13D71",
          headerStyle: {
            backgroundColor: "#fff",
          },
        };
      }}
    >
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="ViewLocation" component={ViewLocation} />
      <Stack.Screen name="NewLocation" component={NewLocation} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Router;
