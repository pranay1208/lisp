import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../interfaces/routerInterface";
import { Box, Button, VStack } from "native-base";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const DemoScreen = ({ route, navigation }: Props) => {
  return (
    <Box textAlign={"center"}>
      Hello World
      <VStack space={5}>
        <Button onPress={() => navigation.push("Home")}>Go to Home</Button>
        <Button onPress={() => navigation.push("NewLocation")}>
          Go to Add
        </Button>
        <Button onPress={() => navigation.push("ViewLocation")}>
          Go to Location
        </Button>
      </VStack>
    </Box>
  );
};

export default DemoScreen;
