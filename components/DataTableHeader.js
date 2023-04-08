import React from "react";
import { HStack, Text } from "native-base";

const DataTableHeader = (props) => {
  return (
    <HStack flex={1} p={4} space={4} alignItems={"center"}>
      <HStack flex={1}>
        <Text fontWeight={"bold"}>Order Type</Text>
      </HStack>
      <HStack flex={0.5}>
        <Text fontWeight={"bold"}>X1</Text>
      </HStack>
      <HStack flex={0.5}>
        <Text fontWeight={"bold"}>Y1</Text>
      </HStack>
      <HStack flex={0.5}>
        <Text fontWeight={"bold"}>X2</Text>
      </HStack>
      <HStack flex={0.5}>
        <Text fontWeight={"bold"}>Y2</Text>
      </HStack>
      <HStack flex={0.5}>
        <Text fontWeight={"bold"}>X3</Text>
      </HStack>
      <HStack flex={0.5}>
        <Text fontWeight={"bold"}>Y3</Text>
      </HStack>
      <HStack flex={1}>
        <Text fontWeight={"bold"}>Price</Text>
      </HStack>
      <HStack flex={1}>
        <Text fontWeight={"bold"}>Description</Text>
      </HStack>
    </HStack>
  );
};

export default DataTableHeader;
