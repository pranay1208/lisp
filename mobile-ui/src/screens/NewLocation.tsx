import React, { useState } from "react";
import { Center, Input, Stack, Text, Select, Box, Button } from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../interfaces/routerInterface";
import { Ionicons } from "@expo/vector-icons";

type Props = NativeStackScreenProps<RootStackParamList, "NewLocation">;

const NewLocation = ({ route, navigation }: Props) => {
  const [action, setAction] = useState("");
  return (
    <Center>
      <Stack w="100%" backgroundColor={"white.400"} height="100%">
        <Text m="4" fontWeight="700">
          {" "}
          Location Name
        </Text>
        <Input
          size="md"
          mx={4}
          borderWidth={2}
          borderColor="black"
          variant="rounded"
          placeholder="Bedroom"
        />
        <Text m="4" fontWeight="700">
          {" "}
          Choose Action
        </Text>
        <Select
          selectedValue={action}
          placeholder="Choose Action"
          mx={4}
          borderWidth={2}
          borderColor="black"
          variant="rounded"
          _selectedItem={{
            bg: "blue.600",
          }}
          mt={1}
          onValueChange={(itemValue) => setAction(itemValue)}
        >
          <Select.Item label="UX Research" value="ux" />
          <Select.Item label="Web Development" value="web" />
          <Select.Item label="Cross Platform Development" value="cross" />
          <Select.Item label="UI Designing" value="ui" />
          <Select.Item label="Backend Development" value="backend" />
        </Select>
        <Text m={4} fontWeight={700}>
          {" "}
          Action Name
        </Text>
        <Input
          size="md"
          mx={4}
          borderWidth={2}
          borderColor="black"
          variant="rounded"
          placeholder="Silent Mode"
        />
        <Text m="4" fontWeight="700">
          {" "}
          Choose Icon
        </Text>
        <Box mx={4}>
          <Ionicons size={48} name="add-circle-outline" />
        </Box>
        <Box
          margin={4}
          rounded="2xl"
          height={12}
          bg={{
            linearGradient: {
              colors: ["primary.400", "secondary.400"],
              start: [0, 0],
              end: [0, 0],
            },
          }}
          justifyContent="center"
        >
          <Center>
            <Text color="white.400" fontWeight={600}>
              Submit
            </Text>
          </Center>
        </Box>
      </Stack>
    </Center>
  );
};

export default NewLocation;
