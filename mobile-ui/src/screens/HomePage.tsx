import React from "react";
import { Box, ScrollView, Fab } from "native-base";
import { StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FAB } from "react-native-paper";
import { RootStackParamList } from "../interfaces/routerInterface";
import { LocationInformation } from "../interfaces/locationInterface";
import LocationTile from "../components/LocationTile";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;
const HomePage = ({ navigation }: Props) => {
  const locations = [
    {
      locationName: "Bedroom Drawer",
      actionName: "Silent Mode",
      icon: "bed",
    },
    {
      locationName: "Kitchen Table",
      actionName: "Play Spotify Playlist",
      icon: "fast-food",
    },
    {
      locationName: "Work Desk",
      actionName: "Set Pomodoro Timer",
      icon: "desktop-outline",
    },
    {
      locationName: "Living Room",
      actionName: "Read Weather Update",
      icon: "home",
    },
  ];
  return (
    <>
      <Box>
        <ScrollView>
          <Box paddingX={5} paddingY={5}>
            {locations.map((loc, index) => (
              <LocationTile
                key={loc.locationName + index.toString()} // Safeguard in case user decides to name 2 locations the same
                locationName={loc.locationName}
                actionName={loc.actionName}
                iconName={loc.icon}
                onPressAction={() => {
                  /* 1. Navigate to the Details route with params */
                  navigation.navigate("ViewLocation");
                }}
              />
            ))}
          </Box>
        </ScrollView>
      </Box>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.push("NewLocation")}
        color="#E34F7E"
      />
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#2E2532",
  },
});
export default HomePage;
