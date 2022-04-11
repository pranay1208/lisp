import React, { useState } from "react";
import {
  Center,
  Input,
  Stack,
  Text,
  Select,
  Box,
  Flex,
  Button,
  Icon,
} from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../interfaces/routerInterface";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

type Props = NativeStackScreenProps<RootStackParamList, "ViewLocation">;

const ViewLocation = ({ route, navigation }: Props) => {
  const [action, setAction] = useState("");
  return (
    <Center>
      <Stack w="100%" backgroundColor={"white.400"} height="100%">
        <Box my={4} mx={6}>
          <Ionicons name="bed" color="violet" size={96} />
        </Box>
        {/* <Input
		  size="md"
		  mx={4}
		  borderWidth={2}
		  borderColor="black"
		  variant="rounded"
		  placeholder="Bedroom"
		/> */}
        <Flex mx={4} direction="row">
          <Text m="4" fontWeight="bold" fontSize={18}>
            Location Name:
          </Text>
          <Text m="4" fontWeight="bold" fontSize={18}>
            Bedroom Drawer
          </Text>
        </Flex>
        <Flex mx={4} direction="row">
          <Text m="4" fontWeight="bold" fontSize={18}>
            Action Name:
          </Text>
          <Text m="4" fontWeight="bold" fontSize={18}>
            {"    "}
            Silent Mode
          </Text>
        </Flex>
        <Flex mx={4} direction="column">
          <Text m="4" fontWeight="bold" fontSize={18}>
            Action:
          </Text>
          <Box
            mx={4}
            mt={4}
            rounded="2xl"
            height={12}
            width="48"
            bg="violet.600"
            justifyContent="center"
          >
            <Center>
              <Flex direction="row">
                <Ionicons
                  name="phone-portrait-outline"
                  color="white"
                  size={20}
                  margin={4}
                />
                <Text color="white.400" fontWeight="bold" fontSize={16}>
                  {"  "}
                  Native Action
                </Text>
              </Flex>
            </Center>
          </Box>
          <Box mx={50} mt={4} justifyContent="center">
            <Flex direction="row">
              <MaterialIcons
                name="subdirectory-arrow-right"
                size={24}
                color="black"
                mx={20}
              />
              <Box
                ml={4}
                rounded="2xl"
                height={12}
                width="48"
                bg="violet.800"
                justifyContent="center"
              >
                <Center>
                  <Flex direction="row">
                    <Ionicons
                      name="musical-notes"
                      color="white"
                      size={20}
                      margin={4}
                    />
                    <Text color="white.400" fontWeight="bold" fontSize={16}>
                      {"  "}
                      Phone Volume
                    </Text>
                  </Flex>
                </Center>
              </Box>
            </Flex>
          </Box>
          <Box mx={120} my={4} justifyContent="center">
            <Flex direction="row">
              <MaterialIcons
                name="subdirectory-arrow-right"
                size={24}
                color="black"
                mx={20}
              />
              <Box
                ml={4}
                rounded="2xl"
                height={12}
                width="48"
                bg="pink.700"
                justifyContent="center"
              >
                <Center>
                  <Flex direction="row">
                    <Ionicons
                      name="volume-mute-outline"
                      color="white"
                      size={20}
                      margin={4}
                    />
                    <Text color="white.400" fontWeight="bold" fontSize={16}>
                      {"  "}
                      Set Volume to 0
                    </Text>
                  </Flex>
                </Center>
              </Box>
            </Flex>
          </Box>
        </Flex>
        <Box
          mx={4}
          mt={8}
          rounded="2xl"
          height={12}
          bg="yellow.500"
          justifyContent="center"
        >
          <Center>
            <Flex direction="row">
              <Ionicons name="pencil" color="white" size={20} margin={4} />
              <Text color="white.400" fontWeight="bold" fontSize={16}>
                {"  "}
                Edit Location
              </Text>
            </Flex>
          </Center>
        </Box>
        <Box
          margin={4}
          rounded="2xl"
          height={12}
          bg="red.400"
          justifyContent="center"
        >
          <Center>
            <Flex direction="row">
              <Ionicons name="trash" color="white" size={20} margin={4} />
              <Text color="white.400" fontWeight="bold" fontSize={16}>
                {"  "}
                Delete Location
              </Text>
            </Flex>
          </Center>
        </Box>
      </Stack>
    </Center>
  );
};

export default ViewLocation;
