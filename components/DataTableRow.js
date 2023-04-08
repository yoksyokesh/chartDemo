import React, { useEffect, useState } from "react";
import { HStack, Input, Text, VStack } from "native-base";
import { orderType, isNumber, inputValidation } from "../functions/utils";

const DataTableRow = (props) => {
  const { chartData, setChartData, dataIndex, highlight } = props;

  const data = chartData[dataIndex]["data"] ?? [];

  const nameData = chartData[dataIndex]["name"].split("-") ?? " - ".split("-");
  const desc = nameData[0];
  const price = nameData[1];

  const [x1, setX1] = useState(
    (data.length >= 1 && data[0][0].toFixed(2)) || ""
  );
  const [x2, setX2] = useState(
    (data.length >= 2 && data[1][0].toFixed(2)) || ""
  );
  const [x3, setX3] = useState(
    (data.length >= 3 && data[2][0].toFixed(2)) || ""
  );
  const [y1, setY1] = useState(
    (data.length >= 1 && data[0][1].toFixed(2)) || ""
  );
  const [y2, setY2] = useState(
    (data.length >= 2 && data[1][1].toFixed(2)) || ""
  );
  const [y3, setY3] = useState(
    (data.length >= 3 && data[2][1].toFixed(2)) || ""
  );

  const tryUpdation = (x, y, index) => {
    if (isNumber(x) && isNumber(y)) {
      if (
        data.length - 1 < index ||
        data[index][0] !== parseFloat(x) ||
        data[index][1] !== parseFloat(y)
      ) {
        let seriesData = [...data];
        seriesData[index] = [parseFloat(x), parseFloat(y)];

        let mainData = [...chartData];
        mainData[dataIndex]["data"] = seriesData;
        setChartData([...mainData]);
      }
    } else if (x === "" && y === "" && data.length - 1 >= index) {
      let seriesData = [...data];
      seriesData.pop();

      let mainData = [...chartData];
      mainData[dataIndex]["data"] = seriesData;
      setChartData([...mainData]);
    }
  };

  useEffect(() => {
    const myTimeout = setTimeout(tryUpdation, 2000, x1, y1, 0);
    return () => clearTimeout(myTimeout);
  }, [x1, y1]);

  useEffect(() => {
    const myTimeout = setTimeout(tryUpdation, 2000, x2, y2, 1);
    return () => clearTimeout(myTimeout);
  }, [x2, y2]);

  useEffect(() => {
    const myTimeout = setTimeout(tryUpdation, 2000, x3, y3, 2);
    return () => clearTimeout(myTimeout);
  }, [x3, y3]);

  return (
    <HStack
      flex={1}
      borderColor={"amber.500"}
      borderWidth={highlight ? 5 : 0}
      borderRadius={10}
      p={4}
      space={4}
      alignItems={"center"}
    >
      <HStack flex={1}>
        <Text fontWeight={"bold"}>{orderType(data.length)}</Text>
      </HStack>
      <HStack flex={0.5}>
        <Input
          value={x1}
          onChangeText={(text) => inputValidation(text, setX1)}
          width={20}
        />
      </HStack>
      <HStack flex={0.5}>
        <Input
          value={y1}
          onChangeText={(text) => inputValidation(text, setY1)}
          width={20}
        />
      </HStack>
      <HStack flex={0.5}>
        <Input
          isDisabled={data.length < 1}
          value={x2}
          onChangeText={(text) => inputValidation(text, setX2)}
          width={20}
        />
      </HStack>
      <HStack flex={0.5}>
        <Input
          isDisabled={data.length < 1}
          value={y2}
          onChangeText={(text) => inputValidation(text, setY2)}
          width={20}
        />
      </HStack>
      <HStack flex={0.5}>
        <Input
          isDisabled={data.length < 2}
          value={x3}
          onChangeText={(text) => inputValidation(text, setX3)}
          width={20}
        />
      </HStack>
      <HStack flex={0.5}>
        <Input
          isDisabled={data.length < 2}
          value={y3}
          onChangeText={(text) => inputValidation(text, setY3)}
          width={20}
        />
      </HStack>
      <HStack flex={1}>
        <Text>{price}</Text>
      </HStack>
      <HStack flex={1}>
        <Text>{desc}</Text>
      </HStack>
    </HStack>
  );
};

export default DataTableRow;
