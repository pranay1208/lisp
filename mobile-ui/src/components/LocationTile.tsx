import React from "react";
import { Box, HStack, Heading, Text, Pressable } from "native-base";
import { Ionicons } from "@expo/vector-icons";

interface LocationTileProps {
  locationName: string;
  actionName: string;
  iconName: string; //TODO: Get it from a set list?
  onPressAction: () => void;
}

const LocationTile = ({
  locationName,
  actionName,
  iconName,
  onPressAction,
}: LocationTileProps) => (
  <Pressable
    onPress={onPressAction}
    _pressed={{
      opacity: 0.85,
    }}
  >
    <Box
      backgroundColor={"primary.400"}
      padding='5'
      rounded='2xl'
      marginY={1.5}
      borderColor='gray.700'
      borderWidth='1'
      shadow='6'
    >
      <HStack space={10}>
        <Box flex={1}>
          <Heading size='md' color={"white.400"} isTruncated>
            {locationName}
          </Heading>
          <Text
            fontSize='lg'
            paddingLeft={5}
            fontWeight='semibold'
            color='white.400'
            isTruncated
          >
            {actionName}
          </Text>
        </Box>
        <Box>
          <Ionicons name={iconName as any} color='white' size={48} />
        </Box>
      </HStack>
    </Box>
  </Pressable>
);

export default LocationTile;
